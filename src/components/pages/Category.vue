<template>
    <div>
        <div class="nav-bar">
            <van-nav-bar title="类别列表" />
        </div>

        <!-- 分类 -->
        <van-row>
            <van-col span="6">
                <div id="nav-left">
                    <ul>
                        <li :class="{activeCategory: currentIndex == index}" @click="onclickCategory(index, item.ID)" v-for="(item, index) in categories " :key="index">
                            {{item.MALL_CATEGORY_NAME}}
                        </li>
                    </ul>
                </div>
            </van-col>
            <van-col span="18">
                <div class="nav-right">
                    <van-tabs v-model="activeSubIndex" @click="onclickCategorySub">
                        <van-tab v-for="(item, index) in categorySubs" :key="index" :title="item.MALL_SUB_NAME"></van-tab>
                    </van-tabs>
                </div>
                <div id="goods-list">
                    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
                        <van-list v-model="loading" :finished="finished" @load="onLoad">
                            <div class="list-item" @click="goGoodsDetail(item.ID)" v-for="(item, index) in goodsList" :key="index">
                                <div class="list-item-img">
                                    <img :src="item.IMAGE1" width="100%" :onerror="errorImage">
                                </div>
                                <div class="list-item-text">
                                    <div> {{item.NAME}} </div>
                                    <div> ￥{{item.ORI_PRICE | priceFormat}}元</div>
                                </div>
                            </div>
                        </van-list>
                    </van-pull-refresh>
                </div>
            </van-col>
        </van-row>
    </div>
</template>

<script>
import axios from 'axios'
import url from '@/server.config.js'
import { toPrice } from '@/filters/priceFilter.js'

export default {
    created() {
        this.getCategories()
    },
    mounted() {
        let winHeight = document.documentElement.clientHeight
        document.getElementById('nav-left').style.height = winHeight - 46 - 50 + 'px'
        document.getElementById('goods-list').style.height = winHeight - 90 - 50 + 'px'
    },
    methods: {
        getCategories() {
            axios({
                url: url.categoryInfo,
                method: 'get'
            })
                .then(response => {
                    if (response.data.code == 200 && response.data.message) {
                        this.categories = response.data.message
                        this.getCategorySubs(this.categories[0].ID)
                        console.log(this.categories)
                    }
                })
                .catch(error => {
                    console.log(error)
                })
        },
        onclickCategory(index, categoryId) {
            this.currentIndex = index
            this.resetSubList()
            this.getCategorySubs(categoryId)
        },
        getCategorySubs(categoryId) {
            axios({
                url: url.categorySubInfo,
                method: 'post',
                data: { categoryId: categoryId }
            })
                .then(response => {
                    if (response.data.code == 200 && response.data.message) {
                        this.categorySubs = response.data.message
                        this.activeSubIndex = 0
                        this.categorySubId = this.categorySubs[0].ID
                        console.log(this.categories)
                        this.onLoad()
                    }
                })
                .catch(error => {
                    console.log(error)
                })
        },
        onLoad() {
            setTimeout(() => {
                this.categorySubId = this.categorySubId ? this.categorySubId : this.categorySubs[0].ID
                this.getGoodsList()
            }, 500)
        },
        onRefresh() {
            setTimeout(() => {
                this.resetSubList()
                window.scrollTo(0, 10)
                this.onLoad()
            }, 500)
        },
        getGoodsList() {
            axios({
                url: url.listGoodsBySubId,
                method: 'post',
                data: {
                    categorySubId: this.categorySubId,
                    page: this.page
                }
            })
                .then(response => {
                    console.log(response.data)
                    if (response.data.code == 200 && response.data.message.length) {
                        this.page++
                        this.goodsList = this.goodsList.concat(response.data.message)
                    } else {
                        this.finished = true
                    }
                    this.loading = false
                })
                .catch(error => {
                    console.log(error)
                })
        },
        onclickCategorySub() {
            this.categorySubId = this.categorySubs[this.activeSubIndex].ID
            console.log(`categorySubId: ${this.categorySubId}`)
            this.resetSubList()
            this.onLoad()
        },
        resetSubList() {
            this.goodsList = []
            this.finished = false
            this.refreshing = false
            this.page = 1
        },
        goGoodsDetail(id) {
            this.$router.push({
                name:'Goods',
                params: {goodsId: id}
            })
        }
    },
    data() {
        return {
            categories: [],
            currentIndex: 0,
            activeSubIndex: 0,
            categorySubs: [],
            loading: false,
            finished: false,
            goodsList: [],
            refreshing: false,
            page: 1,
            categorySubId: 0,
            errorImage: 'this.src = "' + require('@/assets/images/errorImage.png') + '"'
        }
    },
    filters: {
        priceFormat(price) {
            return toPrice(price)
        }
    }
}
</script>

<style scoped>
#nav-left {
    background-color: aliceblue;
}
#nav-left ul li {
    line-height: 2rem;
    border-bottom: 1px solid #e4e7ed;
    padding: 3px;
    font-size: 0.8rem;
    text-align: center;
}

.activeCategory {
    background-color: white;
}

.list-item {
    display: flex;
    flex-direction: row;
    font-size: 0.8rem;
    border-bottom: 1px solid #f0f0f0;
    background-color: #fff;
    padding: 5px;
}

#goods-list {
    overflow: scroll;
}

.list-item-img {
    flex: 8;
}
.list-item-text {
    flex: 16;
    margin-top: 10px;
    margin-left: 10px;
}
</style>