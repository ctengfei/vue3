<template>
    <div class="app-container">
        <div class="title">预警规则</div>
        <el-radio-group v-model="tabPosition" style="margin-bottom: 30px">
            <el-radio-button value="1">雨情预警</el-radio-button>
            <el-radio-button value="2">水情预警</el-radio-button>
            <el-radio-button value="3">预泄洪预警</el-radio-button>
            <el-radio-button value="4">干旱预警</el-radio-button>
        </el-radio-group>
        <rainWarn v-if="tabPosition == 1"/>
        <waterWarn  v-if="tabPosition == 2" />
        <dischargeWarn  v-if="tabPosition == 3" />
    </div>
</template>

<script setup name="warnRules">
import { rainWarn, waterWarn, dischargeWarn } from './components'
const tabPosition = ref('1');
const { proxy } = getCurrentInstance();
const { warn_type } = proxy.useDict("warn_type")
onMounted(() => {
    
})




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