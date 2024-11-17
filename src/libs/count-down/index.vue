<template>
  <div>
    <slot>
      <p class="text-sm">{{ formatTime }}</p>
    </slot>
  </div>
</template>

<script>
const EMITS_FINISH = 'finish' // 倒计时结束
const EMITS_CHANGE = 'change' // 倒计时改变
const INTERVAL_COUNT = 1000 // 倒计时间隔时间
</script>
<script setup>
import { computed, onUnmounted, watch, ref } from 'vue'
import dayjs from './utils'

const props = defineProps({
  time: {
    type: Number,
    required: true
  },
  format: {
    type: String,
    default: 'HH:mm:ss'
  }
})

const emits = defineEmits([EMITS_FINISH, EMITS_CHANGE])

// 开始倒计时
const start = () => {
  clear()
  interval = setInterval(() => {
    durationFn()
  }, INTERVAL_COUNT)
}

// 倒计时执行
const duration = ref(0)
const durationFn = () => {
  duration.value -= INTERVAL_COUNT
  emits(EMITS_CHANGE)

  if (duration.value <= 0) {
    duration.value = 0
    emits(EMITS_FINISH)
    clear()
  }
}

// 格式化时间
const formatTime = computed(() => {
  return dayjs.duration(duration.value).format(props.format)
})

// 清理倒计时
let interval = null
const clear = () => {
  if (!interval) {
    clearInterval(interval)
  }
}

// time变化 开始倒计时
watch(
  () => props.time,
  val => {
    duration.value = val
    start()
  },
  { immediate: true }
)

// 组件销毁时 清理倒计时
onUnmounted(() => {
  clear()
})
</script>

<style lang="scss" scoped></style>
