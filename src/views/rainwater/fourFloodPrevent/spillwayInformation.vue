<template>
    <commonTable :title="'溢洪道基本信息'" :getListUrl="getListUrl" :addUrl="addUrl" :editUrl="editUrl" :deleteUrl="deleteUrl"
        :detailUrl="detailUrl" :code="'spiCode'" :columns="columns" :formColumns="formColumns" :menu="menu" />
</template>
<script setup name="spillwayInformation">
import {
    defineFormColumns,
} from 'element-pro-components';
import commonTable from './commonTable'

let getListUrl = '/spibase/pageQuery';
let addUrl = '/spibase/add';
let editUrl = '/spibase/update';
let deleteUrl = '/spibase/';
let detailUrl = '/spibase/getDetailById';
const { proxy } = getCurrentInstance();
const { structural_style, is_open } = proxy.useDict("structural_style", "is_open")
let columns = [
    {
        label: '溢洪道名称',
        prop: 'spiName',
        component: 'el-input',
        props: {
            placeholder: '请输入溢洪道名称',
            clearable: true
        },
        search: true,
    },
    {
        label: '溢洪道编码',
        prop: 'spiCode',
    },
    {
        label: '结构型式',
        prop: 'structuralStyle_dic',
    },
    {
        label: '地基特性',
        prop: 'foundationStyle_dic',
    },
    {
        label: '堰顶高程（m）',
        prop: 'weirCrestElevation',
    },
    {
        label: '堰顶净宽（m）',
        prop: 'weirCrestWidth',
    },
    {
        label: '最大泄流能力（m³/s）（P=3.33%）',
        prop: 'maxDischargeCapacit3',
    },
    {
        label: '最大泄流能力（m³/s）（P=2%）',
        prop: 'maxDischargeCapacit2',
    },
    {
        label: '最大泄流能力（m³/s）（P=0.1%）',
        prop: 'maxDischargeCapacit1',
    },
    {
        label: '开启状态',
        prop: 'isOpen_dic',
    },

]
let formColumns = defineFormColumns(computed(() =>[
    {
        label: '溢洪道名称',
        prop: 'spiName',
        component: 'el-input',
        props: {
            placeholder: '请输入溢洪道名称',
            clearable: true
        },
        rules: [{ required: true, message: '请输入溢洪道名称' }],
        md: 8
    },
    {
        label: '溢洪道编码',
        prop: 'spiCode',
        component: 'el-input',
        props: {
            placeholder: '请输入溢洪道编码',
            clearable: true
        },
        rules: [{ required: true, message: '请输入溢洪道编码' }],
        md: 8
    },
    {
        label: '结构型式',
        prop: 'structuralStyle',
        component: 'pro-radio',
        props: {
            data: structural_style.value,
        },
        rules: [{ required: true, message: '请选择结构型式' }],
        md: 8
    },
    {
        label: '地基特性',
        prop: 'foundationStyle',
        component: 'pro-radio',
        props: {
            data: [
                {label: "粉质黏土",value: '0'},
            ],
        },
        rules: [{ required: true, message: '请选择地基特性' }],
        md: 8
    },
    {
        label: '堰顶高程（m）',
        prop: 'weirCrestElevation',
        component: 'el-input',
        props: {
            placeholder: '请输入堰顶高程',
            clearable: true
        },
        md: 8
    },
    {
        label: '堰顶净宽（m）',
        prop: 'weirCrestWidth',
        component: 'el-input',
        props: {
            placeholder: '请输入堰顶净宽',
            clearable: true
        },
        md: 8
    },
    {
        label: '最大泄流能力P=3.33%',
        prop: 'maxDischargeCapacit3',
        component: 'el-input',
        props: {
            placeholder: '请输入最大泄流能力P=3.33%',
            clearable: true
        },
        md: 8
    },
    {
        label: '最大泄流能力P=2%',
        prop: 'maxDischargeCapacit2',
        component: 'el-input',
        props: {
            placeholder: '请输入最大泄流能力P=2%',
            clearable: true
        },
        md: 8
    },
    {
        label: '最大泄流能力P=0.1%',
        prop: 'maxDischargeCapacit1',
        component: 'el-input',
        props: {
            placeholder: '请输入最大泄流能力P=0.1%',
            clearable: true
        },
        md: 8
    },
    {
        label: '开启状态',
        prop: 'isOpen',
        component: 'pro-radio',
        props: {
            data: is_open.value,
        },
        rules: [{ required: true, message: '请选择开启状态' }],
        md: 8
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