import request from '@/utils/request'

export const getCaptcha = data => {
  return request({
    url: '/sys/captcha',
    method: 'post',
    data
  })
}
