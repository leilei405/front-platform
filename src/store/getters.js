export default {
  categoryData: state => state.category.categoryData, // 分类数据
  themeType: state => state.theme.themeType, // 主题类型
  currentCategory: state => state.app.currentCategory, // 选中项
  // 选中的下标
  currentCategoryIndex: (state, getters) => {
    return getters.categoryData.findIndex(item => {
      return item.id === getters.currentCategory.id
    })
  },
  historyList: state => state.search.historyList, // 历史搜索记录

  searchText: state => state.app.searchText // 搜索文本
}
