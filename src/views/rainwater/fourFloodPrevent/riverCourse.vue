<template>

    <commonTable :title="'河流基本信息'" :getListUrl="getListUrl" :addUrl="addUrl" :editUrl="editUrl" :deleteUrl="deleteUrl"
        :detailUrl="detailUrl" :code="'rvCode'" :columns="columns" :formColumns="formColumns" :menu="menu" />

</template>
<script setup name="RiverCourse">
import {
    defineFormColumns,
} from 'element-pro-components';
import commonTable from './commonTable'

let getListUrl = '/rvbase/pageQuery';
let addUrl = '/rvbase/add';
let editUrl = '/rvbase/update';
let deleteUrl = '/rvbase/';
let detailUrl = '/rvbase/getDetailById';
const { proxy } = getCurrentInstance();
const { river_grade, river_type, cross_border_type, shore_not } = proxy.useDict("river_grade", "river_type", "cross_border_type", "shore_not");

let columns = [
    {
        label: '河流名称',
        prop: 'rvName',
        component: 'el-input',
        props: {
            placeholder: '请输入河流名称',
            clearable: true
        },
        search: true,
    },
    {
        label: '河流编码',
        prop: 'rvCode',
    },
    {
        label: '河源经度',
        prop: 'rvSourLong',
    },
    {
        label: '河源纬度',
        prop: 'rvSourLat',
    },
    {
        label: '河口经度',
        prop: 'rvMouLong',
    },
    {
        label: '河口纬度',
        prop: 'rvSourLat',
    },
    {
        label: '河源所在位置',
        prop: 'rvSourLoc',
    },
    {
        label: '河口所在位置',
        prop: 'rvMouLoc',
    },
    {
        label: '河流长度',
        prop: 'rvLen',
    },
    {
        label: '河流流域面积',
        prop: 'rvBasArea',
    },

]
let formColumns = defineFormColumns(computed(() => [
    {
        label: '河流名称',
        prop: 'rvName',
        component: 'el-input',
        props: {
            placeholder: '请输入河流名称',
            clearable: true
        },
        rules: [{ required: true, message: '请输入河流名称' }],
        md: 8,
    },
    {
        label: '河流编码',
        prop: 'rvCode',
        component: 'el-input',
        props: {
            placeholder: '请输入河流编码',
            clearable: true
        },
        rules: [{ required: true, message: '请输入河流编码' }],
        md: 8,
    },
    {
        label: '河源经度',
        prop: 'rvSourLong',
        component: 'el-input',
        props: {
            placeholder: '请输入河源经度',
            clearable: true
        },
        rules: [{ required: true, message: '请输入河源经度' }],
        md: 8,
    },
    {
        label: '河源纬度',
        prop: 'rvMouLat',
        component: 'el-input',
        props: {
            placeholder: '请输入河源纬度',
            clearable: true
        },
        rules: [{ required: true, message: '请输入河源纬度' }],
        md: 8,
    },
    {
        label: '河口经度',
        prop: 'rvMouLong',
        component: 'el-input',
        props: {
            placeholder: '请输入河口经度',
            clearable: true
        },
        rules: [{ required: true, message: '请输入河口经度' }],
        md: 8,
    },
    {
        label: '河口纬度',
        prop: 'rvSourLat',
        component: 'el-input',
        props: {
            placeholder: '请输入河口纬度',
            clearable: true
        },
        rules: [{ required: true, message: '请输入河口纬度' }],
        md: 8,
    },
    {
        label: '河源所在位置',
        prop: 'rvSourLoc',
        component: 'el-input',
        props: {
            placeholder: '请输入河源所在位置',
            clearable: true
        },
        rules: [{ required: true, message: '请输入河源所在位置' }],
        md: 8,
    },
    {
        label: '河口所在位置',
        prop: 'rvMouLoc',
        component: 'el-input',
        props: {
            placeholder: '请输入河口所在位置',
            clearable: true
        },
        rules: [{ required: true, message: '请输入河口所在位置' }],
        md: 8,
    },
    {
        label: '河流长度',
        prop: 'rvLen',
        component: 'el-input',
        props: {
            placeholder: '请输入河流长度',
            clearable: true
        },
        md: 8,
    },
    {
        label: '跨界类型',
        prop: 'crOverType',
        component: 'pro-select',
        props: {
            placeholder: '请选择跨界类型',
            onChange: (val) => { },
            data: cross_border_type.value,
            clearable: true
        },
        md: 8,
    },
    {
        label: '流经地区',
        prop: 'flowArea',
        component: 'el-input',
        props: {
            placeholder: '请输入流经地区',
            clearable: true
        },
        md: 8,
    },
    {
        label: '河流类型',
        prop: 'rvType',
        component: 'pro-select',
        props: {
            placeholder: '请选择河流类型',
            onChange: (val) => { },
            data: river_type.value,
            clearable: true
        },
        rules: [{ required: true, message: '请选择河流类型' }],
        md: 8,
    },
    {
        label: '河流级别',
        prop: 'rvGrad',
        component: 'pro-select',
        props: {
            placeholder: '请选择河流级别',
            data: river_grade.value,
            clearable: true
        },
        md: 8,
    },
    {
        label: '岸别',
        prop: 'bank',
        component: 'pro-radio',
        props: {
            placeholder: '请选择岸别',
            onChange: (val) => { },
            data: shore_not.value,
            clearable: true
        },
        md: 8,
    },
    {
        label: '河流流域面积',
        prop: 'rvBasArea',
        component: 'el-input',
        props: {
            placeholder: '请输入河流流域面积',
            clearable: true
        },
        md: 8,
    },
    {
        label: '平均比降',
        prop: 'averSlop',
        component: 'el-input',
        props: {
            placeholder: '请输入平均比降',
            clearable: true
        },
        md: 8,
    },
    {
        label: '备注',
        prop: 'note',
        component: 'el-input',
        props: {
            type: 'textarea',
            placeholder: '请输入备注',
            clearable: true
        },
        md: 12,
    },
]));


let menu = {
    label: '操作',
    add: false,
    fixed: 'right',
    addText: '新增',
    detail: true,
    detailText: '详情',
    detailProps:{
        type: 'text',
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

</script>
<style lang='scss' scoped></style>