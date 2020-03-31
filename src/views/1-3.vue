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

        <el-form-item label="要更改的用户" prop="oldName" class="formItem">
            <el-input v-model="ruleForm.oldName"></el-input>
        </el-form-item>

        <el-form-item label="新用户名" prop="username" class="formItem">
            <el-input v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="password" class="formItem">
            <el-input v-model="ruleForm.password"></el-input>
        </el-form-item>
        <el-form-item label="新年龄" prop="age" class="formItem">
            <el-input v-model.number="ruleForm.age"></el-input>
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
                    oldName: '',
                    username: '',
                    password: '',
                    age: null
                },
                rules: {
                    oldName: [
                        { required: true, message: '请输入旧用户名', trigger: 'change' },
                        { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'change' }
                    ],
                    username: [
                        { required: true, message: '请输入新用户名', trigger: 'change' },
                        { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'change' }
                    ],
                    password: [
                        { required: true, message: '请输入新密码', trigger: 'change' },
                        { pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/, message: '长度在 6 到 20 个字符的数字字母组合', trigger: 'change' }
                    ],
                    age: [
                        { required: true, message: '请输入新年龄', trigger: 'change'},
                        { type: 'number', message: '年龄必须为数字值', trigger: 'change'},
                        { pattern: /^(\d{1,2}|100)$/, message: '请输入0-100之间的数字', trigger: 'change'}
                    ]
                }
            };
        },
        methods: {
            // valid为true则说明表单通过全部校验
            submitForm(formName) {
                const vueThis = this;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        axios.put('http://localhost:8080/users/' + this.ruleForm.oldName, this.ruleForm)
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
                this.ruleForm.oldName = this.$route.query.theUser;
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