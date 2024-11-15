import axios from 'axios'
import store from '@/store'

const env = import.meta.env.VITE_BASE_API

export default config => {
  // 1.创建axios的实例
  const instance = axios.create({
    baseURL: env,
    timeout: 5000
  })

  // 2.axios的拦截器
  // 2.1.请求拦截的作用
  instance.interceptors.request.use(
    config => {
      // 1.比如config中的一些信息不符合服务器的要求
      // 2.比如每次发送网络请求时，都希望在界面中显示一个请求的图标
      // 3.某些网络请求（比如登录（token）），必须携带一些特殊的信息
      // 如果token存在，注入token
      if (store.getters.token) {
        config.headers.Authorization = `Bearer ${store.getters.token}`
      }

      return config
    },
    err => {
      console.log(err)
    }
  )

  // 2.2.响应拦截
  instance.interceptors.response.use(
    result => {
      const { success, message, data, code } = result.data
      if (success && +code === 200) {
        return data
      }
      return Promise.reject(new Error(message))
    },
    err => {
      // 处理token超时问题
      if (err.response && err.response.data && err.response.data.code === 401) {
        store.dispatch('user/logout')
      }
      return Promise.reject(err)
    }
  )

  // 3.发送真正的网络请求
  return instance(config)
}
