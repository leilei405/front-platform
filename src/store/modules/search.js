// 搜索
export default {
  namespaced: true,
  state: () => ({
    historyList: []
  }),
  mutations: {
    // 新增历史记录
    createHistory(state, newHistory) {
      const isFindIndex = state.historyList.findIndex(
        item => item === newHistory
      )
      if (isFindIndex !== -1) {
        state.historyList.splice(isFindIndex, 1)
      } else {
        state.historyList.unshift(newHistory)
      }
    },
    // 清空单个历史记录
    clearByIdHistory(state, index) {
      state.historyList.splice(index, 1)
    },

    // 清空所有历史记录
    clearAllHistory(state) {
      state.historyList = []
    }
  },
  actions: {}
}
