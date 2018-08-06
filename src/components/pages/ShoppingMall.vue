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
                                ￥{{item.price | priceFormat}}(￥{{item.mallPrice | priceFormat}})
                            </div>
                        </div>
                    </swiper-slide>
                    <!-- <div class="swiper-pagination" slot="pagination"></div> -->
                </swiper>
            </div>

        </div>

        <floorComponent :floorData='floor1' :floorTitle="floorName.floor1"></floorComponent>
        <floorComponent :floorData='floor2' :floorTitle="floorName.floor2"></floorComponent>
        <floorComponent :floorData='floor3' :floorTitle="floorName.floor3"></floorComponent>

        <div class="hot-sale-area">
            <div class="hot-sale-title">
                热卖商品
            </div>
            <div class="hot-sale-item">
                <van-list>
                    <van-row gutter="0">
                        <van-col span="12" v-for="(item, index) in hotSales" :key="index">
                            <goodsInfo :goodsName="item.name" :goodsPrice="item.price" :goodsImage="item.image" :mallPrice="item.mallPrice"></goodsInfo>
                            <!-- <div>{{item.name}}</div> -->
                        </van-col>
                    </van-row>
                </van-list>
            </div>
        </div>

    </div>
</template>

<script>
import axios from 'axios'
// require styles
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import floorComponent from '../component/FloorComponent'
import goodsInfo from '../component/GoodsInfoComponent'
import { toPrice } from '@/filters/priceFilter.js'

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
      floor2: [],
      floor3: [],
      floorName: {},
      hotSales: [],

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
    swiperSlide,
    floorComponent,
    goodsInfo
  },
  filters: {
    priceFormat(price) {
      return toPrice(price)
    }
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
          this.floor2 = response.data.data.floor2
          this.floor3 = response.data.data.floor3
          this.floorName = response.data.data.floorName
          this.hotSales = response.data.data.hotGoods
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

.hot-sale-area {
  text-align: center;
  font-size: 14px;
  height: 1.8rem;
  line-height: 1.8rem;
}
</style>