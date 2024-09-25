<template>
    <div class="app-container">
        <div class="title">{{ monitorTitle }}</div>
        <pro-crud ref="crudRef" v-model="form" v-model:search="serachForm" :columns="columns"  :menu="menu"
            :form-columns="formColumns" :gutter="20" :data="data" v-model:current-page="currentPage"
            v-model:page-size="pageSize" layout="->,total,sizes,prev, pager, next, jumper" background  empty-text="暂无数据"
            :page-sizes="[10, 20, 30, 40, 50]" :total="total" @load="load" column="2" width="40%" align="center" height="600"
            label-width="155px" direction="vertical" @search="searchSubmit" @search-reset="searchReset">
            <template #form-menu-right="{ size }">
                <el-button :size="size" @click="crudRef.closeDialog()">关闭</el-button>
            </template>
            <template #search-menu-right="{ size }">
                <el-button style="margin-left: 30px" type="success" plain icon="Download"
                    @click="exportData">导出</el-button>
                <el-button style="margin-left: 30px" type="primary" plain icon="ArrowLeftBold"
                    @click="back">返回</el-button>
            </template>
        </pro-crud>
    </div>
</template>

<script setup>
import { defineCrudColumns, defineCrudMenuColumns, defineCrudSubmit, defineCrudSearch, defineFormColumns, defineTableIndexColumns, defineCrudBeforeOpen, defineCrudBeforeClose } from 'element-pro-components';
import { ref, reactive, onMounted } from 'vue';
// import { useRoute } from 'vue-router';
const router = useRouter();
const route = useRoute();
import { getRequest, postRequest } from '@/api/fourFloodPrevent/basicData';
const { proxy } = getCurrentInstance();
const props = defineProps(['exportUrl', 'getDetailUrl', 'monitorCode', 'stType', 'monitorTitle', 'monitorColoums']);
const emit = defineEmits(['clickBack']);

const ShowDetails = ref(true);
const crudRef = ref();
const serachForm = ref({});
let data = ref([]);
let currentPage = ref(1);
let pageSize = ref(10);
let total = ref(0);


const columns = defineCrudColumns(computed(() =>[ ...props.monitorColoums ]));
const menu = defineCrudMenuColumns({
    label: '操作',
    add: false,
    hide: true,
    fixed: 'right',
    addText: '新增',
    detail: false,
    del: false,
    edit: false,
    reset: false,
    width: '150',
    addProps: {
        type: 'primary',
        plain: true,
        icon: 'Plus'
    },
    editProps: {
        link: true,
        type: 'primary',
        icon: 'Edit'
    },
    delProps: {
        link: true,
        type: 'danger',
        icon: 'Delete'
    },
    searchResetProps: {
        icon: 'Refresh'
    },
    searchProps: {
        type: 'primary',
        icon: 'Search'
    },
    delText: '删除',
    editText: '修改',
    searchText: '搜索',
    searchResetText: '重置',
    submitText: '确定',
    resetText: '取消'
});

onMounted(() => {
    getData();
});

const back = () => {
    emit('clickBack', true)
};
const getData = () => {
    console.log(props.stType,"props.stType")
    postRequest(props.getDetailUrl,{
        stcd: props.monitorCode,
        type: props.stType,
        pageNum: currentPage.value,
        pageSize: pageSize.value,
        startTime: serachForm.value.tm ? serachForm.value.tm[0] : '',
        endTime: serachForm.value.tm ? serachForm.value.tm[1] : '',
        tm: null
    }).then(res => {
        if (res.success) {
            data.value = res.data;
            // total.value = res.data.total;
        }
    });
};

const searchSubmit = defineCrudSearch((done, isValid, invalidFields) => {
    getData();
    done();
});

const searchReset = () => {
    currentPage.value = 1;
    getData();
};


// 分页选择
const load = () => {
    getData();
};

const exportData = () => {
    proxy.download(props.exportUrl,
        {
            stcd: props.monitorCode,
            type: props.stType,
            pageNum: currentPage.value,
            pageSize: pageSize.value,
            startTime: serachForm.value.tm ? serachForm.value.tm[0] : '',
            endTime: serachForm.value.tm ? serachForm.value.tm[1] : '',
            tm: null
        },
        `监测数据_${new Date().getTime()}.xlsx`
    );
};
</script>

<style scoped lang="scss">
.title {
    line-height: 57px;
    height: 57px;
    // border-bottom: solid 1px #EAEAEA;
    font-weight: 500;
    font-size: 20px;
    color: #22283F;
}

.titleBottom {
    margin-top: 20px;
}
</style>
