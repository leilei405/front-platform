import lazy from './modules/lazy'

export default {
  install(Vue) {
    Vue.directive('lazy', lazy)
  }
}
