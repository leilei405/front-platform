<template>
  <div>
    <slot />
    <div ref="loadingTarget" class="h-6 py-4">
      <svg-icon
        v-show="loading"
        name="infinite-load"
        class="w-4 h-4 mx-auto animate-spin"
      />
      <p v-if="isFinished" class="text-center text-base text-zinc-400">
        别拉了，没数据了喔.....
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useVModel, useIntersectionObserver } from '@vueuse/core'
const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  isFinished: {
    type: Boolean,
    required: true
  }
})

const emits = defineEmits(['onload', 'update:modelValue'])

const loading = useVModel(props)

const loadingTarget = ref(null) // 滚动的元素
const targetIsIntersecting = ref(false) // 记录前端是否在底部
useIntersectionObserver(loadingTarget, ([{ isIntersecting }]) => {
  targetIsIntersecting.value = isIntersecting
  emitLoad()
})

// load 事件
const emitLoad = () => {
  // 在可视区域内 && 不在加载中 && 没有加载完成
  if (targetIsIntersecting.value && !loading.value && !props.isFinished) {
    loading.value = true
    emits('onload')
  }
}

// loading 状态变化
watch(loading, () => {
  setTimeout(() => {
    emitLoad()
  }, 200)
})
</script>

<style lang="scss" scoped></style>
