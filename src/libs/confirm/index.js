import { render, h } from 'vue'
import confirmComponent from './index.vue'
export const confirm = (
  title,
  content,
  confirmText = '确定',
  cancelText = '取消'
) => {
  //
  return new Promise((resolve, reject) => {
    if (title && !content) {
      content = title
      title = ''
    }

    // 关闭弹层
    const close = () => {
      render(null, document.body)
    }

    // 取消按钮事件
    const cancelHandler = () => {
      reject(new Error('cancel button click'))
    }

    // 确认按钮事件
    const confirmHandler = () => {
      resolve()
    }

    // 渲染弹层
    const vNode = h(confirmComponent, {
      title,
      content,
      confirmText,
      cancelText,
      close,
      cancelHandler,
      confirmHandler
    })

    render(vNode, document.body)
  })
}
