<template>
    <div>
        <planLibraryTable :title="'预案库管理'" :getListUrl="getListUrl" :addUrl="addUrl" :editUrl="editUrl" 
        :deleteUrl="deleteUrl" :detailUrl="detailUrl" :code="'id'" :columns="columns"
        :formColumns="formColumns" :menu="menu" @clickMonitor="clickMonitor" />
    </div>
</template>
<script setup name="planLibrary">
import {
    defineFormColumns,
    defineCrudColumns,
} from 'element-pro-components';
import planLibraryTable from './components/planLibrCom/planLibraryTable'

let addUrl = '/library/add';
let editUrl = '/library/update'
let getListUrl = '/library/pageQuery';
let detailUrl = '/library/getDetailById';
let deleteUrl = '/library/';
const { proxy } = getCurrentInstance();
const { reserve_plan_type, enable_status } = proxy.useDict('reserve_plan_type', 'enable_status');


let columns = defineCrudColumns(computed(() => [
    {
        label: '预案名称',
        prop: 'planName',
        component: 'el-input',
        props: {
            placeholder: '请输入预案名称',
            clearable: true
        },
        search: true,
    },
    {
        label: '责任单位',
        prop: 'dutyUnit',
        component: 'el-input',
        props: {
            placeholder: '请输入责任单位',
            clearable: true
        },
        search: true,
    },
    {
        label: '预案分类',
        prop: 'planType',
        component: 'pro-select',
        props: {
            style: { width: '200px' },
            data: reserve_plan_type.value,
            placeholder: '请选择预案名称',
            clearable: true
        },
        search: true,
        hide: true,
    },
    {
        label: '预案状态',
        prop: 'status',
        component: 'pro-select',
        props: {
            style: { width: '200px' },
            data: enable_status.value,
            placeholder: '请选择预案名称',
            clearable: true
        },
        search: true,
        hide: true,
    },
    {
        label: '预案分类',
        prop: 'planType_dic',
    },
    {
        label: '预案状态',
        prop: 'status_dic',
    },
    {
        label: '负责人',
        prop: 'head',
        component: 'el-input',
        props: {
            placeholder: '请输入负责人',
            clearable: true
        },
        search: true,
    },
    {
        label: '联系电话',
        prop: 'headPhone',
        component: 'el-input',
        props: {
            placeholder: '请输入负责人',
            clearable: true
        },
    },
]));

let formColumns = defineFormColumns(computed(() => [
{
        label: '预案名称',
        prop: 'planName',
        component: 'el-input',
        props: {
            placeholder: '请输入预案名称',
            clearable: true
        },
        rules: [{ required: true, message: '请输入测站名称' }],
        md: 24
    },
    {
        label: '预案分类',
        prop: 'planType',
        component: 'pro-select',
        props: {
            style: { width: '100%' },
            data: reserve_plan_type.value,
            placeholder: '请选择预案分类',
            clearable: true
        },
        rules: [{ required: true, message: '请选择预案分类' }],
        md: 24
    },
    {
        label: '启用状态',
        prop: 'status',
        component: 'pro-radio',
        props: {
            data: enable_status.value,
            placeholder: '请选择启用情况',
            clearable: true
        },
        md: 12
    },
    {
        label: '责任单位',
        prop: 'dutyUnit',
        component: 'el-input',
        props: {
            placeholder: '请输入责任单位',
            clearable: true
        },
        md: 24
    },
    {
        label: '负责人',
        prop: 'head',
        component: 'el-input',
        props: {
            placeholder: '请输入负责人',
            clearable: true
        },
        rules: [{ required: true, message: '请输入负责人' }],
        md: 12
    },
    {
        label: '联系电话',
        prop: 'headPhone',
        component: 'el-input',
        props: {
            placeholder: '请输入联系电话',
            clearable: true
        },
        rules: [{ pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/, message: "请输入正确的手机号码", trigger: "blur" }],
        md: 12
    },
    {
        label: '方案时间',
        prop: 'startEndTime',
        md: 24
    },
    {
        label: '调度结果',
        prop: 'dispatchResult',
        component: 'el-input',
        props: {
            type: 'textarea',
            rows: 3,
            placeholder: '请输入调度结果',
            clearable: true
        },
        rules: [{ required: true, message: '请输入调度结果' }],
        md: 24
    },
    {
        label: '响应措施',
        prop: 'responseMeasure',
        component: 'el-input',
        props: {
            type: 'textarea',
            rows: 3,
            placeholder: '请输入响应措施',
            clearable: true
        },
        rules: [{ required: true, message: '请输入响应措施' }],
        md: 24
    },
    {
        label: '人员保障',
        prop: 'personGuaranteeDTOS',
        md: 24
    },
    {
        label: '应急物资',
        prop: 'emergencyMaterialsDTOS',
        md: 24
    },
    {
        label: '撤离路线',
        prop: 'evacuateLineDTOS',
        md: 24
    },
    
    

]));
onMounted(() => {

})
let menu = {
    label: '操作',
    add: false,
    fixed: 'right',
    addText: '新增',
    detail: true,
    detailText: '详情',
    detailProps: {
        type: 'success',
        link: true,
        text: 'success'
    },
    reset: false,
    del: true,
    edit: true,
    editText: '编辑',
    delText: '删除',
    width: '150',
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
}

const clickMonitor = (e) => {
    let files = JSON.parse(e);
    dialogVisible.value = true;
    pdfSource.value = `${import.meta.env.VITE_FILE_URL}${files[0].url}`
    
}

// 弹窗关闭
const handleClose = () => {
    dialogVisible.value = false
}
// 附件下载
const fileDownload = () => {
    vuePdfRef.value.download(pdfSource.value)
}
</script>
<style lang='scss' scoped>
.fileDownload{
    font-size: 16px;
    height: 30px;
    line-height: 30px;
    color: #409EFF;
    cursor: pointer;

}
.pdf-preview{
    height: 70vh;
    overflow: hidden;
}
.vue-pdf-embed {
  text-align: center;
  width: 90%;
  margin: 0 auto;
  box-sizing: border-box;
}

.pdf-preview {
  position: relative;
  height: 70vh !important;
  padding: 20px 0;
  box-sizing: border-box;
  background-color: #e9e9e9;
  overflow-y: hidden;
}
.pdf-wrap {
  overflow-y: auto;
}

</style>