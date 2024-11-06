import { ALL_CATEGORY, initCategoryList } from '@/constants'
import { getCategory } from '@/api/category'

export default {
  namespaced: true, // 开启命名空间
  state: () => {
    return {
      // navigation 导航栏数据闪烁解决
      // 1.categoryData 给一组初始数据
      // 2.让服务端获取数据 替换初始数据
      // 3.防止初始化数据太老 我们每次把 获取到的新数据 都作为下一次的初始化数据
      // 将每次从接口获取到的数据  进行缓存  在下次运行时 把缓存数据作为初始数据
      categoryData: initCategoryList
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
