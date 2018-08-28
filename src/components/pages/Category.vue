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
    </div>
</template>

<script>
export default {
    data() {
        return {
            locationIcon: require('../../assets/images/location.png')
        }
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

</style>