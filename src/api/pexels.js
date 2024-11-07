import request from '@/utils/request'

// 获取图片列表
export function getImageList(params) {
  return request({
    url: '/pexels/list',
    method: 'get',
    params
  })
}
