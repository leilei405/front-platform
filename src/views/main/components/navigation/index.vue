<template>
  <div>
    <pc-navigation v-if="!isMobileTerminal" />
    <mobile-navigation v-else />
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
import { isMobileTerminal } from '@/utils/flexible'
import pcNavigation from './pc/index.vue'
import mobileNavigation from './mobile/index.vue'

// 获取分类数据
const store = useStore()
store.dispatch('category/useCategoryData')
</script>

<style lang="scss" scoped></style>
