<template>
    <div>
        <div class="nav-bar">
            <van-nav-bar title="购物车" />
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                cartInfo: [],
                isEmpty: true
            }
        },
        methods: {
            getCartInfo() {
                if (localStorage.cartInfo) {
                    this.cartInfo = JSON.parse(localStorage.cartInfo)
                }
                this.isEmpty = this.cartInfo.length > 0 ? true : false
                console.log(JSON.stringify(this.cartInfo))
            }
        },
        created() {
            this.getCartInfo()
        }
    }
</script>

<style scoped>

</style>