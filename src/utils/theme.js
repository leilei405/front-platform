import { watch } from 'vue'
import store from '../store'

// 监听系统的主题变化，动态切换主题
// 主题切换的原理是通过修改html标签的class来实现的
let matchMedia
const watchSystemThemeChange = () => {
  if (matchMedia) return
  matchMedia = window.matchMedia('(prefers-color-scheme: dark)')
  matchMedia.onchange = () => {
    changeTheme('theme-system')
  }
}

// 变更主题change事件
const changeTheme = theme => {
  let themeClassName = {
    'theme-light': 'light',
    'theme-dark': 'dark',
    'theme-system': () => {
      watchSystemThemeChange()
      return matchMedia.matches ? 'dark' : 'light'
    }
  }[theme]
  if (typeof themeClassName === 'function') {
    themeClassName = themeClassName()
  }
  document.querySelector('html').className = themeClassName
}

export default () => {
  watch(
    () => store.getters.themeType,
    newTheme => changeTheme(newTheme),
    { immediate: true } // 进来立即执行一次
  )
}
