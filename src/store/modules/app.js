import { initCategoryList } from '@/constants'

export default {
  namespaced: true,
  state: () => ({
    currentCategory: initCategoryList,
    searchText: ''
  }),
  mutations: {
    changeCurrentCategory(state, newCategory) {
      state.currentCategory = newCategory
    },
    changeSearchText(state, newSearchText) {
      state.searchText = newSearchText
    }
  },
  actions: {}
}
