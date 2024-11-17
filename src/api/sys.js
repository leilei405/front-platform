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

// 注册用户
export const registerUser = data => {
  return request({
    url: '/sys/register',
    method: 'post',
    data
  })
}

// 修改用户信息
export const updateUserInfo = data => {
  return request({
    url: '/user/profile',
    method: 'put',
    data
  })
}

// 获取OSS上传凭证
export const getOssToken = () => {
  return request({
    url: '/user/sts'
  })
}

// 获取支付数据
export const getVipPayData = () => {
  return request({
    url: '/user/vip/pay/list'
  })
}
