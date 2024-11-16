<template>
  <div class="overflow-auto relative flex flex-col items-center">
    <svg-icon
      v-if="isMobileTerminal"
      name="close"
      class="w-3 h-3 p-0.5 m-1 ml-auto"
      fillClass="fill-zinc-900 dark:fill-zinc-200 "
      @click="onClose"
    ></svg-icon>

    <img :src="blob" ref="imageTarget" alt="" />

    <m-button
      :loading="loading"
      class="mt-4 w-[80%] xl:w-1/2"
      @click="onConfirmClick"
      >确定</m-button
    >
  </div>
</template>

<script>
const EMITS_CLOSE = 'close'

const mobileOptions = {
  // 将裁剪框限制在画布的大小
  viewMode: 1,
  // 移动画布，裁剪框不动
  dragMode: 'move',
  // 裁剪框固定纵横比：1:1
  aspectRatio: 1,
  // 裁剪框不可移动
  cropBoxMovable: false,
  // 不可调整裁剪框大小
  cropBoxResizable: false
}

const pcOptions = {
  aspectRatio: 1
}
</script>

<script setup>
import { onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'
import { isMobileTerminal } from '@/utils/flexible'
import { updateUserInfo } from '@/api/sys'
import { getOssClient } from '@/utils/sts'
import { message } from '@/libs'

defineProps({
  blob: {
    type: String,
    default: true
  }
})

const store = useStore()

const loading = ref(false)

const emits = defineEmits([EMITS_CLOSE])

/**
 * @description OSS 上传
 * @param { File } 图片文件
 */
let ossClient = null
const putObjectToOSS = async file => {
  if (!ossClient) {
    ossClient = await getOssClient()
  }

  try {
    const accept = file.type.split('/')[1]
    const fileName = `${
      store.getters.userInfo.username
    }/lucky_${Date.now()}.${accept}`

    // 文件存放路径
    const result = await ossClient.put(`images/${fileName}`, file)
    onUpdateAvatar(result.url)
  } catch (error) {
    message('error', `上传失败，请重试!!!${error}`)
  }
}

/**
 * @description 完成头像的更新操作
 * @param { String } 裁剪后的图片地址
 */
const onUpdateAvatar = async avatarUrl => {
  // 1. 发送请求 修改用户头像
  store.commit('user/setUserInfo', {
    ...store.getters.userInfo,
    avatar: avatarUrl
  })
  // 2. 发送请求 修改用户信息
  await updateUserInfo(store.getters.userInfo)
  message('success', '头像更新成功')
  // 3. 关闭弹窗
  loading.value = false
  onClose()
}

/**
 * @description 页面挂载完毕  初始化裁剪器
 * @param { DOM,  ConfigObject } 图片DOM & 配置对象
 */
const imageTarget = ref(null)
let cropper = null
onMounted(() => {
  cropper = new Cropper(
    imageTarget.value,
    isMobileTerminal ? mobileOptions : pcOptions
  )
})

/**
 * @description 确定按钮点击事件
 * @param { String } 裁剪后的图片地址
 */
const onConfirmClick = () => {
  loading.value = true

  // 裁剪后生成新的图片地址
  cropper &&
    cropper.getCroppedCanvas().toBlob(blob => {
      putObjectToOSS(blob)
    })
  loading.value = false
}

//  关闭弹窗
const onClose = () => {
  emits(EMITS_CLOSE)
}
</script>

<style lang="scss" scoped></style>
