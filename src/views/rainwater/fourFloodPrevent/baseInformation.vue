<template>
    <div class="app-container">
        <div class="title">水库基本信息</div>
        <div class="titleBottom">
            <pro-crud ref="crudRef" :index="index" v-model="form" v-model:search="serachForm" :columns="columns"
                :form-columns="formColumns" :data="tableData" :before-open="beforeOpen" :detail="detail"
                v-model:current-page="pagination.pageNum" v-model:page-size="pagination.pageSize"
                :total="pagination.total" align="center" @load="load" :column="3" :menu="menu" row-key="resCode"
                layout="->,total,sizes,prev, pager, next, jumper" background draggable
                :page-sizes="[10, 20, 30, 40, 50]" label-width="150px" direction="vertical" @search="searchSubmit" 
                :before-close="beforeClose" height="550" width="70%"  empty-text="暂无数据"
                @search-reset="searchReset" @submit="submit" @delete="deleteRow">
                <template #search-menu-right="{ size }">
                    <el-button type="primary" plain icon="Plus" :size="size"
                        @click="crudRef.openDialog('add')">新增</el-button>
                </template>
                <template #form-menu-right="{ size }">
                    <el-button :size="size" @click="crudRef.closeDialog()">关闭</el-button>
                </template>
                <!-- <template #menu="{ size, row }">
                    <el-button :size="size" type="success" link @click="handleDetail(row)">
                        详情
                    </el-button>
                </template> -->
                <template #crud-detail>
                    <pro-form
                        label-width="155px"
                        v-model="form"
                        @reset="crudRef.closeDialog()"
                        :menu="detailMenu"
                        :columns="detailColumns"
                    >
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
import { addList, getList, getDetail, editList, deleteData, getRequest, postRequest } from '@/api/fourFloodPrevent/basicData'

const { proxy } = getCurrentInstance();
const { engineering_grade, 
    project_scale, 
    reservoir_terrain_type, 
    relevant_departments,
    engineering_construction_situation } = proxy.useDict("engineering_grade", "project_scale", "reservoir_terrain_type", "relevant_departments", "engineering_construction_situation");

const userStore = useUserStore()
const route = useRoute();
const router = useRouter();
const props = defineProps();
const emit = defineEmits();
let form = ref({});
let detail = ref({})
const crudRef = ref();
const serachForm = ref({});
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
let columns = defineCrudColumns(computed(() => [
    {
        label: '水库名称',
        prop: 'resName',
        component: 'el-input',
        props: {
            placeholder: '请输入水库名称',
            clearable: true
        },
        search: true,
    },
    {
        label: '工程规模',
        prop: 'engScal_dic',
    },
    {
        label: '总库容（万m³）',
        prop: 'totCap',
    },
    {
        label: '设计库容（万m³）',
        prop: 'totCap',
    },
    {
        label: '调洪库容（万m³）',
        prop: 'storFlCap',
    },
    // {
    //     label: '坝址多年平均径流量',
    //     prop: 'daadMulAverRuof'
    // },
    {
        label: '兴利库容（万m³）',
        prop: 'benResCap',
    },
    {
        label: '死库容（万m³）',
        prop: 'deadCap',
    },
    // {
    //     label: '校核洪水位（m）',
    //     prop: 'ckflz',
    // },
    {
        label: '正常蓄水位（m）',
        prop: 'normWatLev',
    },
    {
        label: '防洪限制水位（m）',
        prop: 'flLowLimLev',
    },
    {
        label: '死水位（m）',
        prop: 'deadLev',
    },
]))
// 新建表单
let formColumns = defineFormColumns(computed(() => [
    {
        label: '水库名称',
        prop: 'resName',
        component: 'el-input',
        props: {
            placeholder: '请输入水库名称',
            clearable: true
        },
        rules: [{required: true, message: '请输入水库名称'}],
        md: 8,
    },
    {
        label: '水库编码',
        prop: 'resCode',
        component: 'el-input',
        props: {
            placeholder: '请输入水库编码',
            clearable: true
        },
        rules: [{required: true, message: '请输入水库编码'}],
        md: 8,
    },
    {
        label: '左下角经度',
        prop: 'lowLeftLong',
        component: 'el-input',
        props: {
            placeholder: '请输入左下角经度',
            clearable: true
        },
        rules: [{required: true, message: '请输入左下角经度'}],
        md: 8,
    },
    {
        label: '左下角纬度',
        prop: 'lowLeftLat',
        component: 'el-input',
        props: {
            placeholder: '请输入左下角纬度',
            clearable: true
        },
        rules: [{required: true, message: '请输入左下角纬度'}],
        md: 8,
    },
    {
        label: '右上角经度',
        prop: 'upRightLong',
        component: 'el-input',
        props: {
            placeholder: '请输入右上角经度',
            clearable: true
        },
        rules: [{required: true, message: '请输入右上角经度'}],
        md: 8,
    },
    {
        label: '右上角纬度',
        prop: 'upRightLat',
        component: 'el-input',
        props: {
            placeholder: '请输入右上角纬度',
            clearable: true
        },
        rules: [{required: true, message: '请输入右上角纬度'}],
        md: 8,
    },
    {
        label: '坝址多年平均径流量',
        prop: 'daadMulAverRuof',
        component: 'el-input',
        props: {
            placeholder: '请输入坝址多年平均径流量',
            clearable: true
        },
        md: 8,
    },
    {
        label: '水库所在位置',
        prop: 'resLoc',
        component: 'el-input',
        props: {
            placeholder: '请输入水库所在位置',
            clearable: true
        },
        rules: [{required: true, message: '请输入水库所在位置'}],
        md: 8,
    },
    {
        label: '工程等别',
        prop: 'engGrad',
        component: 'pro-select',
        props: {
            placeholder: '请选择工程等别',
            data: engineering_grade.value,
            clearable: true
        },
        rules: [{required: true, message: '请选择工程等别'}],
        md: 8,
    },
    {
        label: '工程规模',
        prop: 'engScal',
        component: 'pro-select',
        props: {
            placeholder: '请选择工程规模',
            data: project_scale.value,
            clearable: true
        },
        rules: [{required: true, message: '请选择工程规模'}],
        md: 8,
    },
    {
        label: '水库类型',
        prop: 'resType',
        component: 'pro-select',
        props: {
            placeholder: '请选择水库类型',
            data: reservoir_terrain_type.value,
            clearable: true
        },
        rules: [{required: true, message: '请选择水库类型'}],
        md: 8,
    },
    {
        label: '集雨面积(平方公里)',
        prop: 'watShedArea',
        component: 'el-input',
        props: {
            placeholder: '请输入集雨面积',
            clearable: true
        },
        md: 8,
    },
    {
        label: '防洪高水位',
        prop: 'uppLevFlco',
        component: 'el-input',
        props: {
            placeholder: '请输入防洪高水位',
            clearable: true
        },
        md: 8,
    },
    {
        label: '正常蓄水位（m）',
        prop: 'normWatLev',
        component: 'el-input',
        props: {
            placeholder: '请输入正常蓄水位',
            clearable: true
        },
        md: 8,
    },
    {
        label: '正常蓄水位相应水面面积',
        prop: 'normPoolStagArea',
        component: 'el-input',
        props: {
            placeholder: '请输入正常蓄水位相应水面面积',
            clearable: true
        },
        md: 8,
    },
    {
        label: '正常蓄水位相应库容',
        prop: 'normPoolStagCap',
        component: 'el-input',
        props: {
            placeholder: '请输入正常蓄水位相应库容',
            clearable: true
        },
        md: 8,
    },
    {
        label: '防洪限制水位（m）',
        prop: 'flLowLimLev',
        component: 'el-input',
        props: {
            placeholder: '请输入防洪限制水位',
            clearable: true
        },
        md: 8,
    },
    {
        label: '防洪限制水位库容',
        prop: 'flLowLimLevCap',
        component: 'el-input',
        props: {
            placeholder: '请输入防洪限制水位库容',
            clearable: true
        },
        md: 8,
    },
    {
        label: '防洪库容',
        prop: 'flcoCap',
        component: 'el-input',
        props: {
            placeholder: '请输入防洪库容',
            clearable: true
        },
        md: 8,
    },
    {
        label: '死水位',
        prop: 'deadLev',
        component: 'el-input',
        props: {
            placeholder: '请输入死水位',
            clearable: true
        },
        md: 8,
    },
    {
        label: '总库容（万m³）',
        prop: 'totCap',
        component: 'el-input',
        props: {
            placeholder: '请输入总库容',
            clearable: true
        },
        md: 8,
    },
    {
        label: '调洪库容（万m³）',
        prop: 'storFlCap',
        component: 'el-input',
        props: {
            placeholder: '请输入调洪库容',
            clearable: true
        },
        md: 8,
    },
    {
        label: '兴利库容（万m³）',
        prop: 'benResCap',
        component: 'el-input',
        props: {
            placeholder: '请输入兴利库容',
            clearable: true
        },
        md: 8,
    },
    {
        label: '死库容（万m³）',
        prop: 'deadCap',
        component: 'el-input',
        props: {
            placeholder: '请输入死库容',
            clearable: true
        },
        md: 8,
    },
    {
        label: '工程建设情况',
        prop: 'engStat',
        component: 'pro-radio',
        props: {
            data: engineering_construction_situation.value,
        },
        rules: [{required: true, message: '请选择工程建设情况'}],
        md: 8,
    },
    {
        label: '开工时间',
        prop: 'startDate',
        component: 'el-date-picker',
        props: {
            clearable: true,
            placeholder: '请选择开工时间',
            style: {width: '100%'},
            type: 'datetime',
            'value-format': 'YYYY-MM-DD HH:mm:ss'
        },
        rules: [{required: true, message: '请选择开工时间'}],
        md: 8,
    },
    {
        label: '建成时间',
        prop: 'compDate',
        component: 'el-date-picker',
        props: {
            clearable: true,
            placeholder: '请选择建成时间',
            style: {width: '100%'},
            type: 'datetime',
            'value-format': 'YYYY-MM-DD HH:mm:ss'
        },
        rules: [{required: true, message: '请选择建成时间'}],
        md: 8,
    },
    {
        label: '归属部门',
        prop: 'admDep',
        component: 'pro-select',
        props: {
            placeholder: '请选择归属部门',
            onChange: (val)=>{
                
            },
            data: relevant_departments.value,
            clearable: true
        },
        md: 8,
    },
    {
        label: '校核洪峰流量',
        prop: 'verifyPeakFlowRate',
        component: 'el-input',
        props: {
            placeholder: '请输入校核洪峰流量',
            clearable: true
        },
        md: 8,
    },
    {
        label: '最大洪峰流量',
        prop: 'designPeakFlowRate',
        component: 'el-input',
        props: {
            placeholder: '请输入最大洪峰流量',
            clearable: true
        },
        md: 8,
    },
    {
        label: '备注',
        prop: 'note',
        component: 'el-input',
        props: {
            type:'textarea',
            placeholder: '请输入备注',
            clearable: true
        },
        md: 24,
    },
]))

//详情表单
let detailColumns = defineFormColumns(computed(() => [
    {
        label: '水库名称',
        prop: 'resName',
        component: 'el-input',
        props: {
            placeholder: '请输入水库名称',
            clearable: true
        },
        rules: [{required: true, message: '请输入水库名称'}],
        md: 8,
    },
    {
        label: '水库编码',
        prop: 'resCode',
        component: 'el-input',
        props: {
            placeholder: '请输入水库编码',
            clearable: true
        },
        rules: [{required: true, message: '请输入水库编码'}],
        md: 8,
    },
    {
        label: '左下角经度',
        prop: 'lowLeftLong',
        component: 'el-input',
        props: {
            placeholder: '请输入左下角经度',
            clearable: true
        },
        rules: [{required: true, message: '请输入左下角经度'}],
        md: 8,
    },
    {
        label: '左下角纬度',
        prop: 'lowLeftLat',
        component: 'el-input',
        props: {
            placeholder: '请输入左下角纬度',
            clearable: true
        },
        rules: [{required: true, message: '请输入左下角纬度'}],
        md: 8,
    },
    {
        label: '右上角经度',
        prop: 'upRightLong',
        component: 'el-input',
        props: {
            placeholder: '请输入右上角经度',
            clearable: true
        },
        rules: [{required: true, message: '请输入右上角经度'}],
        md: 8,
    },
    {
        label: '右上角纬度',
        prop: 'upRightLat',
        component: 'el-input',
        props: {
            placeholder: '请输入右上角纬度',
            clearable: true
        },
        rules: [{required: true, message: '请输入右上角纬度'}],
        md: 8,
    },
    {
        label: '坝址多年平均径流量',
        prop: 'daadMulAverRuof',
        component: 'el-input',
        props: {
            placeholder: '请输入坝址多年平均径流量',
            clearable: true
        },
        md: 8,
    },
    {
        label: '水库所在位置',
        prop: 'resLoc',
        component: 'el-input',
        props: {
            placeholder: '请输入水库所在位置',
            clearable: true
        },
        rules: [{required: true, message: '请输入水库所在位置'}],
        md: 8,
    },
    {
        label: '工程等别',
        prop: 'engGrad',
        component: 'pro-select',
        props: {
            placeholder: '请选择工程等别',
            data: engineering_grade.value,
            clearable: true
        },
        rules: [{required: true, message: '请选择工程等别'}],
        md: 8,
    },
    {
        label: '工程规模',
        prop: 'engScal',
        component: 'pro-select',
        props: {
            placeholder: '请选择工程规模',
            data: project_scale.value,
            clearable: true
        },
        rules: [{required: true, message: '请选择工程规模'}],
        md: 8,
    },
    {
        label: '水库类型',
        prop: 'resType',
        component: 'pro-select',
        props: {
            placeholder: '请选择水库类型',
            data: reservoir_terrain_type.value,
            clearable: true
        },
        rules: [{required: true, message: '请选择水库类型'}],
        md: 8,
    },
    {
        label: '集雨面积(平方公里)',
        prop: 'watShedArea',
        component: 'el-input',
        props: {
            placeholder: '请输入集雨面积',
            clearable: true
        },
        md: 8,
    },
    {
        label: '防洪高水位',
        prop: 'uppLevFlco',
        component: 'el-input',
        props: {
            placeholder: '请输入防洪高水位',
            clearable: true
        },
        md: 8,
    },
    {
        label: '正常蓄水位（m）',
        prop: 'normWatLev',
        component: 'el-input',
        props: {
            placeholder: '请输入正常蓄水位',
            clearable: true
        },
        md: 8,
    },
    {
        label: '正常蓄水位相应水面面积',
        prop: 'normPoolStagArea',
        component: 'el-input',
        props: {
            placeholder: '请输入正常蓄水位相应水面面积',
            clearable: true
        },
        md: 8,
    },
    {
        label: '正常蓄水位相应库容',
        prop: 'normPoolStagCap',
        component: 'el-input',
        props: {
            placeholder: '请输入正常蓄水位相应库容',
            clearable: true
        },
        md: 8,
    },
    {
        label: '防洪限制水位（m）',
        prop: 'flLowLimLev',
        component: 'el-input',
        props: {
            placeholder: '请输入防洪限制水位',
            clearable: true
        },
        md: 8,
    },
    {
        label: '防洪限制水位库容',
        prop: 'flLowLimLevCap',
        component: 'el-input',
        props: {
            placeholder: '请输入防洪限制水位库容',
            clearable: true
        },
        md: 8,
    },
    {
        label: '防洪库容',
        prop: 'flcoCap',
        component: 'el-input',
        props: {
            placeholder: '请输入防洪库容',
            clearable: true
        },
        md: 8,
    },
    {
        label: '死水位',
        prop: 'deadLev',
        component: 'el-input',
        props: {
            placeholder: '请输入死水位',
            clearable: true
        },
        md: 8,
    },
    {
        label: '总库容（万m³）',
        prop: 'totCap',
        component: 'el-input',
        props: {
            placeholder: '请输入总库容',
            clearable: true
        },
        md: 8,
    },
    {
        label: '调洪库容（万m³）',
        prop: 'storFlCap',
        component: 'el-input',
        props: {
            placeholder: '请输入调洪库容',
            clearable: true
        },
        md: 8,
    },
    {
        label: '兴利库容（万m³）',
        prop: 'benResCap',
        component: 'el-input',
        props: {
            placeholder: '请输入兴利库容',
            clearable: true
        },
        md: 8,
    },
    {
        label: '死库容（万m³）',
        prop: 'deadCap',
        component: 'el-input',
        props: {
            placeholder: '请输入死库容',
            clearable: true
        },
        md: 8,
    },
    {
        label: '工程建设情况',
        prop: 'engStat',
        component: 'pro-radio',
        props: {
            data: engineering_construction_situation.value,
        },
        rules: [{required: true, message: '请选择工程建设情况'}],
        md: 8,
    },
    {
        label: '开工时间',
        prop: 'startDate',
        component: 'el-date-picker',
        props: {
            clearable: true,
            placeholder: '请选择开工时间',
            style: {width: '100%'},
            type: 'datetime',
            'value-format': 'YYYY-MM-DD HH:mm:ss'
        },
        rules: [{required: true, message: '请选择开工时间'}],
        md: 8,
    },
    {
        label: '建成时间',
        prop: 'compDate',
        component: 'el-date-picker',
        props: {
            clearable: true,
            placeholder: '请选择建成时间',
            style: {width: '100%'},
            type: 'datetime',
            'value-format': 'YYYY-MM-DD HH:mm:ss'
        },
        rules: [{required: true, message: '请选择建成时间'}],
        md: 8,
    },
    {
        label: '归属部门',
        prop: 'admDep',
        component: 'pro-select',
        props: {
            placeholder: '请选择归属部门',
            onChange: (val)=>{
                
            },
            data: relevant_departments.value,
            clearable: true
        },
        md: 8,
    },
    {
        label: '校核洪峰流量',
        prop: 'verifyPeakFlowRate',
        component: 'el-input',
        props: {
            placeholder: '请输入校核洪峰流量',
            clearable: true
        },
        md: 8,
    },
    {
        label: '最大洪峰流量',
        prop: 'designPeakFlowRate',
        component: 'el-input',
        props: {
            placeholder: '请输入最大洪峰流量',
            clearable: true
        },
        md: 8,
    },
    {
        label: '备注',
        prop: 'note',
        component: 'el-input',
        props: {
            type:'textarea',
            placeholder: '请输入备注',
            clearable: true
        },
        md: 24,
    },
].map(r=>({...r,props:{...r.props,disabled:true}}))))

// 详情菜单
const detailMenu = defineCrudMenuColumns({
  submit: false,
  reset: true,
  resetText: '关闭'
});
// 测站操作
const menu = defineCrudMenuColumns({
    label: '操作',
    add: false,
    fixed: 'right',
    addText: '新增',
    detail: true,
    reset: false,
    del: true,
    edit: true,
    detailText: '详情',
    editText: '编辑',
    delText: '删除',
    width: '150',
    detailProps:{
        type: 'text',
    },
    searchResetProps: {
        icon: 'Refresh'
    },
    searchProps: {
        type: 'primary',
        icon: 'Search'
    },
    searchText: '搜索',
    searchResetText: '重置',
    submitText: '确定',
    resetText: '取消'
});

// 初始化
onMounted(() => {
    getTableData();
})


// 获取表格数据
let getTableData = () => {
    getList({...serachForm.value}).then(res=>{
        tableData.value = res.data.list;
    })
}

const handleSearch = () =>{

}
// 打开弹窗
const beforeOpen = defineCrudBeforeOpen((done, type, row) => {
    console.log(type,"type")
    if (type === 'edit' || type === 'detail') {
        getDetail({resCode: row.resCode}).then(res=>{
            form.value = res.data;
        })
    } else {
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
        if (type == 'add') {
            addList(form.value).then(res=>{
                ElMessage({
                    message: '添加成功',
                    type: 'success'
                });
                getTableData();
                close();
            })
        } else {
            editList(form.value).then(res=>{
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
        deleteData(row.resCode).then(res=>{
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