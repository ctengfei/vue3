<template>
    <commonTable v-if="isMonitor" :title="'雨量监测数据'" :getListUrl="getListUrl" :addUrl="addUrl" :editUrl="editUrl"
        :deleteUrl="deleteUrl" :detailUrl="detailUrl" :code="'stcd'" :stType="'PP'" :columns="columns" :isAdd="false"
        :formColumns="formColumns" :menu="menu" @clickMonitor="clickMonitor" />
    <monitorTable v-else :monitorTitle="monitorTitle" :monitorColoums="monitorColoums" :exportUrl="exportUrl" :getDetailUrl="getDetailUrl" :stType="'PP'"
        :monitorCode="monitorCode" @clickBack="clickBack" />
</template>
<script setup name="rainFallStation">
import {
    defineFormColumns,
} from 'element-pro-components';
import commonTable from './components/commonTable'
import monitorTable from './components/monitorTable'

let getListUrl = '/station/pageQuery';
let detailUrl = '/station/getDetailById';
let exportUrl = '/rain/export';
let getDetailUrl = '/rain/listRain';
const { proxy } = getCurrentInstance();
let columns = [
    {
        label: '测站名称',
        prop: 'stnm',
        component: 'el-input',
        props: {
            placeholder: '请输入测站名称',
            clearable: true
        },
        search: true,
    },
    {
        label: '测站编码',
        prop: 'stcd',
    },
    {
        label: '经度',
        prop: 'lgtd',
    },
    {
        label: '纬度',
        prop: 'lttd',
    },
    {
        label: '测站岸别',
        prop: 'stbk',
    },
    {
        label: '测站地址',
        prop: 'stlc',
    },
    {
        label: '站类',
        prop: 'sttp_dic',
    },
    {
        label: '报讯等级',
        prop: 'frgrd_dic',
    },
    {
        label: '基面名称',
        prop: 'dtmnm',
    },
    {
        label: '基面高程',
        prop: 'dtmel',
    },
    {
        label: '建站年月',
        prop: 'esstym',
    },
    {
        label: '始报年月',
        prop: 'bgfrym',
    },
    {
        label: '交换管理单位',
        prop: 'locality',
    },
    {
        label: '启用标志',
        prop: 'usfl',
    },

]
let formColumns = defineFormColumns(computed(() => [
    {
        label: '测站名称',
        prop: 'stnm',
        component: 'el-input',
        props: {
            placeholder: '请输入测站名称',
            clearable: true
        },
        rules: [{ required: true, message: '请输入测站名称' }],
        md: 8
    },
    {
        label: '测站编码',
        prop: 'stcd',
        component: 'el-input',
        props: {
            placeholder: '请输入测站编码',
            clearable: true
        },
        rules: [{ required: true, message: '请输入测站编码' }],
        md: 8
    },
    {
        label: '经度',
        prop: 'lgtd',
        component: 'el-input',
        props: {
            placeholder: '请输入经度',
            clearable: true
        },
        rules: [{ required: true, message: '请输入经度' }],
        md: 8
    },
    {
        label: '纬度',
        prop: 'lttd',
        component: 'el-input',
        props: {
            placeholder: '请输入纬度',
            clearable: true
        },
        rules: [{ required: true, message: '请输入纬度' }],
        md: 8
    },
    {
        label: '测站岸别',
        prop: 'stbk',
        component: 'el-input',
        props: {
            placeholder: '请输入测站岸别',
            clearable: true
        },
        rules: [{ required: true, message: '请输入测站岸别' }],
        md: 8
    },
    {
        label: '测站地址',
        prop: 'stlc',
        component: 'el-input',
        props: {
            placeholder: '请输入测站地址',
            clearable: true
        },
        rules: [{ required: true, message: '请输入测站地址' }],
        md: 8
    },
    {
        label: '站类',
        prop: 'sttp_dic',
        component: 'el-input',
        props: {
            placeholder: '请输入站类',
            clearable: true
        },
        rules: [{ required: true, message: '请输入站类' }],
        md: 8
    },
    {
        label: '基面名称',
        prop: 'dtmnm',
        component: 'el-input',
        props: {
            placeholder: '请输入基面名称',
            clearable: true
        },
        rules: [{ required: true, message: '请输入基面名称' }],
        md: 8
    },
    {
        label: '报讯等级',
        prop: 'frgrd',
        component: 'el-input',
        props: {
            placeholder: '请输入报讯等级',
            clearable: true
        },
        rules: [{ required: true, message: '请输入报讯等级' }],
        md: 8
    },
    {
        label: '基面高程',
        prop: 'dtmel',
        component: 'el-input',
        props: {
            placeholder: '请输入基面高程',
            clearable: true
        },
        rules: [{ required: true, message: '请输入基面高程' }],
        md: 8
    },
    {
        label: '建站年月',
        prop: 'esstym',
        component: 'el-input',
        props: {
            placeholder: '请输入建站年月',
            clearable: true
        },
        rules: [{ required: true, message: '请输入建站年月' }],
        md: 8
    },
    {
        label: '始报年月',
        prop: 'bgfrym',
        component: 'el-input',
        props: {
            placeholder: '请输入始报年月',
            clearable: true
        },
        rules: [{ required: true, message: '请输入始报年月' }],
        md: 8
    },
    {
        label: '交换管理单位',
        prop: 'locality',
        component: 'el-input',
        props: {
            placeholder: '请输入交换管理单位',
            clearable: true
        },
        rules: [{ required: true, message: '请输入交换管理单位' }],
        md: 8
    },
    {
        label: '启用标志',
        prop: 'usfl',
        component: 'el-input',
        props: {
            placeholder: '请输入启用标志',
            clearable: true
        },
        rules: [{ required: true, message: '请输入启用标志' }],
        md: 8
    },

]));

let monitorColoums = defineFormColumns(computed(() => [
    {
        label: '测站编码',
        prop: 'stcd',
    },
    {
        label: '测站名称',
        prop: 'stnm',
    },
    {
        label: '时段降水量(mm)',
        prop: 'drp',
    },
    {
        label: '日降水量(mm)',
        prop: 'dyp',
    },
    {
        label: '时段长(h)',
        prop: 'intv',
    },
    {
        label: '降水历时',
        prop: 'pdr',
    },
    {
        label: '天气状况',
        prop: 'wth',
    },
    {
        label: '数据时间',
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
        form: true
    }]));

let menu = {
    label: '操作',
    add: false,
    fixed: 'right',
    addText: '新增',
    detail: true,
    detailText: '详情',
    detailProps: {
        type: 'text',
    },
    reset: false,
    del: false,
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