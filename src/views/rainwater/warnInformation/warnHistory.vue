<template>
    <commonTable :title="'预警历史记录'" :getListUrl="getListUrl" :addUrl="addUrl" :editUrl="editUrl"
        :deleteUrl="deleteUrl" :detailUrl="detailUrl" :code="'id'" :columns="columns" :isAdd="false"
        :formColumns="formColumns" :menu="menu" />
</template>
<script setup name="warnHistory">
import {
    defineFormColumns,
    defineCrudColumns,
} from 'element-pro-components';
import { commonTable } from './components'
let getListUrl = '/warnpublish/pageQuery';
let detailUrl = '/warnpublish/getDetailById';
let deleteUrl = '/warnpublish/'
const { proxy } = getCurrentInstance();
const { warn_type, publish_type } = proxy.useDict("warn_type", "publish_type");

const warnGrade = reactive([
    { value: '1', label: 'Ⅰ级' },
    { value: '2', label: 'Ⅱ级' },
    { value: '3', label: 'Ⅲ级' },
    { value: '3', label: 'Ⅳ级' },
])
let columns = defineCrudColumns(computed(() => [
    {
        label: '预警类型',
        prop: 'warnType',
        component: 'pro-select',
        props: {
            style:{width:'200px'},
            data: warn_type.value,
            placeholder: '请选择预警类型',
            clearable: true
        },
        search: true,
        hide: true,
    },
    {
        label: '发布类型',
        prop: 'publishType',
        component: 'pro-select',
        props: {
            style:{width:'200px'},
            data: publish_type.value,
            placeholder: '请选择发布类型',
            clearable: true
        },
        search: true,
        hide: true,
    },
    {
        label: '预警等级',
        prop: 'warnGrade',
        component: 'pro-select',
        props: {
            style:{width:'200px'},
            data: warnGrade,
            placeholder: '请选择预警等级',
            clearable: true
        },
        search: true,
        hide: true,
    },
    {
        label: '发布对象',
        prop: 'publishObject',
        component: 'el-input',
        props: {
            placeholder: '请输入发布对象',
            clearable: true
        },
        search: true,
        hide: true,
    },
    {
        label: '查询时间',
        prop: 'tm',
        component: 'el-date-picker',
        props: {
            clearable: true,
            type: 'datetimerange',
            'start-placeholder': '开始时间',
            'end-placeholder': '结束时间',
            'range-separator': '-',
            'value-format': 'YYYY-MM-DD HH:mm:ss'
        },
        search: true,
        hide: true,
    },
    {
        label: '标题',
        prop: 'title',
    },
    {
        label: '预警类型',
        prop: 'warnType_dic',
    },
    {
        label: '发布类型',
        prop: 'publishType_dic',
    },
    {
        label: '预警等级',
        prop: 'warnGrade_dic',
    },
    {
        label: '发布对象',
        prop: 'publishObject',
    },
    {
        label: '发布时间',
        prop: 'createTime',
    },

]));

let formColumns = defineFormColumns(computed(() => [
    {
        label: '标题',
        prop: 'title',
        component: 'el-input',
        props: {
            clearable: true
        },
        md: 24
    },
    {
        label: '预警类型',
        prop: 'warnType',
        component: 'pro-select',
        props: {
            data: warn_type.value,
            placeholder: '请选择预警类型',
            clearable: true
        },
        md: 24
    },
    {
        label: '发布类型',
        prop: 'publishType',
        component: 'pro-select',
        props: {
            data: publish_type.value,
            placeholder: '请选择发布类型',
            clearable: true
        },
        search: true,
        md: 24
    },
    {
        label: '预警等级',
        prop: 'warnGrade',
        component: 'pro-select',
        props: {
            data: warnGrade,
            placeholder: '请选择预警等级',
            clearable: true
        },
        md: 24
    },
    {
        label: '发布内容',
        prop: 'content',
        component: 'el-input',
        props: {
            type: 'textarea',
            placeholder: '请输入发布内容',
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
        type: 'text',
    },
    reset: false,
    del: true,
    edit: false,
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