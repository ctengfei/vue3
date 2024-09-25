<template>
    <div class="bigTitle"><span>{{ props.title }}</span></div>
</template>
<script setup>
const props = defineProps({
    title: {
        type: String,
        default: '',
    }
});


</script>

<style lang="scss" scoped>
.bigTitle{
    width: 415px;
    height: 54px;
    line-height: 40px;
    background: url("@/assets/imgs/bigTitle.png") no-repeat left bottom;
    background-size: 100% 100%;
    margin: 0 auto;
    span{
        margin-left: 20px;
        color: #fff;
        font-weight: 500;
        font-size: 18px;
    }
} 
</style>