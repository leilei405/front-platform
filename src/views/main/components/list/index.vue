<template>
  <div>
    <waterfall
      :data="imageList"
      nodeKey="id"
      :column="isMobileTerminal ? 2 : 5"
      :preload="true"
      class="px-1 w-full"
    >
      <template v-slot="{ item, width }">
        <ItemImage :data="item" :width="width" />
      </template>
    </waterfall>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { getImageList } from '@/api/pexels'
import { isMobileTerminal } from '@/utils/flexible'
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
