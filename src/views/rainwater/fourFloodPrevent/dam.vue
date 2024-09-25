<template>

    <commonTable :title="'大坝基本信息'" :getListUrl="getListUrl" :addUrl="addUrl" :editUrl="editUrl" :deleteUrl="deleteUrl"
        :detailUrl="detailUrl" :code="'damCode'" :columns="columns" :formColumns="formColumns" :menu="menu" />
</template>
<script setup name="dam">
import {
    defineFormColumns,
} from 'element-pro-components';
import commonTable from './commonTable'

let getListUrl = '/dambase/pageQuery';
let addUrl = '/dambase/add';
let editUrl = '/dambase/update';
let deleteUrl = '/dambase/';
let detailUrl = '/dambase/getDetailById';
const { proxy } = getCurrentInstance();
const { is_main_dam, dam_grade, dam_material_type, dam_structure_type, engineering_grade, elevation_system, 
    engineering_construction_situation } = proxy.useDict("is_main_dam", "dam_grade", "dam_material_type", "dam_structure_type", "engineering_grade", "elevation_system", "engineering_construction_situation");

let columns = [
    {
        label: '大坝名称',
        prop: 'damName',
        component: 'el-input',
        props: {
            placeholder: '请输入大坝名称',
            clearable: true
        },
        search: true,
    },
    {
        label: '大坝编码',
        prop: 'damCode',
    },
    // {
    //     label: '起点经度',
    //     prop: 'startLong',
    // },
    // {
    //     label: '起点纬度',
    //     prop: 'startLat',
    // },
    // {
    //     label: '终点经度',
    //     prop: 'endLong',
    // },
    // {
    //     label: '终点纬度',
    //     prop: 'endLat',
    // },
    {
        label: '大坝所在位置',
        prop: 'damLoc',
    },
    {
        label: '是否主坝',
        prop: 'ifMainDam_dic',
    },
    {
        label: '工程等别',
        prop: 'engGrad_dic',
    },
    {
        label: '坝顶高程',
        prop: 'damTopElev',
    },
    {
        label: '最大坝高',
        prop: 'damMaxHeig',
    },
    {
        label: '坝顶长度',
        prop: 'damTopLen',
    },
    {
        label: '坝顶宽度',
        prop: 'damTopWid',
    },

]
let formColumns = defineFormColumns(computed(() =>[
    {
        label: '大坝名称',
        prop: 'damName',
        component: 'el-input',
        props: {
            placeholder: '请输入大坝名称',
            clearable: true
        },
        rules: [{ required: true, message: '请输入大坝名称' }],
        md: 8,
    },
    {
        label: '大坝代码',
        prop: 'damCode',
        component: 'el-input',
        props: {
            placeholder: '请输入大坝代码',
            clearable: true
        },
        rules: [{ required: true, message: '请输入大坝代码' }],
        md: 8,
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
        md: 8,
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
        md: 8,
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
        md: 8,
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
        md: 8,
    },
    {
        label: '是否主坝',
        prop: 'ifMainDam',
        component: 'pro-radio',
        props: {
            data: is_main_dam.value,
        },
        rules: [{required: true, message: '请选择是否主坝'}],
        md: 8,
    },
    {
        label: '大坝所在位置',
        prop: 'damLoc',
        component: 'el-input',
        props: {
            placeholder: '请输入大坝所在位置',
            clearable: true
        },
        rules: [{ required: true, message: '请输入大坝所在位置' }],
        md: 8,
    },
    {
        label: '大坝级别',
        prop: 'damGrad',
        component: 'pro-select',
        props: {
            placeholder: '请选择大坝级别',
            onChange: (val)=>{},
            data: dam_grade.value,
            clearable: true
        },
        rules: [{ required: true, message: '请选择大坝级别' }],
        md: 8,
    },

    {
        label: '坝顶高程',
        prop: 'damTopElev',
        component: 'el-input',
        props: {
            placeholder: '请输入坝顶高程',
            clearable: true
        },
        md: 8,
    },
    {
        label: '最大坝高',
        prop: 'damMaxHeig',
        component: 'el-input',
        props: {
            placeholder: '请输入最大坝高',
            clearable: true
        },
        rules: [{ required: true, message: '请输入最大坝高' }],
        md: 8,
    },
    {
        label: '坝顶长度',
        prop: 'damTopLen',
        component: 'el-input',
        props: {
            placeholder: '请输入坝顶长度',
            clearable: true
        },
        rules: [{ required: true, message: '请输入坝顶长度' }],
        md: 8,
    },
    {
        label: '坝顶宽度',
        prop: 'damTopWid',
        component: 'el-input',
        props: {
            placeholder: '请输入坝顶宽度',
            clearable: true
        },
        rules: [{ required: true, message: '请输入坝顶宽度' }],
        md: 8,
    },
    {
        label: '高程系统',
        prop: 'elevSys',
        component: 'pro-select',
        props: {
            placeholder: '请选择高程系统',
            onChange: (val)=>{},
            data: elevation_system.value,
            clearable: true
        },
        rules: [{ required: true, message: '请选择高程系统' }],
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
        label: '大坝材料类型',
        prop: 'damTypeMat',
        component: 'pro-select',
        props: {
            placeholder: '请选择大坝材料类型',
            data: dam_material_type.value,
            clearable: true
        },
        md: 8,
    },
    {
        label: '大坝结构类型',
        prop: 'damTypeStr',
        component: 'pro-select',
        props: {
            placeholder: '请选择大坝结构类型',
            data: dam_structure_type.value,
            clearable: true
        },
        rules: [{required: true, message: '请选择大坝结构类型'}],
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
        label: '备注',
        prop: 'note',
        component: 'el-input',
        props: {
            placeholder: '请输入死库容',
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