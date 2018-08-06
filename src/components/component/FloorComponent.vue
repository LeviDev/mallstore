<template>
    <div class="floor">
        <div class="floor-title">
            {{floorTitle}}
        </div>
        <div class="floor-abnormal">
            <div class="floor-one">
                <img :src="floorData0.image" alt="" width="100%">
            </div>
            <div>
                <div class="floor-two">
                    <img :src="floorData1.image" alt="" width="100%">
                </div>
                <div>
                    <img :src="floorData2.image" alt="" width="100%">
                </div>
            </div>
        </div>
        <div class="floor-reqular">
            <div v-for="(item, index) in floorData.slice(3)" :key=index>
                <img :src="item.image" alt="" width="100%">
            </div>
        </div>
    </div>
</template>

<script>
export default {
  props: ['floorData', 'floorTitle'],
  data() {
    return {
      floorData0: {},
      floorData1: {},
      floorData2: {},
    }
  },
  watch: {
    floorData: function(val) {
      this.floorData0 = this.floorData[0]
      this.floorData1 = this.floorData[1]
      this.floorData2 = this.floorData[2]
    }
  }
}
</script>

<style scoped>
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

.floor-title{
    text-align: center;
    line-height: 1.8em;
    height: 1.8em;
    font-size: 14px;
}

</style>