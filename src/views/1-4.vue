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

        <el-form-item label="用户名" prop="username" class="formItem">
            <el-input v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm('formName')">立即删除</el-button>
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
                    username: ''
                },
                rules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'change' },
                        { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'change' }
                    ]
                }
            };
        },
        methods: {
            submitForm(formName) {
                const vueThis = this;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        console.log("send" + this.ruleForm);
                        axios.delete('http://localhost:8080/users/' + this.ruleForm.username)
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
        },
        created() {
            if (this.$route.query.theUser !== null) {
                this.ruleForm.username = this.$route.query.theUser;
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