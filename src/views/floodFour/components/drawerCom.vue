<template>
    <div>
        <div class="drawers" @click="toggles = !toggles"></div>
        <Transition name="drawers" mode="out-in">
            <div class="right-drawer" v-if="toggles">
                <!-- <el-button type="primary" plain @click="hide" circle
                            style="width: 25px;height: 25px;border: 0;align-self: center">
                    <ArrowLeftBold style="width: 1em; height: 1em;"/>
                </el-button> -->
            </div>
        </Transition>
        
    </div>
</template>
<script setup>
let toggles = ref(false);
let lef = ref(-100);


let hide = () => {
    toggles.value = !toggles.value;
}
</script>
<style lang="scss" scoped>
.drawers{
    width: 54px;
    height: 54px;
    background: url("@/assets/imgs/drawer.png") center center;
    background-size: 100% 100%;
    position: fixed;
    top: 150px;
    left: 24%;
    cursor: pointer;
}
.right-drawer{
    position: fixed;
    top: 205px;
    left: 25%;
    height: 400px;
    width: 100px;
    background: #fff;
    overflow: hidden;
}
.drawers-leave-active,.drawers-enter-active{
    transition: all 0.5s ease;
}
.drawers-leave-active,.drawers-enter{
    width: 0px !important;
}
.drawers-leave,.drawers-enter-active{
    width: 100px !important;
}
.drawers-enter-from,
.drawers-leave-to {
  opacity: 0;
  transform: translateX(0);
}

</style>