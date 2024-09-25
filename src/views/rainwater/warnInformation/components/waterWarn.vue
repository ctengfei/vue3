<template>
    <div>
        <el-table :data="tableData" ref="ruleRef" fit highlight-current-row row-key="id"
            :cell-style="{ 'text-align': 'center' }" :header-cell-style="{ 'text-align': 'center' }">
            <el-table-column label="序号" type="index" width="50"></el-table-column>
            <el-table-column label="测站编码" prop="stcd" align="center"></el-table-column>
            <el-table-column label="测站名称" prop="stnm" align="center"></el-table-column>
            <el-table-column label="开始月日" prop="startingMonthDay" align="center">
                <template #default="scope">
                    <span v-if="!scope.row.disabled">{{ scope.row.startingMonthDay }}</span>
                    <el-date-picker
                        v-else
                        v-model="scope.row.startingMonthDay"
                        type="date"
                        placeholder="选择开始月日"
                        value-format="MMDD"
                        :size="size"
                    />
                </template>
            </el-table-column>
            <el-table-column label="结束月日" prop="endMonthDay" align="center">
                <template #default="scope">
                    <span v-if="!scope.row.disabled">{{ scope.row.endMonthDay }}</span>
                    <el-date-picker
                        v-else
                        v-model="scope.row.endMonthDay"
                        type="date"
                        placeholder="选择结束月日"
                        value-format="MMDD"
                        :size="size"
                    />
                </template>
            </el-table-column>
            <el-table-column label="汛限水位（m）" prop="fsltdz" align="center">
                <template #default="scope">
                    <span v-if="!scope.row.disabled">{{ scope.row.fsltdz }}</span>
                    <el-input v-model="scope.row.fsltdz" v-else></el-input>
                </template>
            </el-table-column>
            <el-table-column label="汛期类别" prop="floodLimitType_dic" align="center">
                <template #default="scope">
                    <span v-if="!scope.row.disabled">{{ scope.row.floodLimitType_dic }}</span>
                    <el-select v-model="scope.row.floodLimitType" v-else>
                        <el-option v-for="item in flood_limit_type" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </template>
            </el-table-column>
            <el-table-column label="数据时间" prop="updateTime" align="center"></el-table-column>
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
import { getRegimenWarnList, updateRegimenWarn } from '@/api/fourFloodPrevent/warnInfor'
import { ElMessage, ElMessageBox } from 'element-plus'
const { proxy } = getCurrentInstance();
const { flood_limit_type } = proxy.useDict("flood_limit_type");
let tableData = ref([]);
let ruleRef = ref();
onMounted(() => {
    getRainWarnTable()
})

// 获取列表数据
const getRainWarnTable = () => {
    getRegimenWarnList({}).then(res => {
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
    updateRegimenWarn(p).then(res => {
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