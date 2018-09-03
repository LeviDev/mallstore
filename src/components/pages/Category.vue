<template>
    <div>
        <div class="nav-bar">
            <van-nav-bar title="产品分类" />
        </div>

        <!-- 分类 -->
        <van-row>
            <van-col span="6">
                <div id="nav-left">
                    <ul>
                        <li :class="{activeCategory: currentIndex == index}" @click="setCurrentCategory(index, item.ID)" v-for="(item, index) in categories " :key="index">
                            {{item.MALL_CATEGORY_NAME}}
                        </li>
                    </ul>
                </div>
            </van-col>
            <van-col span="18">
                <div class="nav-right">
                    <van-tabs v-model="activeSubIndex">
                        <van-tab  v-for="(item, index) in categorySubs" :key="index" :title="item.MALL_SUB_NAME"></van-tab>
                    </van-tabs>
                </div>
            </van-col>
        </van-row>
    </div>
</template>

<script>
import axios from 'axios'
import url from '@/server.config.js'

export default {
    created() {
        this.getCategories()
    },
    mounted() {
        let winHeight = document.documentElement.clientHeight
        document.getElementById('nav-left').style.height = winHeight - 46 + 'px'
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
        setCurrentCategory(index, categoryId) {
            this.currentIndex = index
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
                        console.log(this.categories)
                    }
                })
                .catch(error => {
                    console.log(error)
                })
        }
    },
    data() {
        return {
            categories: [],
            currentIndex: 0,
            activeSubIndex: 0,
            categorySubs: []
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
</style>