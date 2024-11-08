<template>
  <div
    class="relative"
    ref="containerTarget"
    :style="{
      height: containerHeight + 'px'
    }"
  >
    <!-- 数据展示 -->
    <template v-if="columnWidth && data.length">
      <div
        v-for="(item, index) in data"
        :key="nodeKey ? item[nodeKey] : index"
        class="m-waterfall-item absolute duration-300"
        :style="{
          width: columnWidth + 'px',
          left: item && item._style && item._style.left + 'px',
          top: item && item._style && item._style.top + 'px'
        }"
      >
        <slot :item="item" :width="columnWidth" :index="index" />
      </div>
    </template>
    <!-- loading -->
    <div v-else>loading</div>
  </div>
</template>

<script setup>
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import { getAllImg, getImgElements, onComplateImgs } from './utils'

const props = defineProps({
  // 数据源
  data: {
    type: Array,
    required: true
  },
  // 唯一标识key
  nodeKey: {
    type: String
  },
  // 展示几列
  column: {
    default: 2,
    type: Number
  },
  // 列间距
  columnSpacing: {
    default: 20,
    type: Number
  },
  // 行间距
  rowSpacing: {
    default: 20,
    type: Number
  },
  // 是否需要进行图片预读取
  preload: {
    type: Boolean,
    default: true
  }
})

// 容器高度
const containerHeight = ref(0) // 容器高度 表示最高一列的高度
const columnHeightObj = ref({}) // 记录每列高度的对象  key: 列号 val: 列高度
// 构建每列高度的对象
const useColumnHeightObj = () => {
  columnHeightObj.value = {}
  for (let i = 0; i < props.column; i++) {
    columnHeightObj.value[i] = 0
  }
}

const containerTarget = ref(null) // 容器实例
const containerWidth = ref(0) // 容器总宽度 (不包含 padding,margin,border )
const containerLeft = ref(0) // 左边距 计算每个元素 的 left
// 计算容器宽度
const useContainerWidth = () => {
  const { paddingLeft, paddingRight } = getComputedStyle(
    containerTarget.value,
    null
  )

  containerLeft.value = parseFloat(paddingLeft) // 容器左边距
  containerWidth.value =
    containerTarget.value.offsetWidth -
    parseFloat(paddingLeft) -
    parseFloat(paddingRight)
}

const columnWidth = ref(0) // 列宽 计算每个元素 的 width\
// 列间距的合计
const columnSpacingTotal = computed(() => {
  return props.columnSpacing * (props.column - 1)
})
// 计算列宽
const useColumnWidth = () => {
  useContainerWidth()
  columnWidth.value =
    (containerWidth.value - columnSpacingTotal.value) / props.column
}

onMounted(() => {
  useColumnWidth()
  console.log(columnWidth.value)
})

// 需要图片预加载情况
let itemHeights = []
const waitImgComplate = () => {
  itemHeights = []
  let itemElements = [...document.getElementsByClassName('m-waterfall-item')] // 获取所有的item元素
  const imgElements = getImgElements(itemElements) //
  const allImgs = getAllImg(imgElements)
  console.log(allImgs, '===allImgs===')
  onComplateImgs(allImgs).then(() => {
    itemElements.forEach(el => {
      itemHeights.push(el.offsetHeight)
    })
    useItemLocation()
  })
}

// 不需要图片预加载情况
const useItemHeight = () => {
  itemHeights = []
  let itemElements = [...document.getElementsByClassName('m-waterfall-item')] // 获取所有的item元素
  itemElements.forEach(el => {
    itemHeights.push(el.offsetHeight)
  })
  useItemLocation()
}

const useItemLocation = () => {
  console.log(itemHeights, '===itemHeights===')
}

// 触发计算
watch(
  () => props.data,
  () => {
    nextTick(() => {
      if (props.preload) {
        waitImgComplate()
      } else {
        useItemHeight()
      }
    })
  },
  {
    deep: true,
    immediate: true
  }
)
</script>

<style lang="scss" scoped></style>
