<template>
    <div class="login">
        <Form class="loginForm" ref="formInline" :model="formInline" :rules="ruleInline">
            <h1 class="center marginBottom24 title">物业管理平台登录</h1>
            <FormItem prop="user">
                <Input type="text" v-model="formInline.user" placeholder="账号">
                    <Icon type="ios-person-outline" slot="prepend"></Icon>
                </Input>
            </FormItem>
            <FormItem prop="password">
                <Input type="password" v-model="formInline.password" placeholder="密码">
                    <Icon type="ios-lock-outline" slot="prepend"></Icon>
                </Input>
                <!-- <Checkbox v-model="remember">记住密码</Checkbox> -->
                <span class="fr pointer" @click="forgetPassword">忘记密码</span>
            </FormItem>
            <Button long type="primary" @click="login('formInline')">登录</Button>
            <router-link to="/register" class="fr toReg">没有账号，去注册~</router-link>
        </Form>
    </div>
</template>

<script>
import { setToken, getToken } from '@/libs/utils'
export default {
    data () {
        return {
            // remember: false,
            formInline: {
                user: '',
                password: ''
            },
            ruleInline: {
                user: [
                    { required: true, message: '请输入账号', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { type: 'string', min: 6, message: '密码格式不正确', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        forgetPassword() {
            // 弹窗
        },
        login(name) {
            let sendData = this.$refs[name].model
            sendData.remember = this.remember
            this.$refs[name].validate((valid) => {
                if (valid) {
                    setToken(sendData.user)
                    this.$Message.success('登录成功!');
                    setTimeout(() => {
                        this.$router.push({name: 'home'})
                    }, 1000);
                } else {
                    this.$Message.error('请输入正确的账号密码');
                }
            })
        }
    }
}
</script>

<style lang="less" scoped>
.login {
    width: 100vw;
    height: 100vh;
    background: url("~@/assets/image/login.jpg") no-repeat;
    background-size: cover;
    padding-top: 10%;
    color: #b5c1cf;
    .loginForm {
        width: 22vw;
        margin: auto;
        .toReg {
            color: #b5c1cf;
            font-size: 14px;
            line-height: 40px;
            &:hover {
                text-decoration: underline;
                color: #2D8CEA;
            }
        }
    }
}
</style>