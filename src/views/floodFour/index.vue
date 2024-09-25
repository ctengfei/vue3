<template>
    <div class="box">
        <topNavCom :topNavList="topNavList" @topNav="topNavs"/>
        <realTimeMonitor />
        <DrawerCom />
    </div>
</template>
<script setup name="floodFour">
import { realTimeMonitor, topNavCom, DrawerCom } from './components';

let topNavList = reactive(
    [
        { name: '实时监控', path: '/' },
        { name: '防汛预报', path: '/' },
        { name: '防汛预警', path: '/' },
        { name: '调度预演', path: '/' },
        { name: '调度预案', path: '/' },
    ]
)
const topNavs = (e) => {
    console.log('topNav emit:', e);
}


</script>
<style scoped lang="scss">
@import './components/index.scss';
</style>