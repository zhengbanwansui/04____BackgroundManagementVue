<template>
    <el-form :model="ruleForm" :rules="rules" ref="formName" label-width="100px" class="form" hide-required-asterisk>

        <el-alert v-show="success"
                  title="成功"
                  type="success"
                  show-icon >
        </el-alert>
        <el-alert v-show="error"
                  title="错误"
                  type="error"
                  show-icon >
        </el-alert>

        <el-form-item label="id" prop="username" class="formItem">
            <el-input v-model.number="ruleForm.id"></el-input>
        </el-form-item>
        <el-form-item label="温度" prop="temperature" class="formItem">
            <el-input v-model.number="ruleForm.temperature"></el-input>
        </el-form-item>
        <el-form-item label="湿度" prop="humidness" class="formItem">
            <el-input v-model.number="ruleForm.humidness"></el-input>
        </el-form-item>
        <el-form-item label="气压" prop="pressure" class="formItem">
            <el-input v-model.number="ruleForm.pressure"></el-input>
        </el-form-item>
        <el-form-item label="光强" prop="light" class="formItem">
            <el-input v-model.number="ruleForm.light"></el-input>
        </el-form-item>
        <el-form-item label="距离" prop="distance" class="formItem">
            <el-input v-model.number="ruleForm.distance"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm('formName')">立即修改</el-button>
            <el-button @click="resetForm('formName')">重置</el-button>
        </el-form-item>

    </el-form>
</template>

<script>
    import axios from 'axios'

    export default {
        data() {
            return {
                success: false,
                error: false,
                ruleForm: {
                    id: 1,
                    temperature: 1,
                    humidness:1,
                    pressure:1,
                    light:1,
                    distance:1
                },
                rules: {
                    id: [
                        { type: 'number', message: '必须为数字值', trigger: 'change'}
                    ],
                    temperature: [
                        { type: 'number', message: '必须为数字值', trigger: 'change'}
                    ],
                    humidness: [
                        { type: 'number', message: '必须为数字值', trigger: 'change'}
                    ],
                    pressure: [
                        { type: 'number', message: '必须为数字值', trigger: 'change'}
                    ],
                    light: [
                        { type: 'number', message: '必须为数字值', trigger: 'change'}
                    ],
                    distance: [
                        { type: 'number', message: '必须为数字值', trigger: 'change'}
                    ]
                }
            };
        },
        created() {
            if (this.$route.query.theId !== null) {
                this.ruleForm.id = this.$route.query.theId;
            }
        },
        methods: {
            submitForm(formName) {
                const vueThis = this;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        console.log("send" + this.ruleForm);
                        axios.put('http://localhost:8080/data/' + this.ruleForm.id, this.ruleForm)
                            .then(function (response) {
                                console.log(response);
                                if (response.data === 1) {
                                    vueThis.success = true;
                                    vueThis.error = false;
                                } else {
                                    vueThis.success = false;
                                    vueThis.error = true;
                                }
                            })
                            .catch(function (error) {
                                vueThis.success = false;
                                vueThis.error = true;
                            });

                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>

<style scoped>
    .formItem {
        width: 600px;
    }
    .form {
        width: 600px;
    }
</style>