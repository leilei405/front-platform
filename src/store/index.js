import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import getters from './getters'
import category from './modules/category'

const store = createStore({
  getters,
  modules: {
    // 注册模块
    category
  },
  plugins: [
    createPersistedState({
      // 本地存储插件
      key: 'category',
      paths: ['category']
    })
  ]
})

export default store
