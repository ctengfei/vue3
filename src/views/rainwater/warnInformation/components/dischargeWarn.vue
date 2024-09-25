<template>
    <div>
        <el-table :data="tableData" ref="ruleRef" fit highlight-current-row row-key="id"
            :cell-style="{ 'text-align': 'center' }" :header-cell-style="{ 'text-align': 'center' }">
            <el-table-column label="序号" type="index" width="50"></el-table-column>
            <el-table-column label="泄洪预警参数" prop="floodDischargeParameter" align="center"></el-table-column>
            <el-table-column label="Ⅰ级（<=）" prop="oneLevel" align="center">
                <template #default="scope">
                    <span v-if="!scope.row.disabled">{{ scope.row.oneLevel }}</span>
                    <el-input v-model="scope.row.oneLevel" v-else></el-input>
                </template>
            </el-table-column>
            <el-table-column label="Ⅱ级（<=）" prop="twoLevel" align="center">
                <template #default="scope">
                    <span v-if="!scope.row.disabled">{{ scope.row.twoLevel }}</span>
                    <el-input v-model="scope.row.twoLevel" v-else></el-input>
                </template>
            </el-table-column>
            <el-table-column label="Ⅲ级（<=）" prop="threeLevel" align="center">
                <template #default="scope">
                    <span v-if="!scope.row.disabled">{{ scope.row.threeLevel }}</span>
                    <el-input v-model="scope.row.threeLevel" v-else></el-input>
                </template>
            </el-table-column>
            <el-table-column label="Ⅳ级" prop="fourLevel" align="center">
                <template #default="scope">
                    <span v-if="!scope.row.disabled">{{ scope.row.fourLevel }}</span>
                    <el-input v-model="scope.row.fourLevel" v-else></el-input>
                </template>
            </el-table-column>
            <el-table-column label="最近修改时间" prop="updateTime" align="center"></el-table-column>
            <el-table-column label="描述" prop="describe" align="center"></el-table-column>
            <el-table-column label="操作">
                <template #default="scope">
                    <el-button v-if="scope.row.edit" type="success" text="success" size="mini"
                        icon="el-icon-circle-check-outline" @click="confirmEdit(scope.row)">保存
                    </el-button>
                    <el-button v-else type="primary" size="mini" text="primary" @click="startEdit(scope.row)">编辑
                    </el-button>
                    <el-button v-if="scope.row.edit" class="cancel-btn" size="mini" icon="el-icon-refresh"
                        type="info" text="info" @click="cancelEdit(scope.row)">取消
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script setup>
import { getDischargeWarnList, updateDischargeWarn } from '@/api/fourFloodPrevent/warnInfor'
import { ElMessage, ElMessageBox } from 'element-plus'
const tabPosition = ref('1');
let tableData = ref([]);
let ruleRef = ref();
onMounted(() => {
    getRainWarnTable()
})

// 获取列表数据
const getRainWarnTable = () => {
    getDischargeWarnList({}).then(res => {
        tableData.value = res.data;
    })
}

// 编辑
const startEdit = (row) => {
    row.edit = !row.edit;
    row.disabled = true;
}
// 保存
const confirmEdit = (row) => {
    row.edit = false;
    const p = { ...row };
    updateDischargeWarn(p).then(res => {
        ElMessage({
            message: '已修改!',
            type: 'success'
        });
        row.disabled = false;
        getRainWarnTable()
    })

    
}

// 取消
const cancelEdit = (row) => {
    row.edit = false;
    row.disabled = false;
    ElMessage({
        message: '已取消修改!',
        type: 'warning'
    });
}



</script>

<style lang='scss' scoped>
.title {
    line-height: 57px;
    height: 57px;
    font-weight: 500;
    font-size: 18px;
    color: #22283F;
}

.colorCard {
    width: 80px;
    height: 30px;
    margin: 0 auto;
}

.titleBottom {
    margin-top: 20px;
}
</style>