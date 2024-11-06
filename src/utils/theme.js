import { watch } from 'vue'
import store from '../store'

export default () => {
  watch(
    () => store.getters.themeType,
    newTheme => {
      let themeClassName = {
        'theme-light': 'light',
        'theme-dark': 'dark'
        // 后续可以添加更多主题
      }[newTheme]

      document.querySelector('html').className = themeClassName
    },
    { immediate: true }
  )
}
