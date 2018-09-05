<template>
    <div>
        <div class="nav-bar">
            <van-nav-bar title="商品详情" left-arrow left-text="返回" @click-left="goBack" />
        </div>
        <div class="top-image">
            <img :src="goodsInfo.IMAGE1" alt="" width="100%">
        </div>

        <div class="goods-name">
            {{goodsInfo.NAME}}
        </div>
        <div class="goods-price">
            商品价格：{{goodsInfo.PRESENT_PRICE | priceFormat}} 元
        </div>

        <!-- Tab -->
        <div>
            <van-tabs swipeable sticky>
                <van-tab title="商品详情">
                    <div class="goodsDetail" v-html="goodsInfo.DETAIL"> </div>
                </van-tab>
                <van-tab title="评论">评论制作中...</van-tab>
            </van-tabs>
        </div>

        <!-- bottom -->
        <div class="goods-bottom">
            <div>
                <van-button @click="addToCart" size="large" type="primary">加入购物车</van-button>
            </div>
            <div>
                <van-button size="large" type="danger">马上购买</van-button>
            </div>
        </div>
    </div>
</template>

<script>
import url from '@/server.config.js'
import axios from 'axios'
import { Toast } from 'vant'
import { toPrice } from '@/filters/priceFilter.js'
export default {
    data() {
        return {
            goodsId: '',
            goodsInfo: {}
        }
    },
    created() {
        this.goodsId = this.$route.query.goodsId ? this.$route.query.goodsId : this.$route.params.goodsId
        this.getGoddsInfo()
    },
    filters: {
        priceFormat(price) {
            return toPrice(price)
        }
    },
    methods: {
        getGoddsInfo() {
            axios({
                url: url.goodsInfo,
                method: 'post',
                data: {
                    goodsId: this.goodsId
                }
            })
                .then(response => {
                    if (response.data.code == 200 && response.data.message) {
                        this.goodsInfo = response.data.message
                        console.log(this.goodsInfo)
                    } else {
                        Toast.fail('获取服务器数据错误')
                    }
                })
                .catch(error => {
                    console.log(error)
                })
        },
        goBack() {
            this.$router.go(-1)
        },
        addToCart() {
            let cartInfo = localStorage.cartInfo ? JSON.parse(localStorage.cartInfo) : []
            let existItem = cartInfo.find(cart => {
                return cart.goodsId == this.goodsId
            })
            if (!existItem) {
                let newGoods = {
                    goodsId: this.goodsInfo.ID,
                    name: this.goodsInfo.NAME,
                    image: this.goodsInfo.IMAGE1,
                    count: 1
                }
                cartInfo.push(newGoods)
            } else {
                existItem.count++
            }
            localStorage.cartInfo = JSON.stringify(cartInfo);
            Toast.success('商品成功加入购物车')
        }
    }
}
</script>

<style scoped>
.goods-name,
.goods-price {
    background-color: white;
}
.goodsDetail {
    font-size: 0;
}

.goods-bottom {
    position: fixed;
    left: 0px;
    bottom: 0px;
    width: 100%;
    background-color: white;
    display: flex;
    flex-direction: row;
    flex-flow: nowrap;
}

.goods-bottom > div {
    flex: 1;
    padding: 2px;
}
</style>