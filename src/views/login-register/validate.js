/**
 * 用户名验证
 * @param {value} 表单值
 * @return {Boolean}
 */
export const validateUserName = value => {
  if (!value) {
    return '用户名为必填的'
  }

  if (value.length < 3 || value.length > 12) {
    return '用户名长度为3-16个字符'
  }

  return true
}

/**
 * 密码验证
 * @param {value} 表单值
 * @return {Boolean}
 */
export const validatePassword = value => {
  if (!value) {
    return '密码为必填的'
  }

  if (value.length < 6 || value.length > 16) {
    return '密码长度为6-16个字符'
  }

  return true
}

/**
 * 确认密码的二次验证
 * @param {value, password} 表单值
 * @return {Boolean}
 */

export const validateConfirmPassword = (value, password) => {
  if (!value) {
    return '确认密码为必填的'
  }

  if (value !== password[0]) {
    return '两次密码输入不一致'
  }

  return true
}
