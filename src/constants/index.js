/** 指定PC 设备的宽度 */
export const PC_DEVICE_WIDTH = 1280

// 类目数据
export const ALL_CATEGORY = {
  id: 'all',
  name: '全部'
}

export const initCategoryList = [
  ALL_CATEGORY,
  {
    id: 'web_app_icon',
    name: 'UI/UX',
    col: 1,
    urlname: 'web_app_icon'
  },
  {
    id: 'design',
    name: '平面',
    col: 1,
    urlname: 'design'
  },
  {
    id: 'illustration',
    name: '插画/漫画',
    col: 1,
    urlname: 'illustration'
  },
  {
    id: 'photography',
    name: '摄影',
    col: 2,
    urlname: 'photography'
  },
  {
    id: 'games',
    name: '游戏',
    urlname: 'games'
  },
  {
    id: 'anime',
    name: '动漫',
    urlname: 'anime'
  },
  {
    id: 'industrial_design',
    name: '工业设计',
    col: 2,
    urlname: 'industrial_design'
  },
  {
    id: 'architecture',
    name: '建筑设计',
    urlname: 'architecture'
  },
  {
    id: 'art',
    name: '人文艺术',
    urlname: 'art'
  },
  {
    id: 'home',
    name: '家居/家装',
    col: 1,
    urlname: 'home'
  }
]

// 主题项配置
export const THEME_CONFIG = [
  {
    id: '0',
    type: 'theme-light',
    icon: 'theme-light',
    name: '极简白'
  },
  {
    id: '1',
    type: 'theme-dark',
    icon: 'theme-dark',
    name: '极夜黑'
  },
  {
    id: '2',
    type: 'theme-system',
    icon: 'theme-system',
    name: '跟随系统'
  }
]

// Profile页面配置
export const PROFILE_CONFIG = [
  {
    id: '0',
    path: 'profile',
    icon: 'profile',
    title: '个人资料'
  },
  {
    id: '1',
    path: '/member',
    icon: 'vip-profile',
    title: '升级VIP'
  },
  {
    id: '2',
    path: '',
    icon: 'logout',
    title: '退出登录'
  }
]
