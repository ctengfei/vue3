<template>
    <div>
        <el-table :data="tableData" ref="ruleRef" fit highlight-current-row row-key="id"
            :cell-style="{ 'text-align': 'center' }" :header-cell-style="{ 'text-align': 'center' }">
            <el-table-column label="序号" type="index" width="50"></el-table-column>
            <el-table-column label="预警名称" prop="warnName" align="center"></el-table-column>
            <el-table-column label="预警等级" prop="rainWarnGrade_dic" align="center"></el-table-column>
            <el-table-column label="预警分类" prop="rainWarnType" align="center">
                <template #default="scope">
                    <span>{{ scope.row.rainWarnType == 0 ? '降雨' : '' }}</span>
                </template>
            </el-table-column>
            <el-table-column label="阈值最小值（>=）" prop="thresholdMin" align="center">
                <template #default="scope">
                    <span v-if="!scope.row.disabled">{{ scope.row.thresholdMin }}</span>
                    <el-input v-model="scope.row.thresholdMin" v-else></el-input>
                </template>
            </el-table-column>
            <el-table-column label="阈值最大值（<）" prop="thresholdMax" align="center">
                <template #default="scope">
                    <span v-if="!scope.row.disabled">{{ scope.row.thresholdMax }}</span>
                    <el-input v-model="scope.row.thresholdMax" v-else></el-input>
                </template>
            </el-table-column>
            <el-table-column label="等级颜色" prop="rainWarnGrade" align="center">
                <template #default="scope">
                    <div class="colorCard" :style="{ 'background': bgColor[scope.row.rainWarnGrade] }"></div>
                </template>
            </el-table-column>
            <el-table-column label="描述" prop="describe" align="center">
                <template #default="scope">
                    <span v-if="!scope.row.disabled">{{ scope.row.describe }}</span>
                    <el-input type="textarea" v-model="scope.row.describe" v-else></el-input>
                </template>
            </el-table-column>
            <el-table-column label="最近修改时间" prop="updateTime" align="center"></el-table-column>
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
import { getRainWarnList, updateRainWarn } from '@/api/fourFloodPrevent/warnInfor'
import { ElMessage, ElMessageBox } from 'element-plus'
const tabPosition = ref('1');
let tableData = ref([]);
let ruleRef = ref();
let bgColor = ref(['', '', ' rgba(0, 0, 255, 1)', 'rgba(249, 255, 0, 1)', 'rgba(255, 153, 0, 1)', 'rgba(226, 0, 0, 1)'])
onMounted(() => {
    getRainWarnTable()
})

// 获取列表数据
const getRainWarnTable = () => {
    getRainWarnList({}).then(res => {
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
    updateRainWarn(p).then(res => {
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