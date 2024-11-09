// 全局指令注册
export default {
  async install(Vue) {
    const directives = import.meta.globEager('./modules/*.js')
    for (const [key, value] of Object.entries(directives)) {
      const arr = key.split('/')
      const name = arr[arr.length - 1].replace('.js', '')
      Vue.directives(name, value.default)
    }
  }
}
