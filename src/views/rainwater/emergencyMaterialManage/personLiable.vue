<template>
    <personLiableTable :title="'防汛责任人'" :getListUrl="getListUrl" :addUrl="addUrl" :editUrl="editUrl" :exportUrl="exportUrl"
        :deleteUrl="deleteUrl" :detailUrl="detailUrl" :code="'id'" :columns="columns" :isAdd="false"
        :formColumns="formColumns" :menu="menu" />
</template>
<script setup name="personLiable">
import {
    defineFormColumns,
    defineCrudColumns,
} from 'element-pro-components';
import { personLiableTable } from './components'
import { onMounted } from 'vue';
import { organizationList } from '@/api/fourFloodPrevent/planManagement'
let addUrl = '/floodhead/add'
let getListUrl = '/floodhead/pageQuery';
let detailUrl = '/floodhead/getDetailById';
let editUrl = '/floodhead/update';
let deleteUrl = '/floodhead/';
let exportUrl = '/floodhead/export';
const { proxy } = getCurrentInstance();
const { warn_type, publish_type } = proxy.useDict("warn_type", "publish_type");


let organizListArr = ref([]);


onMounted(() => {
    organizationList({pageNum: 1, pageSize: 9999}).then(res=>{
        organizListArr.value = res.data.list
    })
})

let columns = defineCrudColumns(computed(() => [
    // {
    //     label: '工程名称',
    //     prop: 'headName',
    //     component: 'el-input',
    //     props: {
    //         placeholder: '请输入工程名称',
    //         clearable: true
    //     },
    //     search: true,
    //     hide: true,
    // },
    {
        label: '责任人姓名',
        prop: 'headName',
        component: 'el-input',
        props: {
            placeholder: '请输入责任人姓名',
            clearable: true
        },
        search: true,
    },
    {
        label: '联系电话',
        prop: 'headPhone',
    },
    {
        label: '建筑物名称',
        prop: 'belongingBuilding',
        component: 'el-input',
        props: {
            placeholder: '请输入建筑物名称',
            clearable: true
        },
        search: true,
        hide: true,
    },
    {
        label: '所属组织机构',
        prop: 'groupName',
    },
    {
        label: '组织机构责任人',
        prop: 'groupHead',
    },

    {
        label: '责任开始时间',
        prop: 'startTime',
    },
    {
        label: '责任结束时间',
        prop: 'endTime',
    },
    // {
    //     label: '状态',
    //     prop: 'status',
    //     component: 'pro-select',
    //     props: {
    //         style: { width:'200px' },
    //         data: [],
    //         placeholder: '请选择状态',
    //         clearable: true
    //     },
    //     search: true,
    //     hide: true,
    // },
    // {
    //     label: '状态',
    //     prop: 'status_dic',
    // },
    
]));

let formColumns = defineFormColumns(computed(() => [
    {
        label: '责任人姓名',
        prop: 'headName',
        component: 'el-input',
        props: {
            placeholder: '请输入责任人姓名',
            clearable: true
        },
        rules: [{ required: true, message: '请输入责任人姓名' }],
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
        rules: [
            { required: true, message: '请输入联系电话' },
            { pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/, message: "请输入正确的手机号码", trigger: "blur" }
        ],
        md: 12
    },
    
    {
        label: '责任期限开始时间',
        prop: 'startTime',
        component: 'el-date-picker',
        props: {
            style: { width:'100%' },
            clearable: true,
            type: 'datetime',
            placeholder: '选择时间',
            'value-format': 'YYYY-MM-DD HH:mm:ss'
        },
        rules: [{ required: true, message: '请选择责任期限开始时间' }],
        md: 12
    },
    {
        label: '责任期限结束时间',
        prop: 'endTime',
        component: 'el-date-picker',
        props: {
            style: { width:'100%' },
            clearable: true,
            type: 'datetime',
            placeholder: '选择时间',
            'value-format': 'YYYY-MM-DD HH:mm:ss'
        },
        rules: [{ required: true, message: '请选择责任期限结束时间' }],
        md: 12
    },
    {
        label: '所属建筑物',
        prop: 'belongingBuilding',
        component: 'el-input',
        props: {
            placeholder: '请输入所属建筑物',
            clearable: true
        },
        md: 12
    },
    {
        label: '建筑物管理单位',
        prop: 'buildingUnit',
        component: 'el-input',
        props: {
            placeholder: '请输入建筑物管理单位',
            clearable: true
        },
        md: 12
    },
    {
        label: '所属组织机构',
        prop: 'groupId',
        component: 'pro-select',
        props: {
            data: organizListArr.value,
            config: { value: 'id', label: 'groupName' },
            placeholder: '请选择所属组织机构',
            clearable: true
        },
        rules: [{ required: true, message: '请选择所属组织机构' }],
        md: 24
    },
    {
        label: '职责描述',
        prop: 'jobDescription',
        component: 'el-input',
        props: {
            type: 'textarea',
            rows: 3,
            placeholder: '请输入责任人姓名',
            clearable: true
        },
        md: 24
    },
    {
        label: '文件上传',
        prop: 'fileList',
        md: 24
    },
]));



let menu = {
    label: '操作',
    add: false,
    fixed: 'right',
    addText: '新增',
    detail: true,
    detailText: '查看',
    detailProps: {
        type: 'success',
        text: 'success',
        link: true
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

let isMonitor = ref(true);

let monitorCode = ref();

let monitorTitle = ref();
const clickMonitor = (e) => {
    monitorTitle.value = e.stnm
    monitorCode.value = e.stcd
    isMonitor.value = !isMonitor.value
}

const clickBack = (e) => {
    isMonitor.value = e
}
</script>
<style lang='scss' scoped></style>