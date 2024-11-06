import { THEME_CONFIG } from '@/constants'

export default {
  namespaced: true,
  state: () => ({
    themeType: THEME_CONFIG[0].type
  }),
  mutations: {
    changeThemeType(state, newTheme) {
      state.themeType = newTheme
    }
  },
  actions: {
    changeThemeType({ commit }, newTheme) {
      commit('changeThemeType', newTheme)
    }
  }
}
