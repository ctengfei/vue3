<template>
    <div class="commonContainer">
        <div class="left">
            <div class="leftTop">
                <TitleBigCom :title="'气象云图'"/>
            </div>
            <div class="leftCenter">
                <TitleSmallCom :title="'降雨量'">
                    <template #right>
                        <span class="rightTitle">面雨量: 20mm</span>
                    </template>
                </TitleSmallCom>
                
            </div>
            <div class="leftBottom">

            </div>
        </div>
        <div class="right">
            <div class="leftTop">

            </div>
            <div class="leftCenter">

            </div>
            <div class="leftBottom">

            </div>
        </div>
        <BtmNavCom :btmNavList="realTimeNav" @btnNavClick="btnNavClick"/>
    </div>
</template>
<script setup name="realTimeMonitor">
import BtmNavCom  from './btmNavCom';
import TitleSmallCom from './titleSmallCom';
import TitleBigCom from './titleBigCom';
let realTimeNav = ref(
    [
        { name: '水库基础信息', path: '/' },
        { name: '气象站点管理', path: '/' },
        { name: '水库水位站点管理', path: '/' },
        { name: '河道水位站点管理', path: '/' },
        { name: '大坝安全站点管理', path: '/' },
        { name: '视频监测站点管理', path: '/' },
    ]
)

// 导航事件
const btnNavClick = (e) => {
    console.log("btnNavClick ", e);
}




</script>
<style scoped lang="scss">
@import './index.scss';
</style>