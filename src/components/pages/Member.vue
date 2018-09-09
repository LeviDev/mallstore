<template>
    <div>
        <div class="nav-bar">
            <van-nav-bar title="会员中心" />
        </div>

        <div class="login">
            <div>
                <van-button type="warning">
                    我要登录
                </van-button>
            </div>
            <div>
                <van-button @click="goRegister" type="primary">
                    我要注册
                </van-button>
            </div>
        </div>

        <div>
            <van-cell-group>
                <van-cell title="会员卡" is-link />
                <van-cell title="地址管理" is-link />
                <van-cell title="我的订单" is-link />
                <van-cell title="会员权益" is-link />
                <van-cell title="联系我们" is-link />
            </van-cell-group>

        </div>
    </div>
</template>

<script>
export default {
    methods: {
        goRegister() {
            this.$router.push({name: 'Register'})
        }
    },
}
</script>

<style scoped>
.login {
    display: flex;
    flex-direction: row;
    background-color: #fff;
    padding: 10px;
}
.login div {
    flex: 1;
    text-align: center;
}
</style>