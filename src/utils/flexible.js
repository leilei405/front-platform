import { computed } from 'vue'
import { useWindowSize } from '@vueuse/core'
import { PC_DEVICE_WIDTH } from '@/constants'

/**
 * 判断当前是否为移动端设备
 * 判断依据 屏幕宽度是否小于一个指定宽度 1280
 * @returns {boolean}
 */
export const isMobileTerminal = computed(() => {
  // width 是一个响应式数据 通过.value 拿到数据
  return useWindowSize().width.value < PC_DEVICE_WIDTH
})
