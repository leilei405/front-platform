import { createStore } from 'vuex'
import getters from './getters'
import category from './modules/category'

const store = createStore({
  getters,
  modules: {
    // 注册模块
    category
  }
})

export default store
