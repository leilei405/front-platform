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
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'
import { isMobileTerminal } from '@/utils/flexible'

defineProps({
  blob: {
    type: String,
    default: true
  }
})

const emits = defineEmits([EMITS_CLOSE])

//  初始化裁剪器
const imageTarget = ref(null)
let cropper = null

/**
 * @description 页面挂载完毕
 * @param { DOM,  ConfigObject } 图片DOM & 配置对象
 */
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
const loading = ref(false)
const onConfirmClick = () => {
  loading.value = true

  // 裁剪后生成新的图片地址
  cropper &&
    cropper.getCroppedCanvas().toBlob(blob => {
      console.log(URL.createObjectURL(blob))

      // emits('confirm', blob)
    })
  loading.value = false
}

//  关闭弹窗
const onClose = () => {
  emits(EMITS_CLOSE)
}
</script>

<style lang="scss" scoped></style>
