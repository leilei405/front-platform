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
          <ItemImage @click="onImgDetail(item)" :data="item" :width="width" />
        </template>
      </waterfall>
      <transition
        :class="false"
        @before-enter="beforeEnter"
        @enter="enter"
        @leave="leave"
      >
        <PinsDetail v-if="isVisiblePins" :id="currentPins.id" />
      </transition>
    </infinite>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useStore } from 'vuex'
import gsap from 'gsap'
import { getImageList } from '@/api/pexels' // getData
import { isMobileTerminal } from '@/utils/flexible' //PC & 移动
import ItemImage from './item.vue' // 图片Item
import PinsDetail from '../../../pins/components/pins.vue' // 点击图片详情

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

// 监听SearchText 变化
watch(
  () => store.getters.searchText,
  val => {
    resetQuery({
      page: 1,
      searchText: val
    })
  }
)

// pins 图片详情相关
const currentPins = ref({}) // 当前pins
const isVisiblePins = ref(false) // 是否显示pins

/**
 * @description  当前点击的图片动画  进入前  开始进入  离开
 *
 */

const beforeEnter = el => {
  gsap.set(el, {
    scaleX: 0,
    scaleY: 0,
    transformOrigin: '0 0',
    translateX: currentPins.value.location.translateX,
    translateY: currentPins.value.location.translateY,
    opacity: 0
  })
}

const enter = el => {
  gsap.to(el, {
    scaleX: 1,
    scaleY: 1,
    translateX: 0,
    translateY: 0,
    opacity: 1,
    duration: 0.3,
    onComplete: done
  })
}

const leave = el => {
  gsap.to(el, {
    duration: 0.3,
    scaleX: 0,
    scaleY: 0,
    x: currentPins.value.location.translateX,
    y: currentPins.value.location.translateY,
    opacity: 0
  })
}
// 进入图片详情
const onImgDetail = item => {
  history.pushState(null, null, `/detail/${item.id}`)
  currentPins.value = item
  isVisiblePins.value = true
}
</script>

<style lang="scss" scoped></style>
