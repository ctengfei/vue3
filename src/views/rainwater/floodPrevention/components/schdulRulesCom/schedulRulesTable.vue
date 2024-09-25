<template>
    <div class="app-container">
            <div class="title">{{ title }}</div>
            <div class="titleBottom">
                <pro-crud ref="crudRef" :index="index" v-model="form" v-model:search="serachForm" :columns="columns"
                    :form-columns="formColumns" :data="tableData" :before-open="beforeOpen"
                    v-model:current-page="pagination.pageNum" v-model:page-size="pagination.pageSize"
                    :total="pagination.total" align="center" @load="load" column="2" :menu="menu" row-key="id"
                    layout="->,total,sizes,prev, pager, next, jumper" background draggable
                    :page-sizes="[10, 20, 30, 40, 50]" label-width="150px" direction="vertical" @search="searchSubmit"
                    :before-close="beforeClose" width="50%" @search-reset="searchReset" @submit="submit" @delete="deleteRow"
                    :gutter="20" empty-text="暂无数据" >
                    <template #search-menu-right="{ size }">
                        <el-button type="primary" plain icon="Plus" :size="size"
                            @click="crudRef.openDialog('add')">新增</el-button>
                    </template>
                    <template #form-menu-right="{ size }">
                        <el-button :size="size" @click="crudRef.closeDialog()">关闭</el-button>
                    </template>
                    <template #form-ruleForm>
                        <FormDynamic ref="formDyanm" :ruleForm="ruleForm"/>
                    </template>
                    <template #crud-detail>
                        <pro-form
                            label-width="155px"
                            v-model="form"
                            @reset="crudRef.closeDialog()"
                            :menu="detailMenu"
                            :columns="detailColumns"
                        >
                            <template #form-ruleForm>
                                <FormDynamic ref="formDyanm" :ruleForm="ruleForm" :disabled="true"/>
                            </template>
                        </pro-form>
                    </template>
                </pro-crud>
            </div>
    </div>
</template>

<script setup>
import useUserStore from '@/store/modules/user'
import {
    defineCrudColumns,
    defineCrudMenuColumns,
    defineCrudSubmit,
    defineCrudSearch,
    defineFormColumns,
    defineTableIndexColumns,
    defineComponentProps,
    defineCrudBeforeOpen, defineCrudBeforeClose,
} from 'element-pro-components';
import { ElMessage, ElMessageBox } from 'element-plus'
import { addList, getList, getDetail, editList, deleteData, getRequest, postRequest, putRequest, deleteRequest } from '@/api/fourFloodPrevent/basicData'
import FormDynamic from  './formDynamic'

const userStore = useUserStore()
const route = useRoute();
const router = useRouter();
const props = defineProps(['title', 'getListUrl', 'addUrl', 'editUrl', 'deleteUrl', 'detailUrl', 'code', 'formColumns', 'columns', 'menu']);
const emit = defineEmits(['clickMonitor']);
let form = ref({});
const crudRef = ref();
const serachForm = ref({});
let dialogVisible = ref(false);
let dialogTitle = ref('新增');
let formDyanm = ref();
let ruleForm = ref({
    list:[{
        sort: 0,
        monitorIndex: '',
        judgeTerm: '',
        triggerThreshold: '',
        dataUnit: '',
    }]
});
let tableData = ref([]);
let pagination = reactive({
    pageNum: 1,
    pageSize: 10,
    total: 0
});
const index = defineTableIndexColumns({
    label: '序号',
    width: 50
});
let columns = defineCrudColumns(computed(() => [...props.columns]))
// 新建表单
let formColumns = defineFormColumns(computed(() => [...props.formColumns]))

// 详情表单
let detailColumns = defineFormColumns(computed(() => [...props.formColumns].map(r=>({...r,props:{...r.props,disabled:true}}))))

// 详情菜单
const detailMenu = defineCrudMenuColumns({
  submit: false,
  reset: true,
  resetText: '关闭'
});
// 测站操作
const menu = defineCrudMenuColumns(props.menu);
// 初始化
onMounted(() => {
    getTableData();
})
// 获取表格数据
let getTableData = () => {
    postRequest(props.getListUrl, {...serachForm.value, 
        pageNum: pagination.pageNum,
        pageSize: pagination.pageSize,}).then(res => {
        tableData.value = res.data.list;
        pagination.total = res.data.total;
        pagination.pageNum = res.data.pageNum;
        pagination.pageSize = res.data.pageSize;
    })
}
// 打开弹窗
const beforeOpen = defineCrudBeforeOpen((done, type, row) => {
    if (type === 'edit' || type === 'detail' ) {
        getRequest(props.detailUrl, { [props.code]: row[props.code] }).then(res => {
            ruleForm.value.list =  res.data.dispatchRuleDeployVOS;
            form.value = res.data;
        })
    } else {
        ruleForm.value = {
            list:[{
                sort: 0,
                monitorIndex: '',
                judgeTerm: '',
                triggerThreshold: '',
                dataUnit: '',
            }]
        }
        form.value = {};
    }
    done();
})

// 关闭弹窗
const beforeClose = defineCrudBeforeClose((done) => {
    form.value = {};
    done();
})
// 表单搜索
const searchSubmit = defineCrudSearch((done, isValid, invalidFields) => {
    getTableData()
    done();
});

// 表单提交
const submit = defineCrudSubmit((close, done, type, isValid, invalidFields) => {
    formDyanm.value.validateForm()
    if (isValid) {
        let obj = {
            deployDTOS: ruleForm.value.list,
            ...form.value
        }
        if (type == 'add') {
            postRequest(props.addUrl, obj).then(res => {
                ElMessage({
                    message: '添加成功',
                    type: 'success'
                });
                getTableData();
                close();
            })
        } else {
            putRequest(props.editUrl, obj).then(res => {
                ElMessage({
                    message: '修改成功',
                    type: 'success'
                });
                getTableData();
                close();
            })
        }
    }
    done();
});
// 搜索重置
const searchReset = () => {
    pagination.pageNum = 1;
    getTableData();
}
// 删除
const deleteRow = row => {
    ElMessageBox.confirm(`是否确认删除数据项？`, '系统提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
    }).then(() => {
        deleteRequest(props.deleteUrl + row[props.code]).then(() => {
            ElMessage({
                message: '删除成功',
                type: 'success'
            });
            getTableData();
        })
    });
};
// 分页选择
const load = () => {
    getTableData();
}

</script>

<style lang='scss' scoped>
.title {
    line-height: 57px;
    height: 57px;
    border-bottom: solid 1px #EAEAEA;
    font-weight: 500;
    font-size: 20px;
    color: #22283F;
}

.titleBottom {
    margin-top: 20px;
}
</style>