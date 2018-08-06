<template>
    <div class="goods-info">
        <div class="goods-image">
            <img v-lazy="goodsImage" alt="" width="90%">
        </div>
        <div class="goods-name">
            {{goodsName}}
        </div>
        <div class="goods-price">
            {{goodsPrice | priceFormat}}(￥{{mallPrice | priceFormat}})
        </div>
    </div>
</template>

<script>
import { toPrice } from '@/filters/priceFilter.js'

export default {
  props: ['goodsName', 'goodsPrice', 'goodsImage', 'mallPrice'],
  filters: {
    priceFormat(price) {
      return toPrice(price)
    }
  }
}
</script>

<style scoped>
.goods-name {
  padding: 0 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>