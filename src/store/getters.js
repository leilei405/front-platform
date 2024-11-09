export default {
  categoryData: state => state.category.categoryData,
  themeType: state => state.theme.themeType,
  currentCategory: state => state.app.currentCategory, // 选中项
  // 选中的下标
  currentCategoryIndex: (state, getters) => {
    return getters.categoryData.findIndex(item => {
      return item.id === getters.currentCategory.id
    })
  }
}
