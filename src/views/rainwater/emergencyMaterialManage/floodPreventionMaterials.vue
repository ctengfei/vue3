<template>
    <floodMaterialsTable :title="'防汛物资'" :getListUrl="getListUrl" :addUrl="addUrl" :editUrl="editUrl" :exportUrl="exportUrl"
        :deleteUrl="deleteUrl" :detailUrl="detailUrl" :code="'id'" :columns="columns" :isAdd="false"
        :formColumns="formColumns" :menu="menu" />
</template>
<script setup name="floodPreventionMaterials">
import {
    defineFormColumns,
    defineCrudColumns,
} from 'element-pro-components';
import { floodMaterialsTable } from './components'
let addUrl = '/material/add'
let getListUrl = '/material/pageQuery';
let detailUrl = '/material/getDetailById';
let editUrl = '/material/update';
let deleteUrl = '/material/';
let exportUrl = '/material/export';
const { proxy } = getCurrentInstance();
const { materials_type } = proxy.useDict("materials_type");

let columns = defineCrudColumns(computed(() => [
    {
        label: '物资名称',
        prop: 'materialsName',
        component: 'el-input',
        props: {
            placeholder: '请输入物资名称',
            clearable: true
        },
        search: true,
    },
    {
        label: '物资类型',
        prop: 'materialsType',
        component: 'pro-select',
        props: {
            style: { width: '200px' },
            data: materials_type.value,
            placeholder: '请选择物资类型',
            clearable: true
        },
        search: true,
    },
    {
        label: '规格型号',
        prop: 'standardModel',
    },
    {
        label: '物资数量',
        prop: 'materialsNum',
    },
    {
        label: '物资功能作用',
        prop: 'materialsRole',
    },
    {
        label: '存放地点',
        prop: 'storageLocation',
        component: 'el-input',
        props: {
            placeholder: '请输入存放地点',
            clearable: true
        },
        search: true,
    },
    {
        label: '负责人',
        prop: 'head',
    },
    {
        label: '联系电话',
        prop: 'headPhone',
    },
]));

let formColumns = defineFormColumns(computed(() => [
{
        label: '物资名称',
        prop: 'materialsName',
        component: 'el-input',
        props: {
            placeholder: '请输入物资名称',
            clearable: true
        },
        rules: [{ required: true, message: '请输入物资名称' }],
        md: 12
    },
    {
        label: '物资类型',
        prop: 'materialsType',
        component: 'pro-select',
        props: {
            style: { width: '100%' },
            data: materials_type.value,
            placeholder: '请选择物资类型',
            clearable: true
        },
        rules: [{ required: true, message: '请选择物资类型' }],
        md: 12
    },
    {
        label: '规格型号',
        prop: 'standardModel',
        component: 'el-input',
        props: {
            placeholder: '请输入规格型号',
            clearable: true
        },
        rules: [{ required: true, message: '请输入规格型号' }],
        md: 12
    },
    {
        label: '物资数量',
        prop: 'materialsNum',
        component: 'el-input',
        props: {
            placeholder: '请输入物资数量',
            clearable: true
        },
        rules: [{ required: true, message: '请输入物资数量' }],
        md: 12
    },
    {
        label: '存放地点',
        prop: 'storageLocation',
        component: 'el-input',
        props: {
            placeholder: '请输入存放地点',
            clearable: true
        },
        rules: [{ required: true, message: '请输入存放地点' }],
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
        // rules: [{ required: true, message: '请输入负责人' }],
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
        // rules: [
        //     { required: true, message: '请输入联系电话' },
        //     { pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/, message: "请输入正确的手机号码", trigger: "blur" }
        // ],
        md: 12
    },
    
    {
        label: '物资功能作用',
        prop: 'materialsRole',
        component: 'el-input',
        props: {
            type: 'textarea',
            rows: 3,
            placeholder: '请输入物资功能作用',
            clearable: true
        },
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