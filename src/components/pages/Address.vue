<template>
    <div>
        <div class="nav-bar">
            <van-nav-bar title="商品详情" left-arrow left-text="返回" @click-left="goBack" />
        </div>
        <van-address-list v-model="chosenAddressId" :list="list" :disabled-list="disabledList" disabled-text="以下地址超出配送范围" @add="onAdd" @edit="onEdit" />

    </div>
</template>

<script>
import { Toast } from 'vant'
export default {
    data() {
        return {
            chosenAddressId: '1',
            list: [],
            disabledList: [],
        }
    },
    methods: {
        onAdd() {
            Toast('新增地址')
        },

        onEdit(item, index) {
            Toast('编辑地址:' + index)
        },
        goBack() {
            this.$router.go(-1)
        }
    }
}
</script>

<style scoped>
</style>