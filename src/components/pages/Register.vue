<template>
    <div>
        <van-nav-bar title="用户注册" left-text="返回" left-arrow @click-left="goBack"></van-nav-bar>
        <div class="register-panel">
            <van-field v-model="username" label="用户名" icon="clear" placeholder="请输入用户名" required @click-icon="username=''">
            </van-field>
            <van-field v-model="password" type="password" label="密码" placeholder="请输入密码" required>
            </van-field>
            <div class="register-btn">
                <van-button type="primary" size="large" @click="axiosRegister">注册</van-button>
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
            password: ''
        }
    },
    methods: {
        goBack() {
            this.$router.go(-1)
        },
        axiosRegister() {
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
                    } else {
                        console.log(response.data.message)
                        Toast.fail('注册失败！')
                    }
                })
                .catch(error => {
                    console.log(error)
                    Toast.fail('注册失败！')
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