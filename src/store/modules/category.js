import { ALL_CATEGORY } from '@/constants'
import { getCategory } from '@/api/category'

export default {
  namespaced: true, // 开启命名空间
  state: () => {
    return {
      categoryData: [ALL_CATEGORY]
    }
  },

  mutations: {
    setCategoryData(state, nreState) {
      state.categoryData = [ALL_CATEGORY, ...nreState]
    }
  },

  actions: {
    async useCategoryData(context) {
      const { categorys } = await getCategory()
      context.commit('setCategoryData', categorys)
    }
  }
}
