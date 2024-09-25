<template>

    <commonTable :title="'涵洞基本信息'" :getListUrl="getListUrl" :addUrl="addUrl" :editUrl="editUrl" :deleteUrl="deleteUrl"
        :detailUrl="detailUrl" :code="'culvCode'" :columns="columns" :formColumns="formColumns" :menu="menu" />

</template>
<script setup name="culvertInformation">
import {
    defineFormColumns,
} from 'element-pro-components';
import commonTable from './commonTable'

const { proxy } = getCurrentInstance();
const { pipeline_cross_sectional_shape, 
    project_scale, 
    reservoir_terrain_type, 
    relevant_departments,
    engineering_construction_situation } = proxy.useDict("pipeline_cross_sectional_shape", "project_scale", "reservoir_terrain_type", "relevant_departments", "engineering_construction_situation");

let getListUrl = '/culvbase/pageQuery';
let addUrl = '/culvbase/add';
let editUrl = '/culvbase/update';
let deleteUrl = '/culvbase/';
let detailUrl = '/culvbase/getDetailById';
let columns = [
    {
        label: '涵洞名称',
        prop: 'culvName',
        component: 'el-input',
        props: {
            placeholder: '请输入涵洞名称',
            clearable: true
        },
        search: true,
    },
    {
        label: '涵洞编码',
        prop: 'culvCode',
    },
    // {
    //     label: '行政区划',
    //     prop: 'adcd',
    // },
    {
        label: '涵洞所在位置',
        prop: 'culvLoc',
    },
    {
        label: '涵洞过水能力',
        prop: 'culvWatProp',
    },
    {
        label: '工程建设情况',
        prop: 'engStat_dic',
    },
    {
        label: '孔数',
        prop: 'orifNum',
    },
    {
        label: '管道内径',
        prop: 'pipeIndi',
    },
    {
        label: '管道净高',
        prop: 'pipeNetHeig',
    },
    {
        label: '管道净宽',
        prop: 'pipeNetWid',
    },
    {
        label: '管道断面形状',
        prop: 'pipeSecType_dic',
    },

]
let formColumns = defineFormColumns(computed(() =>[
{
        label: '涵洞名称',
        prop: 'culvName',
        component: 'el-input',
        props: {
            placeholder: '请输入涵洞名称',
            clearable: true
        },
        rules: [{ required: true, message: '请输入涵洞名称' }],
        md: 8,
    },
    {
        label: '涵洞编码',
        prop: 'culvCode',
        component: 'el-input',
        props: {
            placeholder: '请输入涵洞编码',
            clearable: true
        },
        rules: [{ required: true, message: '请输入涵洞编码' }],
        md: 8,
    },
    // {
    //     label: '行政区划',
    //     prop: 'adcd',
    //     component: 'el-input',
    //     props: {
    //         placeholder: '请输入行政区划',
    //         clearable: true
    //     },
    //     rules: [{ required: true, message: '请输入行政区划' }],
    //     md: 8,
    // },
    {
        label: '涵洞经度',
        prop: 'culvLong',
        component: 'el-input',
        props: {
            placeholder: '请输入涵洞经度',
            clearable: true
        },
        rules: [{ required: true, message: '请输入涵洞经度' }],
        md: 8,
    },
    {
        label: '涵洞维度',
        prop: 'culvLat',
        component: 'el-input',
        props: {
            placeholder: '请输入涵洞维度',
            clearable: true
        },
        rules: [{ required: true, message: '请输入涵洞维度' }],
        md: 8,
    },
    {
        label: '涵洞所在位置',
        prop: 'culvLoc',
        component: 'el-input',
        props: {
            placeholder: '请输入涵洞所在位置',
            clearable: true
        },
        rules: [{ required: true, message: '请输入涵洞所在位置' }],
        md: 8,
    },
    {
        label: '涵洞过水能力',
        prop: 'culvWatProp',
        component: 'el-input',
        props: {
            type: 'number',
            placeholder: '请输入涵洞过水能力',
            clearable: true
        },
        rules: [{ required: true, message: '请输入涵洞过水能力' }],
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
        label: '孔数',
        prop: 'orifNum',
        component: 'el-input',
        props: {
            placeholder: '请输入孔数',
            clearable: true
        },
        rules: [{ required: true, message: '请输入孔数' }],
        md: 8,
    },
    {
        label: '管道内径',
        prop: 'pipeIndi',
        component: 'el-input',
        props: {
            placeholder: '请输入管道内径',
            clearable: true
        },
        rules: [{ required: true, message: '请输入管道内径' }],
        md: 8,
    },
    {
        label: '管道净高',
        prop: 'pipeNetHeig',
        component: 'el-input',
        props: {
            placeholder: '请输入管道净高',
            clearable: true
        },
        rules: [{ required: true, message: '请输入管道净高' }],
        md: 8,
    },
    {
        label: '管道净宽',
        prop: 'pipeNetWid',
        component: 'el-input',
        props: {
            placeholder: '请输入管道净宽',
            clearable: true
        },
        rules: [{ required: true, message: '请输入管道净宽' }],
        md: 8,
    },
    {
        label: '管道断面形状',
        prop: 'pipeSecType',
        component: 'pro-select',
        props: {
            placeholder: '请选择管道断面形状',
            onChange: (val)=>{},
            data: pipeline_cross_sectional_shape.value,
            clearable: true
        },
        rules: [{ required: true, message: '请选择管道断面形状' }],
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