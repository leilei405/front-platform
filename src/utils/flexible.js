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

/**
 * 动态指定 rem 基准值，最大为 40px
 * 根据用户的屏幕宽度，进行一些计算，把计算出来的值设置成 rem 的单位
 * 1rem = 视口宽度 / 10
 */
export const useREM = () => {
  // 最大的字体大小
  const MAX_FONT_SIZE = 40
  // 监听 html 文档被解析完成事件
  document.addEventListener('DOMContentLoaded', () => {
    // 拿到 html 标签
    const html = document.querySelector('html')
    // 计算字体大小
    let fontSize = window.innerWidth / 10
    fontSize = fontSize > MAX_FONT_SIZE ? MAX_FONT_SIZE : fontSize
    // 赋值给 html 标签
    html.style.fontSize = fontSize + 'px'
  })
}
