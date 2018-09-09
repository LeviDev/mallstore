<template>
    <div>
        <div class="main-div">
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        </div>
        <van-tabbar v-model="active" @change="onActiveChange">
            <van-tabbar-item icon="shop">首页</van-tabbar-item>
            <van-tabbar-item icon="records">列表</van-tabbar-item>
            <van-tabbar-item icon="cart">购物车</van-tabbar-item>
            <van-tabbar-item icon="contact">会员中心</van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
export default {
    data() {
        return {
            active: 0
        }
    },
    updated() {
        this.onActiveBarChange()
    },
    created() {
        this.onActiveBarChange()
    },
    methods: {
        onActiveChange(active) {
            switch (active) {
                case 0:
                    this.$router.push({ name: 'ShoppingMall' })
                    break
                case 1:
                    this.$router.push({ name: 'Category' })
                    break
                case 2:
                    this.$router.push({ name: 'Cart' })
                    break
                case 3:
                    this.$router.push({ name: 'Member' })
                    break
            }
        },
        onActiveBarChange() {
            let name = this.$route.name
            // console.log(this.$route)
            if (name == 'ShoppingMall') {
                this.active = 0
            } else if (name == 'Category') {
                this.active = 1
            } else if (name == 'Cart') {
                this.active = 2
            } else if (name == 'Category') {
                this.active = 1
            } else if (name == 'Member') {
                this.active = 3
            }
        }
    }
}
</script>

<style scoped>
</style>