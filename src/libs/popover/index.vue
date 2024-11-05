<template>
  <div class="relative" @mouseenter="onMouseenter" @mouseleave="onMouseleave">
    <div ref="referenceTarget">
      <slot name="reference" />
    </div>
    <transition name="slide">
      <div
        ref="contentTarget"
        v-show="isVisible"
        class="absolute p-1 z-20 bg-white border rounded-md"
        :style="contentStyle"
      >
        <slot />
      </div>
    </transition>
  </div>
</template>
<script>
// 定义显示位置枚举类型
const placementEnum = ['top-left', 'top-right', 'bottom-left', 'bottom-right']
</script>
<script setup>
import { nextTick, ref, watch } from 'vue'
// 控制弹出层内容的展示状态
const isVisible = ref(false)
// 定义引用元素和内容DOM
const referenceTarget = ref(null)
const contentTarget = ref(null)
// 定义离开气泡的时间隔
const DELAY_TIME = 200
let timer

const props = defineProps({
  placement: {
    type: String,
    default: 'bottom-left',
    validator: val => {
      const result = placementEnum.includes(val)
      if (!result) {
        throw new Error(`placement 必须是 ${placementEnum.join(',')}中的一个`)
      }
      return result
    }
  }
})

// 鼠标进入时，显示弹层
const onMouseenter = () => {
  isVisible.value = true
  if (timer) {
    clearTimeout(timer)
  }
}

// 鼠标离开时，隐藏弹层

const onMouseleave = () => {
  timer = setTimeout(() => {
    isVisible.value = false
    timer = null
  }, DELAY_TIME)
}

// 计算元素的尺寸
const getElementSize = el => {
  if (!el) return
  return {
    width: el.offsetWidth,
    height: el.offsetHeight
  }
}

// 气泡样式
const contentStyle = ref({
  top: 0,
  left: 0
})

// 展示的时候计算位置
// 1. 我们在使用watch监听isVisible的变化 && 获取dom  这时候如果使用的是v-if时候 那么dom还没有渲染出来
// 2. 我们可以使用nextTick  这个方法  他会在dom渲染完成之后执行
// 3. 如果使用的是v-show 那么dom就已经渲染出来了  我们可以直接使用
watch(isVisible, val => {
  if (!val) return
  nextTick(() => {
    switch (props.placement) {
      case 'top-left':
        contentStyle.value.top = 0
        contentStyle.value.left =
          -getElementSize(contentTarget.value).width + 'px'
        break
      case 'top-right':
        contentStyle.value.top = 0
        contentStyle.value.right =
          getElementSize(referenceTarget.value).width + 'px'
        break
      case 'bottom-left':
        contentStyle.value.top =
          getElementSize(referenceTarget.value).height + 'px'
        contentStyle.value.left =
          -getElementSize(contentTarget.value).width + 'px'
        break
      case 'bottom-right':
        contentStyle.value.top =
          getElementSize(referenceTarget.value).height + 'px'
        contentStyle.value.left =
          getElementSize(referenceTarget.value).width + 'px'
        break
      default:
        break
    }
  })
})
</script>

<style lang="scss" scoped>
.slide-enter-active,
.slide-leave-active {
  transition: opacity 0.3s transform 0.3s;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateX(20px);
}
</style>
