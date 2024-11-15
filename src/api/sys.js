import request from '@/utils/request'

// 人类行为验证接口
export const getCaptcha = data => {
  return request({
    url: '/sys/captcha',
    method: 'post',
    data
  })
}

// 登录
export const loginUser = data => {
  return request({
    url: '/sys/login',
    method: 'post',
    data
  })
}

// 获取用户信息
export const getUserInfo = () => {
  return request({
    url: '/user/profile'
  })
}
