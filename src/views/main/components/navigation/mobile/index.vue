<template>
  <div class="bg-white sticky top-0 left-0 z-10">
    <ul
      ref="ulTarget"
      class="relative flex overflow-x-auto p-1 text-xs text-zinc-600 overflow-hidden"
    >
      <!-- 黑色滑块 -->
      <li
        ref="sliderTarget"
        :style="sliderStyle"
        class="absolute h-[22px] bg-zinc-900 rounded-lg duration-200"
      ></li>

      <!-- 右侧菜单按钮 -->
      <li
        class="fixed top-0 right-[-1px] h-4 px-1 flex items-center bg-white z-20 shadow-l-white"
      >
        <svg-icon class="w-1.5 h-1.5" name="hamburger"></svg-icon>
      </li>

      <!-- 每一个类目 -->
      <li
        v-for="(item, index) in data"
        :key="item.id"
        :ref="setItemRef"
        :class="{ 'text-zinc-100': selectedCurrentIndex === index }"
        @click="handleClick(index)"
        class="shrink-0 px-1.5 py-0.5 z-10 duration-200 last:mr-4"
      >
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onBeforeUpdate, watch } from 'vue'
import { useScroll } from '@vueuse/core'
defineProps({
  data: {
    type: Array,
    required: true
  }
})

// 滑块样式定义
const sliderStyle = ref({
  transform: 'translateX(0px)',
  width: '60px'
})

// 选中的类目下标
const selectedCurrentIndex = ref(0)

// 获取所有的item元素
// vue3 中要在v-for 下循环的多个DOM 元素，ref指定的必须是一个函数
let itemRefs = []
const setItemRef = el => {
  if (el) {
    itemRefs.push(el)
  }
}

// 数据改变之后 DOM更新之前
onBeforeUpdate(() => {
  itemRefs = []
})

// 获取ul元素 ul 横向滚动的距离
const ulTarget = ref(null)
const { x: ulScrollLeft } = useScroll(ulTarget)

// 监听ul滚动的距离
watch(selectedCurrentIndex, val => {
  const { left, width } = itemRefs[val].getBoundingClientRect()
  // const res = itemRefs[val].getBoundingClientRect()

  sliderStyle.value = {
    transform: `translateX(${ulScrollLeft.value + left - 10}px)`,
    width: width + 'px'
  }
})

// 点击类目 切换选中的下标
const handleClick = index => {
  selectedCurrentIndex.value = index
}
</script>

<style lang="scss" scoped></style>
