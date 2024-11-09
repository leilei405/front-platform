// 全局指令注册
export default {
  async install(app) {
    const directives = import.meta.glob('./modules/*.js')
    for (const [key, value] of Object.entries(directives)) {
      // vite5.0 后的写法
      const module = await value()
      const arr = key.split('/')
      const name = arr[arr.length - 1].replace('.js', '')
      app.directive(name, module.default)
    }
  }
}
