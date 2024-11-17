import { initCategoryList } from '@/constants'

export default {
  namespaced: true,
  state: () => ({
    currentCategory: initCategoryList,
    searchText: '',
    routerType: 'none' // 路由跳转类型
  }),
  mutations: {
    changeCurrentCategory(state, newCategory) {
      state.currentCategory = newCategory
    },
    changeSearchText(state, newSearchText) {
      state.searchText = newSearchText
    },

    // 修改路由跳转类型
    changeRouterType(state, newRouterType) {
      state.routerType = newRouterType
    }
  },
  actions: {}
}
