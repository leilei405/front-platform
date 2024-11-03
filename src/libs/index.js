import svgIcon from './svg-icon/index.vue'

export default {
  install(Vue) {
    Vue.component('svg-icon', svgIcon)
    // Vue.prototype.$svgIcon = svgIcon
  }
}
