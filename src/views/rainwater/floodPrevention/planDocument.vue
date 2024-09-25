<template>
    <div>
        <planDocTable :title="'预案文档管理'" :getListUrl="getListUrl" :addUrl="addUrl" :editUrl="editUrl" 
        :deleteUrl="deleteUrl" :detailUrl="detailUrl" :code="'id'" :columns="columns"
        :formColumns="formColumns" :menu="menu" @clickMonitor="clickMonitor" />
        <el-dialog
            v-model="dialogVisible"
            :title="title"
            width="58%"
            draggable
            destroy-on-close
            :close-on-click-modal="false"
            :before-close="handleClose"
        >
            <div  class="fileDownload" @click="fileDownload">附件下载</div>
            <div class="pdf-preview">
                <VuePdfEmbed ref="vuePdfRef" annotation-layer text-layer :source="pdfSource" />
            </div>
            
        </el-dialog>
    </div>
</template>
<script setup name="planDocument">
import {
    defineFormColumns,
    defineCrudColumns,
} from 'element-pro-components';
import planDocTable from './components/planDocTable'

let addUrl = '/plandoc/add';
let editUrl = '/plandoc/update'
let getListUrl = '/plandoc/pageQuery';
let detailUrl = '/plandoc/getDetailById';
let deleteUrl = '/plandoc/';
const { proxy } = getCurrentInstance();
const { reserve_plan_type, reserve_plan_grade } = proxy.useDict('reserve_plan_type', 'reserve_plan_grade');
let dialogVisible = ref(false);
let title = ref('附件预览');
let pdfSource = ref('');
let vuePdfRef = ref();

let columns = defineCrudColumns(computed(() => [
    {
        label: '预案名称',
        prop: 'planName',
        component: 'el-input',
        props: {
            placeholder: '请输入预案名称',
            clearable: true
        },
        search: true,
    },
    {
        label: '预案分类',
        prop: 'planType',
        component: 'pro-select',
        props: {
            style: { width: '200px' },
            data: reserve_plan_type.value,
            placeholder: '请选择预案名称',
            clearable: true
        },
        search: true,
        hide: true,
    },
    {
        label: '预案等级',
        prop: 'planGrade',
        component: 'pro-select',
        props: {
            style: { width: '200px' },
            data: reserve_plan_grade.value,
            placeholder: '请选择预案名称',
            clearable: true
        },
        search: true,
        hide: true,
    },
    {
        label: '预案分类',
        prop: 'planType_dic',
    },
    {
        label: '预案等级',
        prop: 'planGrade_dic',
    },
    {
        label: '发布单位',
        prop: 'publishUnit',
        component: 'el-input',
        props: {
            placeholder: '请输入发布单位',
            clearable: true
        },
        search: true,
    },
    {
        label: '发布时间',
        prop: 'publishTime',
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
    },
]));

let formColumns = defineFormColumns(computed(() => [
{
        label: '预案名称',
        prop: 'planName',
        component: 'el-input',
        props: {
            placeholder: '请输入预案名称',
            clearable: true
        },
        rules: [{ required: true, message: '请输入测站名称' }],
        md: 8
    },
    {
        label: '预案分类',
        prop: 'planType',
        component: 'pro-select',
        props: {
            style: { width: '200px' },
            data: reserve_plan_type.value,
            placeholder: '请选择预案分类',
            clearable: true
        },
        rules: [{ required: true, message: '请选择预案分类' }],
        md: 8
    },
    {
        label: '预案等级',
        prop: 'planGrade',
        component: 'pro-select',
        props: {
            style: { width: '200px' },
            data: reserve_plan_grade.value,
            placeholder: '请选择预案等级',
            clearable: true
        },
        rules: [{ required: true, message: '请选择预案等级' }],
        md: 8
    },
    {
        label: '发布单位',
        prop: 'publishUnit',
        component: 'el-input',
        props: {
            placeholder: '请输入发布单位',
            clearable: true
        },
        md: 8
    },
    {
        label: '发布时间',
        prop: 'publishTime',
        component: 'el-date-picker',
        props: {
            clearable: true,
            placeholder: '请选择发布时间',
            type: 'datetime',
            style:{width:'100%'},
            'value-format': 'YYYY-MM-DD HH:mm:ss'
        },
        md: 8
    },
    {
        label: '文件上传',
        prop: 'fileList',
        md: 24
    },

]));
onMounted(() => {

})
let menu = {
    label: '操作',
    add: false,
    fixed: 'right',
    addText: '新增',
    detail: false,
    detailText: '详情',
    detailProps: {
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

const clickMonitor = (e) => {
    let files = JSON.parse(e);
    dialogVisible.value = true;
    pdfSource.value = `${import.meta.env.VITE_FILE_URL}${files[0].url}`
    
}

// 弹窗关闭
const handleClose = () => {
    dialogVisible.value = false
}
// 附件下载
const fileDownload = () => {
    vuePdfRef.value.download(pdfSource.value)
}
</script>
<style lang='scss' scoped>
.fileDownload{
    font-size: 16px;
    height: 30px;
    line-height: 30px;
    color: #409EFF;
    cursor: pointer;

}
.pdf-preview{
    height: 70vh;
    overflow: hidden;
}
.vue-pdf-embed {
  text-align: center;
  width: 90%;
  margin: 0 auto;
  box-sizing: border-box;
}

.pdf-preview {
  position: relative;
  height: 70vh !important;
  padding: 20px 0;
  box-sizing: border-box;
  background-color: #e9e9e9;
  overflow-y: hidden;
}
.pdf-wrap {
  overflow-y: auto;
}

</style>