<template>
  <div>
    <infinite v-model="isLoading" :isFinished="isFinished" @onload="getList">
      <waterfall
        :data="imageList"
        nodeKey="id"
        :column="isMobileTerminal ? 2 : 5"
        :preload="false"
        class="px-1 w-full"
      >
        <template v-slot="{ item, width }">
          <ItemImage :data="item" :width="width" />
        </template>
      </waterfall>
    </infinite>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useStore } from 'vuex'
import { getImageList } from '@/api/pexels' // getData
import { isMobileTerminal } from '@/utils/flexible' //PC & 移动
import ItemImage from './item.vue'

// 查询参数
let query = {
  page: 1,
  size: 20
}

const store = useStore()

const imageList = ref([]) // 获取图片列表
const isLoading = ref(false) // 是否加载中
const isFinished = ref(false) // 是否加载完成
const getList = async () => {
  if (isFinished.value) return

  if (imageList.value.length) {
    query.page++
  }

  const res = await getImageList(query)

  if (query.page === 1) {
    imageList.value = res.list
  } else {
    imageList.value = imageList.value.concat(res.list)
  }

  if (imageList.value.length === res.total) {
    isFinished.value = true
  }

  isLoading.value = false
}

getList()

// 修改query 重新发起请求
const resetQuery = newQuery => {
  query = { ...query, ...newQuery }
  isFinished.value = false
  imageList.value = []
}

watch(
  () => store.getters.currentCategory,
  currentCategory => {
    resetQuery({
      page: 1,
      categoryId: currentCategory.id
    })
  }
)
</script>

<style lang="scss" scoped></style>
