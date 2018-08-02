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
        <div class="type-bar">
            <div v-for="(cate, index) in categoryArray" :key="index">
                <img v-lazy="cate.image" alt="" width="90%">
                <span>{{cate.mallCategoryName}}</span>
            </div>
        </div>

        <!-- advertisement banner -->
        <div>
            <img v-lazy="adBanner" alt="" width="100%">
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      msg: 'value',
      locationIcon: require('../../assets/images/location.png'),
      bannerPicArray: [],
      categoryArray: [],
      adBanner: ''
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

.type-bar {
  background-color: #ffffff;
  margin: 0 0.3rem 0.3rem 0.3rem;
  border-radius: 0.3rem;
  font-size: 14px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
}
</style>