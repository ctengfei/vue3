<template>
    <div class="app-container">
        <div class="title">自定义发布 <span @click="releaseList">发布列表</span></div>
        <div class="forms">
            <div class="formTitle">信息发布</div>
            <el-form ref="ruleFormRef" style="max-width: 600px" class="formBody" :model="ruleForm" :rules="rules" label-width="auto">
                <el-form-item label="标题" prop="title">
                    <el-input v-model="ruleForm.title" placeholder="请输入标题"/>
                </el-form-item>
                <el-form-item label="预警类别" prop="warnType">
                    <el-select v-model="ruleForm.warnType" placeholder="请选择预警类别">
                        <el-option v-for="item in warn_type" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                </el-form-item>
                <el-form-item label="预警等级" prop="warnGrade">
                    <el-select v-model="ruleForm.warnGrade" placeholder="请选择预警等级">
                        <el-option v-for="item in warnGrade" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                </el-form-item>
                <el-form-item label="发布对象" prop="publishObject">
                    <el-select v-model="ruleForm.publishObject" placeholder="请选择发布对象">
                        <el-option v-for="item in publish_type" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                </el-form-item>
                <el-form-item label="发布内容" prop="content">
                    <el-input v-model="ruleForm.content" type="textarea"  placeholder="请输入发布内容"/>
                </el-form-item>
                <div class="footerBtn">
                    <el-button type="primary" @click="submitForm(ruleFormRef)">
                        直接发布
                    </el-button>
                    <el-button @click="resetForm(ruleFormRef)">保存</el-button>
                </div>
            </el-form>
        </div>

    </div>
</template>

<script setup name="warnRelease">
import { addWarnpublish } from '@/api/fourFloodPrevent/warnInfor'
import { ElMessage, ElMessageBox } from 'element-plus'
const { proxy } = getCurrentInstance();
const { warn_type, publish_type } = proxy.useDict("warn_type", "publish_type")
const router = useRouter();
const route = useRoute();

let ruleFormRef = ref();
const warnGrade = reactive([
    { value: '1', label: 'Ⅰ级' },
    { value: '2', label: 'Ⅱ级' },
    { value: '3', label: 'Ⅲ级' },
    { value: '3', label: 'Ⅳ级' },
])
const ruleForm = reactive({
    content: "",
    publishObject: "",
    title: "",
    warnGrade: "",
    warnType: ""
})
const rules = reactive({
    title: [
        { required: true, message: '请输入标题', trigger: 'blur' },
    ],
    publishObject: [
        { required: true, message: '请选择发布对象', trigger: 'change' },
    ],
    warnGrade: [
        { required: true, message: '请选择预警等级', trigger: 'change' },
    ],
    warnType: [
        { required: true, message: '请选择预警类型', trigger: 'change' },
    ],
})
onMounted(() => {

})

// 发布列表
const releaseList = () => {
    router.push('warnHistory')
};

// 提交
const submitForm = (formEl) => {
  if (!formEl) return
   formEl.validate((valid, fields) => {
    if (valid) {
        addWarnpublish({...ruleForm}).then(res=>{
            ElMessage({
                message: '发布成功!',
                type: 'success'
            });
            formEl.resetFields()
        })
    }
  })
}
//  取消
const resetForm = (formEl) => {
  if (!formEl) return
  formEl.resetFields()
}


</script>

<style lang='scss' scoped>
.title {
    line-height: 57px;
    height: 57px;
    font-weight: 500;
    font-size: 18px;
    color: #22283F;
    border-bottom: solid 1px #EAEAEA;
    display: flex;
    justify-content: space-between;
    align-items: center;

    span {
        display: block;
        width: 74px;
        height: 36px;
        line-height: 36px;
        font-size: 14px;
        color: #FFFFFF;
        background: linear-gradient(135deg, #0A7BFE 0%, #00BBDB 100%);
        border-radius: 4px;
        text-align: center;
        cursor: pointer;
    }
}
.forms{
    width: 836px;
    height: 598px;
    background: #fdfafa;
    border-radius: 20px;
    margin: 30px auto;
    
}
.formTitle{
    width: 100%;
    height: 58px;
    background: rgba(8, 97, 159, 0.06);
    font-weight: 500;
    font-size: 20px;
    color: #08619F;
    line-height: 58px;
    border-radius: 20px 20px 0 0;
    padding: 0 20px;
}
.formBody{
    margin: 30px auto;

}
.footerBtn{
    margin-top: 60px;
    text-align: center;
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