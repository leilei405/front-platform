import md5 from 'md5'
import { loginUser } from '@/api/sys'

export default {
  namespaced: true,
  state: () => ({
    userInfo: {},
    token: ''
  }),
  mutations: {
    // 存储token
    setToken(state, token) {
      state.token = token
    }
  },
  actions: {
    async login(context, payload) {
      const { password } = payload
      const data = await loginUser({
        ...payload,
        password: password ? md5(password) : ''
      })
      // 存储token
      context.commit('setToken', data.token)
    }
  }
}
