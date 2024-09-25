<template>
    <div>
        <div class="timeFlex">
            <div class="flexItem">
                <el-date-picker
                :disabled="props.disabled"
                v-model="startTime"
                type="datetime"
                placeholder="开始时间"
                format="YYYY-MM-DD HH:mm:ss"
                value-format= 'YYYY-MM-DD HH:mm:ss'
            />
            </div>
            <div class="flexItem">
                <el-date-picker
                    :disabled="props.disabled"
                    v-model="endTime"
                    type="datetime"
                    placeholder="结束时间"
                    format="YYYY-MM-DD HH:mm:ss"
                    value-format= 'YYYY-MM-DD HH:mm:ss'
                />
            </div>
            <el-button class="" type="primary" v-if="!props.disabled" @click="getTimes">获取数据</el-button>
        </div>
        <div class="planTimeCard" v-if="planCardList.length">
            <div class="planTimeCard-item" v-for="(item,index) in planCardList" :key="index">
            </div>
        </div>
    </div>
</template>

<script setup>
let props = defineProps(['disabled'])



let startTime = ref();
let endTime = ref();
let planCardList = reactive([
   
])

const getTimes = () => {

}
</script>

<style lang='scss' scoped>
.timeFlex{
    width: 80%;
    display: flex;
    justify-content: space-between;
    .flexItem{
        width: 200px;
        margin: 0 100px;
        &:first-child{
            margin: 0;
        }
    }
}
.planTimeCard{
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-top: 20px;
   .planTimeCard-item{
        width: 170px;
        height: 80px;
        background-color: #f5f5f5;
        text-align: center;
        border-radius: 5px;
        margin-bottom: 20px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
        &:first-child{
            margin-left: 0;
        }
    }
}
</style>