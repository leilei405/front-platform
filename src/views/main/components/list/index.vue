<template>
  <div>
    <waterfall :data="imageList" nodeKey="id" :column="5" :preload="true">
      <template v-slot="{ item, width }">
        <ItemImage :data="item" :width="width" />
      </template>
    </waterfall>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { getImageList } from '@/api/pexels'
import ItemImage from './item.vue'

// 查询参数
const query = {
  page: 1,
  size: 10
}

// 获取图片列表
const imageList = ref([])
const getList = async () => {
  const res = await getImageList(query)
  imageList.value = res.list
}

getList()
</script>

<style lang="scss" scoped></style>
