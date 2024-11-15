import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import getters from './getters'
import category from './modules/category'
import theme from './modules/theme'
import app from './modules/app'
import searchHistory from './modules/search' // 搜索历史记录
import user from './modules/user' // 用户信息

const store = createStore({
  getters,
  modules: {
    // 注册模块
    category,
    theme,
    app,
    search: searchHistory,
    user
  },
  plugins: [
    createPersistedState({
      // 本地存储插件
      key: 'front-platform',
      paths: ['category', 'theme', 'search', 'user']
    })
  ]
})

export default store
