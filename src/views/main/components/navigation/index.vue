<template>
  <div>
    <pc-navigation v-if="!isMobileTerminal" :data="categoryData" />
    <mobile-navigation v-else :data="categoryData" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { isMobileTerminal } from '@/utils/flexible'
import pcNavigation from './pc/index.vue'
import mobileNavigation from './mobile/index.vue'
import { getCategory } from '@/api/category'

const categoryData = ref([])

// 获取分类数据
const getCategoryData = async () => {
  const { categorys } = await getCategory()
  categoryData.value = categorys
}

getCategoryData()
</script>

<style lang="scss" scoped></style>
