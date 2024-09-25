<template>
    <div style="width: 100%;">
        <div class="addBtn" v-if="!props.disabled">
                <el-button type="primary" link @click="addRow">添加</el-button>
            </div>
        <el-row>
            <el-table :data="props.tableData" style="width: 100%">
                <el-table-column label="序号" width="50" type="index"/>
                <el-table-column label="人员" width="150" prop="personName">
                    <template #default="{ row, $index }">
                        <el-select v-model="row.personName" :disabled="props.disabled" filterable placeholder="请选择" @change="(e)=>selectChange(e, row, $index)">
                            <el-option v-for="item in selectList" :key="item.id" :value="item.id" :label="item.personName"></el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column label="单位" prop="personUnit">
                </el-table-column>
                <el-table-column label="职务"  prop="duties">
                </el-table-column>
                <el-table-column label="联系电话"  prop="personPhone">
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
import { floodheadList } from "@/api/fourFloodPrevent/planManagement"
let props = defineProps(['tableData', 'disabled'])
const emit = defineEmits(['update:tableData']);

const tableData = ref([]);
let selectList = ref([]);

onMounted(() => {
    floodheadList({}).then(res=>{
        selectList.value = res.data;
    })
})

const selectChange = (val, row, index)=>{
    console.log(props.tableData, 'props.tableData.value')
    let item = selectList.value.find(item=>item.id == val);
    props.tableData[index].personUnit = item.personUnit;
    props.tableData[index].duties = item.duties;
    props.tableData[index].personPhone = item.personPhone;
}
// 新增行
function addRow() {
    props.tableData.push({
        personName: '',
        personUnit: '',
        duties: '',
        personPhone: '',
    });
}

// 删除行
function removeRow(index) {
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