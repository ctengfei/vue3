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
                    :before-close="beforeClose" width="50%" @search-reset="searchReset" @submit="submit"
                    :gutter="20" empty-text="暂无数据"
                    @delete="deleteRow">
                    <template #search-menu-right="{ size }">
                        <el-button type="primary" plain icon="Plus" :size="size"
                            @click="crudRef.openDialog('add')">新增</el-button>
                        <el-button type="success" plain icon="Download" :size="size"
                            @click="exportData">导出</el-button>
                    </template>
                    <template #table-startAndEnd="{ row }">
                        {{ `${row.startTime} - ${row.endTime}` }}
                    </template>
                    <template #form-fileList>
                        <AlUpload :fileList="fileList"/>
                    </template>
                    <template #form-menu-right="{ size }">
                        <el-button :size="size" @click="crudRef.closeDialog()">关闭</el-button>
                    </template>
                    <template #crud-detail>
                        <pro-form
                            label-width="155px"
                            v-model="form"
                            @reset="crudRef.closeDialog()"
                            :menu="detailMenu"
                            :columns="detailColumns"
                        >
                        <template #form-fileList>
                            <AlUpload :fileList="fileList" :disabled="true"/>
                        </template>
                        </pro-form>
                    </template>
                </pro-crud>
            </div>
    </div>
</template>

<script setup name="emergencyTeamTable">
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


const userStore = useUserStore()
const route = useRoute();
const router = useRouter();
const { proxy } = getCurrentInstance();
const props = defineProps(['title', 'getListUrl', 'addUrl', 'editUrl', 'deleteUrl', 'detailUrl', 'code', 'formColumns', 'columns', 'menu', 'exportUrl']);
const emit = defineEmits(['clickMonitor']);
let form = ref({});
const crudRef = ref();
const serachForm = ref({});
let tableData = ref([]);
let fileList = ref([]);
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
        fileList.value = row.attach;
        form.value = {...row};
        // getRequest(props.detailUrl, { [props.code]: row[props.code] }).then(res => {
        //     fileList.value = row.attach;
        //     form.value = {...row};
        // })
    } else {
        fileList.value = []
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
    if (isValid) {
        let obj = {
                ...form.value,
                attach: JSON.stringify(fileList.value)
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


// 导出
const exportData = () => {
    proxy.download(props.exportUrl,
        {...serachForm.value},
        `应急抢险队伍_${new Date().getTime()}.xlsx`
    );
};
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