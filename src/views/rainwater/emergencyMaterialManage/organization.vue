<template>
    <div>
        <organizationTable v-if="tableOrTree" :title="'防汛责任人'" :getListUrl="getListUrl" :addUrl="addUrl" :editUrl="editUrl"
            :deleteUrl="deleteUrl" :detailUrl="detailUrl" :code="'id'" :columns="columns" :isAdd="false"
            :formColumns="formColumns" :menu="menu" @switchTable="switchTable"/>

        <organizationTree :title="'防汛责任人'" v-else @switchTree="switchTree"/>

    </div>
</template>
<script setup name="organization">
import {
    defineFormColumns,
    defineCrudColumns,
} from 'element-pro-components';
import { organizationTable, organizationTree } from './components'
import { onMounted } from 'vue';
import { organizationList } from '@/api/fourFloodPrevent/planManagement'
let addUrl = '/organization/add'
let getListUrl = '/organization/pageQuery';
let detailUrl = '/organization/getDetailById';
let editUrl = '/organization/update';
let deleteUrl = '/organization/';
const { proxy } = getCurrentInstance();
const { warn_type, publish_type } = proxy.useDict("warn_type", "publish_type");


let organizListArr = ref([]);


onMounted(() => {
    organizationList({pageNum: 1, pageSize: 9999}).then(res=>{
        organizListArr.value = res.data.list
    })
})

let columns = defineCrudColumns(computed(() => [
    {
        label: '组织机构名称',
        prop: 'groupName',
        component: 'el-input',
        props: {
            placeholder: '请输入组织机构名称',
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
        label: '职责',
        prop: 'duties',
    },
]));

let formColumns = defineFormColumns(computed(() => [
    {
        label: '组织机构名称',
        prop: 'groupName',
        component: 'el-input',
        props: {
            placeholder: '请输入组织机构名称',
            clearable: true
        },
        rules: [{ required: true, message: '请输入组织机构名称' }],
        md: 24
    },
    {
        label: '负责人姓名',
        prop: 'head',
        component: 'el-input',
        props: {
            placeholder: '请输入负责人姓名',
            clearable: true
        },
        rules: [{ required: true, message: '请输入负责人姓名' }],
        md: 24
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
        md: 24
    },
    {
        label: '职责描述',
        prop: 'duties',
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

let tableOrTree = ref(true);

const switchTable = (e) => {
    tableOrTree.value = !tableOrTree.value
}

const switchTree = (e) => {
    tableOrTree.value = !tableOrTree.value
}
</script>
<style lang='scss' scoped></style>