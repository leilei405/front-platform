<template>
  <div
    class="flex justify-center items-center py-0.5 bg-orange-100 border-orange-300 border-t xl:border xl:rounded-sm"
    v-if="!isCountDown"
  >
    <svg-icon
      name="countdown"
      class="w-1.5 h-1.5 mr-1"
      fillClass="fill-red-600"
    />
    <p class="text-xs text-red-600 font-bold">
      限时特惠 | 距离优惠结束仅剩
      <count-down
        :time="53 * 60 * 1000"
        class="inline-block"
        @finish="isCountDown = true"
      />
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const isCountDown = ref(false)
</script>

<style lang="scss" scoped></style>
