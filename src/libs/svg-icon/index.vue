<template>
  <svg aria-hidden="true">
    <use :xlink:href="symbolId" :class="fillClass" :fill="color" />
  </svg>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  color: {
    type: String
  },
  fillClass: {
    type: String
  }
})

// 真实显示的svg图标  例如：#icon-xxx  对应svg文件中的id为icon-xxx的svg图标
const symbolId = computed(() => `#icon-${props.name}`)
</script>

<style lang="scss" scoped></style>
