import { initCategoryList } from '@/constants'

export default {
  namespaced: true,
  state: () => ({
    currentCategory: initCategoryList
  }),
  mutations: {
    changeCurrentCategory(state, newCategory) {
      state.currentCategory = newCategory
    }
  },
  actions: {}
}
