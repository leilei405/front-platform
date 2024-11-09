import request from '@/utils/request'

// 获取图片列表
export function getImageList(params) {
  return request({
    url: '/pexels/list',
    method: 'get',
    params
  })
}

// 搜索图片列表
export function getHintList(keyword) {
  return request({
    url: '/pexels/hint',
    params: {
      q: keyword
    }
  })
}
