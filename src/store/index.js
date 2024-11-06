import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import getters from './getters'
import category from './modules/category'
import theme from './modules/theme'

const store = createStore({
  getters,
  modules: {
    // 注册模块
    category,
    theme
  },
  plugins: [
    createPersistedState({
      // 本地存储插件
      key: 'front-platform',
      paths: ['category', 'theme']
    })
  ]
})

export default store
