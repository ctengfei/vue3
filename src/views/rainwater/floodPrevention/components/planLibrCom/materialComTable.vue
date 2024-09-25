<template>
    <div style="width: 100%;">
        <div class="addBtn" v-if="!props.disabled">
                <el-button type="primary" link @click="addRow" :disabled="props.disabled">添加</el-button>
            </div>
        <el-row>
            <el-table :data="props.tableData" style="width: 100%" :disabled="props.disabled">
                <el-table-column label="序号" width="50" type="index"/>
                <el-table-column label="物资名称" width="150" prop="materialsName">
                    <template #default="{ row, $index }">
                        <el-select v-model="row.materialsName" :disabled="props.disabled" filterable placeholder="请选择" @change="(e)=>selectChange(e, row, $index)">
                            <el-option v-for="item in selectList" :key="item.id" :value="item.id" :label="item.materialsName"></el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column label="规格型号" prop="standardModel">
                </el-table-column>
                <el-table-column label="物资数量"  prop="materialsNum">
                </el-table-column>
                <el-table-column label="负责人"  prop="head">
                </el-table-column>
                <el-table-column label="联系电话"  prop="headPhone">
                </el-table-column>
                <el-table-column label="操作" width="100" v-if="!props.disabled">
                    <template #default="{ $index }">
                        <el-button icon="Delete" link :size="size" type="danger" @click="removeRow($index)"/>
                    </template>
                </el-table-column>
            </el-table>
        </el-row>
    </div>
</template>

<script setup>
import { materialList } from "@/api/fourFloodPrevent/planManagement"
let props = defineProps(['tableData', 'disabled'])
const emit = defineEmits(['update:tableData']);

// const tableData = ref([]);
let selectList = ref([]);

onMounted(() => {
    materialList({}).then(res=>{
        selectList.value = res.data;
    })
})

// 怎行点击下拉
const selectChange = (val, row, index)=>{
    let item = selectList.value.find(item=>item.id == val);
    props.tableData[index].standardModel = item.standardModel;
    props.tableData[index].head = item.head;
    props.tableData[index].headPhone = item.headPhone;
    props.tableData[index].materialsNum = item.materialsNum;
}
// 新增行
function addRow() {
    props.tableData.push({
        materialsName: '',
        standardModel: '',
        head: '',
        headPhone: '',
        materialsNum: '',
    });
}

// 删除行
function removeRow(index) {
    console.log(index)
    props.tableData.splice(index, 1);
}
</script>

<style lang='scss' scoped>
.delClass{
    color: #f56c6c;
    cursor: pointer;
}
.addBtn{
    position: absolute;
    right: 10px;
    top: 3px;
    width: 30px;
    z-index: 999;
}
</style>