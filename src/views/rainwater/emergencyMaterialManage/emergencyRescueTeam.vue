<template>
    <emergencyTeamTable :title="'防汛责任人'" :getListUrl="getListUrl" :addUrl="addUrl" :editUrl="editUrl" :exportUrl="exportUrl"
        :deleteUrl="deleteUrl" :detailUrl="detailUrl" :code="'id'" :columns="columns" :isAdd="false"
        :formColumns="formColumns" :menu="menu" />
</template>
<script setup name="emergencyRescueTeam">
import {
    defineFormColumns,
    defineCrudColumns,
} from 'element-pro-components';
import { emergencyTeamTable } from './components'
let addUrl = '/ranks/add'
let getListUrl = '/ranks/pageQuery';
let detailUrl = '/ranks/getDetailById';
let editUrl = '/ranks/update';
let deleteUrl = '/ranks/';
let exportUrl = '/ranks/export';
const { proxy } = getCurrentInstance();
const { warn_type, publish_type } = proxy.useDict("warn_type", "publish_type");

let columns = defineCrudColumns(computed(() => [
    {
        label: '队伍名称',
        prop: 'ranksName',
        component: 'el-input',
        props: {
            placeholder: '请输入队伍名称',
            clearable: true
        },
        search: true,
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
    },
    {
        label: '人员数量',
        prop: 'personNum',
    },
    {
        label: '工作范围',
        prop: 'workRange',
    },
    {
        label: '人员名单',
        prop: 'personRoster',
    },
]));

let formColumns = defineFormColumns(computed(() => [
    {
        label: '队伍名称',
        prop: 'ranksName',
        component: 'el-input',
        props: {
            placeholder: '请输入队伍名称',
            clearable: true
        },
        rules: [{ required: true, message: '请输入队伍名称' }],
        md: 12
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
        rules: [
            { required: true, message: '请输入联系电话' },
            { pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/, message: "请输入正确的手机号码", trigger: "blur" }
        ],
        md: 12
    },
    {
        label: '人员数量',
        prop: 'personNum',
        component: 'el-input',
        props: {
            placeholder: '请输入人员数量',
            clearable: true
        },
        rules: [{ required: true, message: '请输入人员数量' }],
        md: 12
    },
    {
        label: '工作范围',
        prop: 'workRange',
        component: 'el-input',
        props: {
            type: 'textarea',
            rows: 3,
            placeholder: '请输入工作范围',
            clearable: true
        },
        rules: [{ required: true, message: '请输入工作范围' }],
        md: 24
    },
    
    {
        label: '人员名单',
        prop: 'personRoster',
        component: 'el-input',
        props: {
            placeholder: '请输入人员名单',
            clearable: true
        },
        rules: [{ required: true, message: '请输入人员名单' }],
        // component: 'pro-select',
        // props: {
        //     multiple: true,
        //     data: publish_type.value,
        //     placeholder: '请选择人员名单',
        //     clearable: true
        // },
        // rules: [{ required: true, message: '请选择人员名单' }],
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