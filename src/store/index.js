import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import getters from './getters'
import category from './modules/category'
import theme from './modules/theme'
import app from './modules/app'
import searchHistory from './modules/search' // 搜索历史记录

const store = createStore({
  getters,
  modules: {
    // 注册模块
    category,
    theme,
    app,
    search: searchHistory
  },
  plugins: [
    createPersistedState({
      // 本地存储插件
      key: 'front-platform',
      paths: ['category', 'theme', 'search']
    })
  ]
})

export default store
