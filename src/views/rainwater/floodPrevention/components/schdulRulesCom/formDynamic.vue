<template>
    <div>
        <div class="formTitle">
            <span>监测指标</span>
            <span>判断条件</span>
            <span>触发阈值</span>
            <span>数据单位</span>
        </div>
        <el-form ref="ruleFormRef" :model="props.ruleForm" :rules="rules" label-width="auto" :disabled="props.disabled">
            <div v-for="(item, index) in props.ruleForm.list" :key="index" class="formBody">
                <el-form-item label="" :prop="'list.' + index + '.monitorIndex'" style="width: 150px" :rules="rules.monitorIndex">
                    <el-select v-model="item.monitorIndex" placeholder="请选择检测指标">
                        <el-option v-for="item in scheduling_trigger_condition" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                </el-form-item>
                <el-form-item label="" :prop="'list.' + index + '.judgeTerm'" style="width: 150px" :rules="rules.judgeTerm">
                    <el-select v-model="item.judgeTerm" placeholder="请选择判断条件">
                        <el-option v-for="item in scheduling_judgment_criteria" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                </el-form-item>
                <el-form-item label="" :prop="'list.' + index + '.triggerThreshold'" :rules="rules.triggerThreshold" style="width: 150px">
                    <el-input v-model="item.triggerThreshold" placeholder="请输入触发阈值"/>
                </el-form-item>
                <el-form-item label="" :prop="'list.' + index + '.dataUnit'" style="width: 150px" :rules="rules.dataUnit">
                    <el-select v-model="item.dataUnit" placeholder="请选择数据单位">
                        <el-option v-for="item in scheduling_data_unit" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                </el-form-item>
                <el-button type="primary" size="samll" text icon="Plus" @click="addForm(index)"/>
                <el-button type="danger" size="small" text v-if="index != 0" icon="Minus"  @click="delForm(item, index)"/>
            </div>
        </el-form>    
    </div>
</template>
<script setup name="formDynamic">
const { proxy } = getCurrentInstance();
const { scheduling_trigger_condition, 
    scheduling_judgment_criteria, 
    scheduling_data_unit } = proxy.useDict("scheduling_trigger_condition", "scheduling_judgment_criteria", "scheduling_data_unit")
let ruleFormRef = ref(null);
const props = defineProps({
    ruleForm: { // 表单数据
        type: Object,
        default: {},
        required: true
    },
    disabled: {
        type: Object,
        default: () =>{
            return false;
        },
    }
})

// watch(props.ruleForm , (newVal) => {
//     submitForms()
// }, { deep: true });
onMounted(() => {
    
})
const emit = defineEmits(["update:ruleForm"]);


const rules = reactive({
    monitorIndex: [
        { required: true, message: '请选择检测指标', trigger: ['change', 'blur'] },
    ],
    judgeTerm: [
        { required: true, message: '请选择判断条件', trigger: ['change', 'blur'] },
    ],
    triggerThreshold: [
        { required: true, message: '请输入触发阈值', trigger: ['change', 'blur'] },
    ],
    dataUnit: [
        { required: true, message: '请选择数据单位', trigger: ['change', 'blur'] },
    ],
})



const validateForm = () => {
    return ruleFormRef.value.validate(valid => {
        if (valid) {
          return true;
        } else {
          return false;
        }
    });
};

// 新增
const addForm = (index) => {
    props.ruleForm.list.push({
        sort: index+1,
        monitorIndex: '',
        judgeTerm: '',
        triggerThreshold: '',
        dataUnit: '',
    })
}

// 删除
const delForm = (item, index) => {
    props.ruleForm.list.splice(index, 1);
}


defineExpose({
    validateForm
})
</script>
<style lang='scss' scoped>
.formTitle{
    display: flex;
    justify-content: flex-start;
    margin-bottom: 10px;
    span{
        display: block;
        width: 170px;
        font-weight: bold;
    }
}
.formBody{
    display: flex;
    justify-content: flex-start;
    margin-bottom: 20px;
    span{
        display: block;
        width: 170px;
        font-weight: bold;
    }
    :deep(.el-form-item){
        margin-right: 20px;
        
    }
}
</style>