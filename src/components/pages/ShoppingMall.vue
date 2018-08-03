<template>
    <div>
        <div class="search-bar">
            <van-row>
                <van-col span="3">
                    <img :src="locationIcon" alt="" width="80%" class="location-icon">
                </van-col>
                <van-col span="16">
                    <input type="text" class="search-input">
                </van-col>
                <van-col span="5">
                    <van-button size="mini">查找</van-button>
                </van-col>
            </van-row>
        </div>

        <!-- swiper area -->
        <div class="swiper-area">
            <van-swipe :autoplay="3000">
                <van-swipe-item v-for="(banner, index) in bannerPicArray" :key="index">
                    <img v-lazy="banner.image" alt="" width="100%">
                </van-swipe-item>
            </van-swipe>
        </div>

        <!-- category -->
        <div class="category-bar">
            <div v-for="(cate, index) in categoryArray" :key="index">
                <img v-lazy="cate.image" alt="" width="90%">
                <span>{{cate.mallCategoryName}}</span>
            </div>
        </div>

        <!-- advertisement banner -->
        <div>
            <img v-lazy="adBanner" alt="" width="100%">
        </div>

        <!-- recommend goods area -->
        <div class="recommend-area">
            <div class="recommend-title">
                推荐商品
            </div>
            <div class="recommend-body">
                <swiper :options="swiperOption">
                    <swiper-slide v-for="(item, index) in recommendGoods" :key=index>
                        <div class="recommend-item">
                            <img :src="item.image" alt="" width="80%">
                            <div>
                                {{item.goodsName}}
                            </div>
                            <div>
                                ￥{{item.price}}(￥{{item.mallPrice}})
                            </div>
                        </div>
                    </swiper-slide>
                    <!-- <div class="swiper-pagination" slot="pagination"></div> -->
                </swiper>
            </div>

        </div>

        <div class="floor">
            <div class="floor-abnormal">
                <div class="floor-one">
                    <img :src="floor1_0.image" alt="" width="100%">
                </div>
                <div>
                    <div class="floor-two">
                        <img :src="floor1_1.image" alt="" width="100%">
                    </div>
                    <div>
                        <img :src="floor1_2.image" alt="" width="100%">
                    </div>
                </div>
            </div>
            <div class="floor-reqular">
                <div v-for="(item, index) in floor1.slice(3)" :key=index>
                    <img :src="item.image" alt="" width="100%">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
// require styles
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default {
  data() {
    return {
      msg: 'value',
      locationIcon: require('../../assets/images/location.png'),
      bannerPicArray: [],
      categoryArray: [],
      adBanner: '',
      recommendGoods: [],
      floor1: [],
      floor1_0: [],
      floor1_1: [],
      floor1_2: [],

      swiperOption: {
        slidesPerView: 3,
        spaceBetween: 30,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        }
      }
    }
  },
  components: {
    swiper,
    swiperSlide
  },
  created() {
    axios({
      url: 'https://www.easy-mock.com/mock/5b62a433dc98972baf832e07/index',
      method: 'get'
    })
      .then(response => {
        if (response.status == 200) {
          console.log(response)
          this.bannerPicArray = response.data.data.slides
          this.categoryArray = response.data.data.category
          this.adBanner = response.data.data.advertesPicture.PICTURE_ADDRESS
          this.recommendGoods = response.data.data.recommend
          this.floor1 = response.data.data.floor1
          this.floor1_0 = this.floor1[0]
          this.floor1_1 = this.floor1[1]
          this.floor1_2 = this.floor1[2]
        }
      })
      .catch(error => {
        console.log(error)
      })
  }
}
</script>

<style scoped>
.search-bar {
  height: 2.2rem;
  line-height: 2.2rem;
  background-color: darkorchid;
  overflow: hidden;
}

.location-icon {
  padding-left: 0.2rem;
  padding-bottom: 0.3rem;
}
.search-input {
  width: 100%;
  height: 1.3rem;
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: 1px solid #ffffff !important;
  background-color: darkorchid;
}

.swiper-area {
  clear: both;
  max-height: 12rem;
  overflow: hidden;
}

.category-bar {
  background-color: #ffffff;
  margin: 0 0.3rem 0.3rem 0.3rem;
  border-radius: 0.3rem;
  font-size: 14px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
}

.recommend-area {
  background-color: #ffffff;
  margin-top: 0.3rem;
}

.recommend-title {
  border-bottom: 1px solid #eee;
  font-size: 14px;
  padding: 0.2rem;
  color: darkorchid;
}
.recommend-body {
  border-bottom: 1px solid #eee;
}
.recommend-item {
  width: 99%;
  border-right: 1px solid #eee;
  font-size: 12px;
  text-align: center;
}

.floor-abnormal {
  display: flex;
  flex-direction: row;
  font-size: 12px;
  border-bottom: 1px solid #ddd;
  background-color: #fff;
}

.floor-abnormal div {
  width: 10rem;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  border-bottom: 1px solid #ddd;
}

.floor-one {
  border-right: 1px solid #ddd;
}
.floor-two {
  border-bottom: 1px solid #ddd;
}

.floor-reqular {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    background-color: #fff;
}

.floor-reqular div {
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    width: 10em;
    border-bottom: 1px solid #ddd;
}

.floor-reqular div:nth-child(odd) {
    border-right: 1px solid #ddd;
}

</style>