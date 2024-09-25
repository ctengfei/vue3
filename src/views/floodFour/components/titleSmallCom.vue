<template>
    <div class="smallTitle"><span>{{ props.title }}</span>
        <slot name="right"></slot>
    </div>
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
.smallTitle{
    width: 415px;
    height: 35px;
    background: url("@/assets/imgs/samallTitle.png") no-repeat left bottom;
    margin: 0 auto;
    color: #fff;
    span{
        margin-left: 20px;
        color: #fff;
        font-weight: 500;
        font-size: 18px;
    }
}  
</style>