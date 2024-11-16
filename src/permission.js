// 页面权限控制中心
import router from '@/router'
import store from '@/store'
import { message } from '@/libs'

router.beforeEach(to => {
  if (!to.meta.user) {
    return
  }

  if (store.getters.token) {
    return true
  }

  message('warn', '没有登录哦、请先登录再尝试查看！！！')
  return '/'
})
