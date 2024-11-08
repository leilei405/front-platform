// 从 itemElement 中获取抽离出所有的imgElements
export const getImgElements = (itemElement = []) => {
  const imgElements = []
  itemElement.forEach(el => {
    imgElements.push(...el.getElementsByTagName('img'))
  })
  return imgElements
}

// 生成所有的图片链接数组
export const getAllImg = (imgElement = []) => {
  return imgElement.map(item => {
    return item.src
  })
}

// 监听图片数组加载完成
export const onComplateImgs = (imgs = []) => {
  const promiseAll = []
  imgs.forEach((img, index) => {
    promiseAll[index] = new Promise((resolve, reject) => {
      const imageObj = new Image()
      imageObj.src = img
      imageObj.onload = () => {
        resolve({
          img,
          index
        })
      }
    })
  })
  return Promise.all(promiseAll)
}

// 返回列高中最小的高度
export const getMinHeight = (columnHeights = {}) => {
  const columnHeightArr = Object.values(columnHeights)
  return Math.min(...columnHeightArr)
}

// 返回列高中最大的高度
export const getMaxHeight = (columnHeights = {}) => {
  const columnHeightArr = Object.values(columnHeights)
  return Math.max(...columnHeightArr)
}

// 返回列高对象中最小高度所在的列
export const getMinHeightColumn = (columnHeights = {}) => {
  const minHeight = getMinHeight(columnHeights)
  return Object.keys(columnHeights).find(
    key => columnHeights[key] === minHeight
  )
}
