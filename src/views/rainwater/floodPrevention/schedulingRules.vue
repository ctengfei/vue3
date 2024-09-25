<template>
    <div>
        <schedulRulesTable :title="'调度规则管理'" :getListUrl="getListUrl" :addUrl="addUrl" :editUrl="editUrl"
            :deleteUrl="deleteUrl" :detailUrl="detailUrl" :code="'id'" :columns="columns" :formColumns="formColumns"
            :menu="menu" />
    </div>

</template>
<script setup name="schedulingRules">
import {
    defineFormColumns,
    defineCrudColumns,
} from 'element-pro-components';
import schedulRulesTable from './components/schdulRulesCom/schedulRulesTable'
import { plansList } from '@/api/fourFloodPrevent/planManagement'
let addUrl = '/dispatch/add';
let editUrl = '/dispatch/update'
let getListUrl = '/dispatch/pageQuery';
let detailUrl = '/dispatch/getDetailById';
let deleteUrl = '/dispatch/'
const { proxy } = getCurrentInstance();
const { dispatch_type, enable_status, dispatch_frequency } = proxy.useDict('dispatch_type', 'enable_status', 'dispatch_frequency');
let planlist = ref([]);

let columns = defineCrudColumns(computed(() => [
    {
        label: '规则名称',
        prop: 'ruleName',
        component: 'el-input',
        props: {
            placeholder: '请输入规则名称',
            clearable: true
        },
        search: true,
    },
    {
        label: '调度类型',
        prop: 'dispatchType',
        component: 'pro-select',
        props: {
            style: { width: '200px' },
            data: dispatch_type.value,
            placeholder: '请选择调度类型',
            clearable: true
        },
        search: true,
        hide: true,
    },

    {
        label: '调度频次',
        prop: 'dispatchRate',
        component: 'el-input',
        props: {
            placeholder: '请输入调度频次',
            clearable: true
        },
        search: true,
        hide: true,
    },
    {
        label: '启用状态',
        prop: 'status',
        component: 'pro-select',
        props: {
            style: { width: '200px' },
            data: enable_status.value,
            placeholder: '请选择启用状态',
            clearable: true
        },
        search: true,
        hide: true,
    },
    {
        label: '调度类型',
        prop: 'dispatchType_dic',
    },
    {
        label: '调度规则',
        prop: 'dispatchRule',
    },
    {
        label: '调度内容',
        prop: 'dispatchContent',
    },
    {
        label: '预案库',
        prop: 'planName',
    },
    {
        label: '调度频率',
        prop: 'dispatchRate',
    },
    {
        label: '触发条件',
        prop: 'trigger',
    },
    {
        label: '启用状态',
        prop: 'status_dic',
    },
]));

let formColumns = defineFormColumns(computed(() => [
    {
        label: '规则名称',
        prop: 'ruleName',
        component: 'el-input',
        props: {
            placeholder: '请输入预案名称',
            clearable: true
        },
        rules: [{ required: true, message: '请输入测站名称' }],
        md: 24
    },
    {
        label: '调度类型',
        prop: 'dispatchType',
        component: 'pro-select',
        props: {
            style: { width: '100%' },
            data: dispatch_type.value,
            placeholder: '请选择预案分类',
            clearable: true
        },
        rules: [{ required: true, message: '请输入预案分类' }],
        md: 24
    },
    {
        label: '调度规则',
        prop: 'dispatchRule',
        component: 'el-input',
        props: {
            placeholder: '请输入调度规则',
            clearable: true
        },
        rules: [{ required: true, message: '请输入调度规则' }],
        md: 24
    },
    {
        label: '调度任务',
        prop: 'dispatchContent',
        component: 'el-input',
        props: {
            type: 'textarea',
            rows: 3,
            placeholder: '请输入调度任务',
            clearable: true
        },
        rules: [{ required: true, message: '请输入调度任务' }],
        md: 24
    },
    {
        label: '触发条件',
        prop: 'ruleForm',
        md: 24
    },
    {
        label: '调度频次',
        prop: 'dispatchRate',
        component: 'pro-select',
        props: {
            data: dispatch_frequency.value,
            clearable: true,
            placeholder: '请选择调度频次',
        },
        md: 24
    },
    // {
    //     label: '频次表达式',
    //     prop: 'dispatchCorn',
    //     component: 'el-input',
    //     props: {
    //         placeholder: '请输入频次表达式',
    //         clearable: true
    //     },
    //     md: 12
    // },
    {
        label: '调度预案',
        prop: 'planId',
        component: 'pro-select',
        props: {
            config: {value: 'id', label: 'planName'},
            style: { width: '100%' },
            data: planlist.value,
            placeholder: '请选择调度预案',
            clearable: true
        },
        rules: [{ required: true, message: '请选择调度预案' }],
        md: 24
    },
    {
        label: '蓄水时间',
        prop: 'retainWaterTime',
        component: 'el-date-picker',
        props: {
            clearable: true,
            type: 'datetime',
            placeholder: '请选择蓄水时间',
            'value-format': 'YYYY-MM-DD HH:mm:ss'
        },
        md: 12
    },
    {
        label: '蓄水方式',
        prop: 'retainWaterType',
        component: 'el-input',
        props: {
            placeholder: '请输入蓄水方式',
            clearable: true
        },
        md: 12
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

]));

let menu = {
    label: '操作',
    add: false,
    fixed: 'right',
    addText: '新增',
    detail: true,
    detailText: '详情',
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

onMounted(() => {
    plansList({}).then(res=>{
        planlist.value = res.data.list
    })
})
let monitorCode = ref();

let monitorTitle = ref();

</script>
<style lang='scss' scoped></style>