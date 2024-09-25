<template>
    <div class="topNav">
        <div :class="navIndex !== index ? 'topNavChild' : 'activeTopNav'" v-for="(item, index) in props.topNavList" :key="index" @click="navClick(item, index)">
            {{ item.name }}
        </div>
    </div>
</template>
<script setup>

const props = defineProps({
    topNavList: {
        type: Array,
        default: [],
        required:true
    }
});
const emit = defineEmits(['topNav']);
let navIndex = ref(0);


const navClick = (item, index) => {
    navIndex.value = index;
    // 跳转到指定路径
    console.log('跳转到', item.path);
    emit('topNav', item)
}

</script>
<style scoped lang="scss">
// 头部导航
.topNav{
    width: 820px;
    height: 80px;
    position: fixed;
    top: 80px;
    left: 0;
    right: 0;
    margin:0 auto;
    display: flex;
    color: #fff;
    align-items: center;
    justify-content: space-around;
    .topNavChild{
        text-align: center;
        width: 121px;
        height: 42px;
        line-height: 50px;
        background: url("@/assets/imgs/menuNormal.png") no-repeat center center;
        background-size: 100% 100%;
        cursor: pointer;
    }
    .activeTopNav{
        text-align: center;
        width: 121px;
        height: 42px;
        line-height: 50px;
        background: url("@/assets/imgs/menuActive.png") no-repeat center center;
        background-size: 100% 100%;
        cursor: pointer;
    }
}


</style>