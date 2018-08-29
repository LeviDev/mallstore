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
                        <li :class="{activeCategory: currentIndex == index}" @click="setCurrentCategory(index)" v-for="(item, index) in categories " :key="index">
                            {{item.MALL_CATEGORY_NAME}}
                        </li>
                    </ul>
                </div>
            </van-col>
            <van-col span="18">
                <div>
                    右侧
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
                        console.log(this.categories)
                    }
                })
                .catch(error => {
                    console.log(error)
                })
        },
        setCurrentCategory(index) {
            this.currentIndex = index
        }
    },
    data() {
        return {
            categories: [],
            currentIndex: 0
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