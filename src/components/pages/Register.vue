<template>
    <div>
        <van-nav-bar title="用户注册" left-text="返回" left-arrow @click-left="goBack"></van-nav-bar>
        <div class="register-panel">
            <van-field v-model="username" label="用户名" icon="clear" placeholder="请输入用户名" required @click-icon="username=''" :error-message="nameErrorMessage">
            </van-field>
            <van-field v-model="password" type="password" label="密码" placeholder="请输入密码" required :error-message="passwordErrorMessage">
            </van-field>
            <div class="register-btn">
                <van-button type="primary" size="large" @click="registerAction" :loading="loading">注册</van-button>
            </div>
        </div>
    </div>
</template>

<script>
import url from '@/server.config.js'
import axios from 'axios'
import { Toast } from 'vant'

export default {
    data() {
        return {
            username: '',
            password: '',
            loading: false,
            nameErrorMessage: '',
            passwordErrorMessage: ''
        }
    },
    methods: {
        goBack() {
            this.$router.go(-1)
        },
        checkRegisterForm() {
            let isOK = true
            if (this.username.length < 4) {
                isOK = false
                this.nameErrorMessage = "用户名长度不能少于4位"
            } else {
                this.nameErrorMessage = ""
            }
            if (this.password.length < 4) {
                isOK = false
                this.passwordErrorMessage = "密码长度不能少于4位"
            } else {
                this.passwordErrorMessage = ""
            }
            return isOK
        },
        registerAction() {
            if (this.checkRegisterForm()) {
                this.axiosRegister()
            }
        },
        axiosRegister() {
            this.loading = true
            axios({
                url: url.registerUser,
                method: 'post',
                data: {
                    userName: this.username,
                    password: this.password
                }
            })
                .then(response => {
                    if (response.data.code == 200) {
                        Toast.success(response.data.message)
                        this.$router.push('/')
                    } else {
                        console.log(response.data.message)
                        Toast.fail('注册失败！')
                        this.loading = false
                    }
                })
                .catch(error => {
                    console.log(error)
                    Toast.fail('注册失败！')
                    this.loading = false
                })
        }
    }
}
</script>

<style scoped>
.register-panel {
    width: 100%;
    border-radius: 5px;
    margin: 20px auto;
    padding-bottom: 10px;
}

.register-btn {
    margin-top: 10px;
}
</style>