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

// 获取推荐主题
export const getThemes = () => {
  return request({
    url: '/pexels/themes'
  })
}

// 获取指定图片数据
export const getImageDetail = id => {
  return request({
    url: `/pexels/${id}`
  })
}
