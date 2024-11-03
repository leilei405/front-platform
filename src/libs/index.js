import svgIcon from './svg-icon/index.vue'
import popup from './popup/index.vue'

export default {
  /**
   * 安装插件到 Vue 实例中
   * @param {Vue} Vue - Vue 构造函数
   */
  install(Vue) {
    Vue.component('svg-icon', svgIcon)
    Vue.component('popup', popup)
  }
}
