<template>
    <div class="bottomNav">
        <div :class="bottomNavIndex !== index ? 'btmClass' : 'activeBtmClass'" v-for="(item, index) in props.btmNavList" :key="index" @click="navClick(item, index)">
            {{ item.name }}
        </div>
    </div>
</template>
<script setup>

const props = defineProps({
    btmNavList: {
        type: Array,
        default: [],
        required:true
    }
});
const emit = defineEmits(['btnNavClick']);
let bottomNavIndex = ref(0);

// 底部导航
const navClick = (item, index) => {
    bottomNavIndex.value = index;
    // 跳转到指定路径
    console.log('跳转到', item.path);
    emit('btnNavClick', item);
}
</script>
<style scoped lang="scss">
// 底部导航
.bottomNav{
    width: 875px;
    height: 65px;
    position: fixed;
    bottom: 40px;
    left: 0;
    right: 0;
    margin:0 auto;
    display: flex;
    color: #fff;
    align-items: center;
    justify-content: space-around;
    font-size: 12px;
    
    &::after{
        position: absolute;
        bottom: 1px;
        content: '';
        background: url("@/assets/imgs/btmBg.png") no-repeat center center;
        width: 738.5px;
        height: 12px;
        background-size: 100% 100%;
    }
    .btmClass{
        text-align: center;
        width: 159px;
        height: 65px;
        line-height: 65px;
        background-size: 100% 100%;
        cursor: pointer;
    }
    .activeBtmClass{
        text-align: center;
        width: 159px;
        height: 65px;
        line-height: 65px;
        background: url("@/assets/imgs/activeBtmBtn.png") no-repeat center center;
        background-size: 100% 100%;
        cursor: pointer;
        z-index: 999
    }
} 
</style>