<template>
    <div>
        <div class="nav-bar">
            <van-nav-bar title="购物车" />
        </div>
        <div class="clear-btn">
            <van-button type="danger" size="small" plain @click="clearCart">
                清空购物车
            </van-button>
        </div>

        <div class="goods-items">
            <div class="goods-list" v-for="(item, index) in cartInfo" :key="index">
                <div class="goods-image">
                    <img :src="item.image" alt="" width="100%">
                </div>
                <div class="goods-text">
                    <div class="goods-name"> {{item.name}} </div>
                    <div class="goods-price"> ￥ {{item.price | priceFormat}} x {{item.count}} =
                        <span style="color:red">{{item.price * item.count | priceFormat}}</span> 元</div>
                    <div class="goods-count">
                        <van-stepper v-model="item.count"> </van-stepper>
                    </div>
                </div>
            </div>
        </div>
        <div class="submit-area">
            <van-submit-bar class="submit-bar" :price="totalPrice" button-text="提交订单" @submit="onSubmit">

            </van-submit-bar>
        </div>
    </div>
</template>

<script>
import { toPrice } from '@/filters/priceFilter.js'

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
        },
        clearCart() {
            localStorage.removeItem('cartInfo')
            this.cartInfo = []
        },
        onSubmit() {
            // Todo
        }
    },
    computed: {
        totalPrice() {
            let totalPrice = 0
            this.cartInfo.forEach((item, index) => {
                totalPrice += item.price * item.count
                // console.log(`totalPrice: ${totalPrice}`)
            })
            localStorage.cartInfo = JSON.stringify(this.cartInfo)
            return totalPrice * 100 // fen -> yuan
        }
    },
    filters: {
        priceFormat(price) {
            return toPrice(price)
        }
    },
    created() {
        this.getCartInfo()
    }
}
</script>

<style scoped>
.clear-btn {
    height: 2em;
    line-height: 2em;
    background-color: white;
    border-bottom: 1px solid #e4e7ed;
    padding: 5px;
    text-align: right;
}

.goods-items {
    height: 25em;
    overflow: scroll;
}

.goods-list {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    background-color: white;
    padding: 0.5em;
    font-size: 0.8em;
    border-bottom: 1px solid #e4e7ed;
}

.goods-image {
    flex: 6;
}

.goods-text {
    flex: 18;
    padding-left: 10px;
}

.goods-price {
    padding-top: 10px;
}
.goods-count {
    padding-top: 10px;
    text-align: right;
}

.submit-bar {
    margin-bottom: 50px;
}
</style>