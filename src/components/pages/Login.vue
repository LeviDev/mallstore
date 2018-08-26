<template>
    <div>
        <van-nav-bar title="用户登录" left-text="返回" left-arrow @click-left="goBack"></van-nav-bar>
        <div class="login-panel">
            <van-field v-model="username" label="用户名" icon="clear" placeholder="请输入用户名" required @click-icon="username=''" :error-message="nameErrorMessage">
            </van-field>
            <van-field v-model="password" type="password" label="密码" placeholder="请输入密码" required :error-message="passwordErrorMessage">
            </van-field>
            <div class="login-btn">
                <van-button type="primary" size="large" @click="loginAction" :loading="loading">登录</van-button>
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
    created() {
        if (localStorage.userInfo) {
            Toast.success('您已经登录过了')
            this.$router.push('/')
        }
    },
    methods: {
        goBack() {
            this.$router.go(-1)
        },
        checkLoginForm() {
            let isOK = true
            if (this.username.length < 4) {
                isOK = false
                this.nameErrorMessage = '用户名长度不能少于4位'
            } else {
                this.nameErrorMessage = ''
            }
            if (this.password.length < 4) {
                isOK = false
                this.passwordErrorMessage = '密码长度不能少于4位'
            } else {
                this.passwordErrorMessage = ''
            }
            return isOK
        },
        loginAction() {
            if (this.checkLoginForm()) {
                this.axiosLogin()
            }
        },
        axiosLogin() {
            this.loading = true
            axios({
                url: url.login,
                method: 'post',
                data: {
                    userName: this.username,
                    password: this.password
                }
            })
                .then(response => {
                    // console.log(response.data)
                    if (response.data.code == 200 && response.data.message) {
                        new Promise((resolve, reject) => {
                            localStorage.userInfo = this.userName
                            setTimeout(() => {
                                resolve()
                            }, 500);
                        }).then(() => {
                            Toast.success('登录成功')
                            this.$router.push('/')
                        }).catch(error => {
                            Toast.fail('登录失败')
                            console.log(error)
                        })
                    } else {
                        Toast.fail('登录失败')
                        this.loading = false
                    }
                })
                .catch(error => {
                    Toast.fail('登录失败')
                    console.log(error)
                    this.loading = false
                })
        }
    }
}
</script>

<style scoped>
.login-panel {
    width: 100%;
    border-radius: 5px;
    margin: 20px auto;
    padding-bottom: 10px;
}

.login-btn {
    margin-top: 10px;
}
</style>