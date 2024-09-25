<template>
    <commonTable :title="'水闸基本信息'" :getListUrl="getListUrl" :addUrl="addUrl" :editUrl="editUrl" :deleteUrl="deleteUrl"
        :detailUrl="detailUrl" :code="'wagaCode'" :columns="columns" :formColumns="formColumns" :menu="menu" />
</template>
<script setup name="gateInformation">
import {
    defineFormColumns,
} from 'element-pro-components';
import commonTable from './commonTable'

const { proxy } = getCurrentInstance();
const { sluice_type, engineering_grade, project_scale, 
    engineering_construction_situation, 
    relevant_departments } = proxy.useDict("sluice_type", "engineering_grade", "project_scale", "engineering_construction_situation", "relevant_departments");
let getListUrl = '/wagabase/pageQuery';
let addUrl = '/wagabase/add';
let editUrl = '/wagabase/update';
let deleteUrl = '/wagabase/';
let detailUrl = '/wagabase/getDetailById';
let columns = [
    {
        label: '水闸名称',
        prop: 'wagaName',
        component: 'el-input',
        props: {
            placeholder: '请输入水闸名称',
            clearable: true
        },
        search: true,
    },
    {
        label: '水闸编码',
        prop: 'wagaCode',
    },
    {
        label: '水闸类型',
        prop: 'wagaType_dic',
    },
    {
        label: '水闸所在位置',
        prop: 'wagaLoc',
    },
    {
        label: '水闸用途',
        prop: 'wagaUse',
    },
    {
        label: '工程等别',
        prop: 'engGrad_dic',
    },
    {
        label: '工程规模',
        prop: 'engScal_dic',
    },
    {
        label: '工程建设情况',
        prop: 'engStat_dic',
    },
    {
        label: '闸孔数量',
        prop: 'gaorNum',
    },
    {
        label: '闸孔总净宽',
        prop: 'gaorTotNetWid',
    },
    {
        label: '设计最大过闸流量',
        prop: 'desLockDisc',
    },
    {
        label: '主要建筑物级别',
        prop: 'mainBuildGrad',
    },
    {
        label: '归口管理部门',
        prop: 'admDep_dic',
    },


]
let formColumns = defineFormColumns(computed(() =>[
{
        label: '水闸名称',
        prop: 'wagaName',
        component: 'el-input',
        props: {
            placeholder: '请输入水闸名称',
            clearable: true
        },
        rules: [{ required: true, message: '请输入水闸名称' }],
        md: 8
    },
    {
        label: '水闸编码',
        prop: 'wagaCode',
        component: 'el-input',
        props: {
            placeholder: '请输入水闸编码',
            clearable: true
        },
        md: 8
    },
    {
        label: '水闸类型',
        prop: 'wagaType',
        component: 'pro-select',
        props: {
            data: sluice_type.value,
            placeholder: '请输入水闸编码',
            clearable: true
        },
        rules: [{ required: true, message: '请输入水闸编码' }],
        md: 8
    },
    {
        label: '水闸所在位置',
        prop: 'wagaLoc',
        component: 'el-input',
        props: {
            placeholder: '请输入水闸所在位置',
            clearable: true
        },
        rules: [{ required: true, message: '请输入水闸所在位置' }],
        md: 8
    },
    {
        label: '水闸用途',
        prop: 'wagaUse',
        component: 'el-input',
        props: {
            placeholder: '请输入水闸用途',
            clearable: true
        },
        md: 8
    },
    {
        label: '起点经度',
        prop: 'startLong',
        component: 'el-input',
        props: {
            placeholder: '请输入起点经度',
            clearable: true
        },
        rules: [{ required: true, message: '请输入起点经度' }],
        md: 8
    },
    {
        label: '起点纬度',
        prop: 'startLat',
        component: 'el-input',
        props: {
            placeholder: '请输入起点纬度',
            clearable: true
        },
        rules: [{ required: true, message: '请输入起点纬度' }],
        md: 8
    },
    {
        label: '终点经度',
        prop: 'endLong',
        component: 'el-input',
        props: {
            placeholder: '请输入终点经度',
            clearable: true
        },
        rules: [{ required: true, message: '请输入终点经度' }],
        md: 8
    },
    {
        label: '终点纬度',
        prop: 'endLat',
        component: 'el-input',
        props: {
            placeholder: '请输入终点纬度',
            clearable: true
        },
        rules: [{ required: true, message: '请输入终点纬度' }],
        md: 8
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
        label: '闸孔数量',
        prop: 'gaorNum',
        component: 'el-input',
        props: {
            placeholder: '请输入闸孔数量',
            clearable: true
        },
        md: 8
    },
    {
        label: '闸孔总净宽',
        prop: 'gaorTotNetWid',
        component: 'el-input',
        props: {
            placeholder: '请输入闸孔总净宽',
            clearable: true
        },
        md: 8
    },
    {
        label: '设计最大过闸流量',
        prop: 'desLockDisc',
        component: 'el-input',
        props: {
            placeholder: '请输入设计最大过闸流量',
            clearable: true
        },
        md: 8
    },
    {
        label: '主要建筑物级别',
        prop: 'mainBuildGrad',
        component: 'el-input',
        props: {
            placeholder: '请输入主要建筑物级别',
            clearable: true
        },
        rules: [{ required: true, message: '请输入主要建筑物级别' }],
        md: 8
    },
    {
        label: '归口管理部门',
        prop: 'admDep',
        component: 'pro-select',
        props: {
            data: relevant_departments.value,
            placeholder: '请选择归口管理部门',
            clearable: true
        },
        md: 8
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