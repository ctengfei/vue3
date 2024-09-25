<template>
    <div class="app-container">
        <div class="title">{{ title }}</div>
        <el-row :gutter="20">
            <!--部门数据-->
            <el-col :span="24">
                <div class="headInput">
                    <div class="labelInput">
                        <span>组织机构名称或负责人:</span>
                        <el-input v-model="deptName" placeholder="请输入组织机构名称或负责人" clearable prefix-icon="Search"
                        />
                    </div>
                    <el-button type="success" plain icon="Switch" :size="size"
                        @click="switchTree">切换组织结构</el-button>
                </div>
                <div class="head-container">
                    <el-tree :data="deptOptions" :props="{ label: 'label', children: 'children' }"
                        :expand-on-click-node="false" :filter-node-method="filterNode" ref="deptTreeRef" node-key="id"
                        highlight-current default-expand-all @node-click="handleNodeClick" />
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script setup>
import { getOrganizeTree } from '@/api/fourFloodPrevent/planManagement'
const { proxy } = getCurrentInstance();
let deptTreeRef = ref();
let deptName = ref('');
let deptOptions = ref([]);
let headName = ref('');
const props = defineProps(['title']);
const emit = defineEmits(['switchTree']);

/** 通过条件过滤节点  */
const filterNode = (value, data) => {
    console.log(data.label)
    if (!value) return true;
    if (!data.label) return true;
    return data.label.indexOf(value) !== -1;
};

/** 根据名称筛选部门树 */
watch(deptName, val => {
    proxy.$refs["deptTreeRef"].filter(val);
});
/** 查询部门下拉树结构 */
const getDeptTree = () => {
    getOrganizeTree().then(res => {
        deptOptions.value = res.data;
    });
};


let handleNodeClick = (data) => {
    // queryParams.value.deptId = data.id;
}

// 切换table
let switchTree = () => {
    emit('switchTree');
}

getDeptTree();
</script>

<style lang="scss" scoped>
.title {
    line-height: 57px;
    height: 57px;
    border-bottom: solid 1px #EAEAEA;
    font-weight: 500;
    font-size: 20px;
    color: #22283F;
}
.headInput {
    display: flex;
    align-items: center;
    margin: 20px 0;
    .labelInput{
        display: flex;
        align-items: center;
        width: 40%;
        margin-right: 40px;
        span{
            width: 200px;
            font-size: 14px;
            font-weight: 700;
            color: #606266
        }
    }
}
</style>