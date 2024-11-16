import md5 from 'md5'
import { message } from '@/libs'
import { loginUser, getUserInfo, registerUser } from '@/api/sys'

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
    },

    // 存储用户信息
    setUserInfo(state, userInfo) {
      state.userInfo = {
        ...userInfo,
        avatar: 'http://lowcodedemo.top/logo.jpg'
      }
    }
  },
  actions: {
    // 登录 获取到的token 存储到vuex中
    async login(context, payload) {
      const { password } = payload
      const data = await loginUser({
        ...payload,
        password: password ? md5(password) : ''
      })
      context.commit('setToken', data.token)
      context.dispatch('getUserInfo')
    },

    // 注册用户
    async register(context, payload) {
      const { password } = payload
      return await registerUser({
        ...payload,
        password: password ? md5(password) : ''
      })
    },

    // 获取用户信息 存储用户信息
    async getUserInfo(context) {
      const data = await getUserInfo()
      context.commit('setUserInfo', data)
      message(
        'success',
        `欢迎回来 ${
          data.vipLevel
            ? '牛批的VIP' + data.vipLevel + '会员' + data.nickname
            : data.nickname
        }`,
        4000
      )
    },

    // 退出登录
    logout(context) {
      context.commit('setToken', '')
      context.commit('setUserInfo', {})
      // 退出登录之后，重新刷新下页面，因为对于前台项目而言，用户是否登录（是否为 VIP）看到的数据可能不同
      location.reload()
    }
  }
}
