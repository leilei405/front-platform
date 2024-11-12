<template>
  <div class="fixed bottom-10 right-6">
    <!-- 引导 -->
    <div
      class="guide-start w-4 h-4 mb-1 bg-white dark:bg-zinc-900 border dark:border-0 border-zinc-200 rounded-full flex justify-center items-center cursor-pointer"
      @click="startGuide"
    >
      <svg-icon
        name="guide"
        class="w-2 h-2"
        fillClass=" fill-zinc-900 dark:fill-zinc-200 group-hover:fill-main"
      ></svg-icon>
    </div>

    <!-- 反馈 -->
    <popover class="flex items-center guide-feedback" placement="top-left">
      <template #reference>
        <div
          class="w-4 h-4 bg-white dark:bg-zinc-900 border dark:border-zinc-200 rounded-full flex justify-center items-center cursor-pointer duration-200"
        >
          <svg-icon
            name="feedback"
            class="w-2 h-2"
            fillClass=" fill-zinc-900 dark:fill-zinc-200 group-hover:fill-main"
          ></svg-icon>
        </div>
      </template>
      <div class="w-[140px] overflow-hidden">
        <div
          class="flex items-center justify-evenly p-1 cursor-pointer rounded hover:bg-zinc-100/60 dark:hover:bg-zinc-800"
        >
          <svg-icon
            name="feedback"
            class="w-1.5 h-1.5"
            fillClass=" fill-zinc-900 dark:fill-zinc-200 group-hover:fill-main"
          ></svg-icon>
          <span class="text-zinc-800 dark:text-zinc-300 text-sm">立即吐槽</span>
        </div>
      </div>
    </popover>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { driver } from 'driver.js'
import 'driver.js/dist/driver.css'

const guideInfo = [
  {
    element: '.guide-home',
    popover: {
      title: '欢迎使用',
      description:
        '这是一个图片管理系统，你可以在这里上传、管理、分享你的图片。点击可返回首页'
    }
  },
  // 图片搜索
  {
    element: '.guide-search',
    popover: {
      title: '图片搜索',
      description: '你可以在这里搜索你想要的图片。'
    }
  },
  // 图片风格
  {
    element: '.guide-theme',
    popover: {
      title: '图片风格',
      description: '你可以在这里选择你想要的图片风格。',
      position: 'left'
    }
  },
  // 账户管理
  {
    element: '.guide-account',
    popover: {
      title: '账户管理',
      description: '你可以在这里管理你的账户。',
      position: 'left'
    }
  },
  // 引导
  {
    element: '.guide-start',
    popover: {
      title: '引导',
      description: '你可以在这里开启引导。',
      position: 'left'
    }
  },
  // 反馈
  {
    element: '.guide-feedback',
    popover: {
      title: '反馈',
      description: '如果你有任何问题或者建议，欢迎反馈给我们。',
      position: 'left'
    }
  }
]

const driverObj = driver({
  showProgress: false,
  opacity: 0.8,
  closeBtnText: '关闭',
  doneBtnText: '完成',
  nextBtnText: '下一步',
  prevBtnText: '上一步',
  allowClose: false,
  steps: guideInfo
})

onMounted(() => {
  // 暂时先不开启引导
  driverObj.drive()
})

const startGuide = () => {
  driverObj.drive()
}
</script>

<style lang="scss" scoped></style>
