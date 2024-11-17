<template>
  <div
    class="fixed left-0 bottom-0 w-screen text-center bg-white dark:bg-zinc-800 xl:hidden"
  >
    <Discounts />

    <div class="flex justify-between text-xs px-1 py-0.5">
      <div class="text-left text-zinc-900 dark:text-zinc-200">
        <p class="">
          券后合计：<span class="text-red-600 text-[16px] font-sans font-medium"
            >￥</span
          ><span class="text-red-600 text-[22px] font-sans font-medium">9</span>
        </p>
        <p class="text-red-600">优惠券：限时立减 ￥10</p>
      </div>
      <m-button class="w-[120px]" :isActiveAnim="false" @click="onConfirmClick"
        >立即开通</m-button
      >
    </div>

    <popup v-model="isVisible" class="rounded">
      <MPaySelect />
    </popup>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Discounts from '../discounts.vue'
import MPaySelect from './mobile-pay-select.vue'

const isVisible = ref(false)

const onConfirmClick = () => {
  isVisible.value = !isVisible.value
}
</script>

<style lang="scss" scoped></style>
