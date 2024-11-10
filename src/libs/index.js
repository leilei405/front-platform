import { defineAsyncComponent } from 'vue'
export { confirm } from './confirm'

export default {
  /**
   * 安装插件到 Vue 实例中
   * @param {Vue} Vue - Vue 构造函数
   */
  install(Vue) {
    // 1. 获取当前路径下所有文件夹中的index.vue
    const components = import.meta.glob('./*/index.vue')

    // 2. 循环遍历 将所有组件注册到Vue实例中
    for (const key in components) {
      // 2.1 获取组件名称
      const componentName = key.replace('./', '').split('/')[0]

      // 2.2 获取组件
      const component = defineAsyncComponent(components[key])

      // 3. 注册组件
      Vue.component(componentName, component)
    }
  }
}
