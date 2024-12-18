<template>
  <div
    class="h-full bg-zinc-200 dark:bg-zinc-800 duration-400 overflow-auto xl:pt-1"
  >
    <div
      class="relative max-w-screen-lg mx-auto bg-white dark:bg-zinc-900 duration-400 xl:rounded-sm xl:border-zinc-200 xl:dark:border-zinc-600 xl:border-[1px] xl:px-4 xl:py-2"
    >
      <!-- 移动端navbar -->
      <navbar sticky v-if="isMobileTerminal" :clickLeft="onNavbarLeftClick"
        >个人资料</navbar
      >

      <!-- PC 端 -->
      <div v-else class="text-lg font-bold text-center mb-4 dark:text-zinc-300">
        个人资料
      </div>

      <div class="h-full w-full px-1 pb-4 text-sm mt-2 xl:w-2/3 xl:pb-0">
        <!-- 头像 -->
        <div
          class="py-1 xl:absolute xl:right-[16%] xl:text-center flex flex-col items-center"
        >
          <span
            class="w-8 inline-block mb-2 font-bold text-sm dark:text-zinc-300 xl:block xl:mx-auto"
            >我的头像</span
          >

          <!-- 头像 -->
          <div
            @click="onAvatarClick"
            class="relative w-[80px] h-[80px] group xl:cursor-pointer xl:left-[50%] xl:translate-x-[-50%]"
          >
            <img
              class="rounded-[50%] w-full h-full xl:inline-block"
              v-lazy
              :src="$store.getters.userInfo.avatar"
              alt="avatar"
            />

            <div
              class="absolute top-0 rounded-[50%] w-full h-full bg-[rgba(0,0,0,.4)] hidden xl:group-hover:block"
            >
              <svg-icon
                name="change-header-image"
                class="w-2 h-2 m-auto mt-2"
              ></svg-icon>
              <div
                class="text-xs text-white dark:text-zinc-300 scale-90 mt-0.5"
              >
                点击更换头像
              </div>
            </div>
          </div>

          <!-- 隐藏域 -->
          <input
            v-show="false"
            ref="inputFileTarget"
            type="file"
            accept=".png, .jpeg, .jpg, .gif"
            @change="onFileImgChange"
          />
          <p class="mt-1 text-zinc-500 dark:text-zinc-400 text-xs xl:w-10">
            支持 jpg、png、jpeg 格式大小 5M 以内的图片
          </p>
        </div>

        <!-- 用户名 -->
        <div class="py-1 xl:flex xl:items-center xl:my-1">
          <span class="w-8 block mb-1 font-bold dark:text-zinc-300 xl:mb-0"
            >用户名</span
          >
          <m-input
            v-model="userInfo.nickname"
            class="w-full"
            type="text"
            max="20"
          ></m-input>
        </div>

        <!-- 职位 -->
        <div class="py-1 xl:flex xl:items-center xl:my-1">
          <span class="w-8 block mb-1 font-bold dark:text-zinc-300 xl:mb-0"
            >职位</span
          >
          <m-input
            v-model="userInfo.title"
            class="w-full"
            type="text"
          ></m-input>
        </div>

        <!-- 公司 -->
        <div class="py-1 xl:flex xl:items-center xl:my-1">
          <span class="w-8 block mb-1 font-bold dark:text-zinc-300 xl:mb-0"
            >公司</span
          >
          <m-input
            v-model="userInfo.company"
            class="w-full"
            type="text"
          ></m-input>
        </div>

        <!-- 个人主页 -->
        <div class="py-1 xl:flex xl:items-center xl:my-1">
          <span class="w-8 block mb-1 font-bold dark:text-zinc-300 xl:mb-0"
            >个人主页</span
          >
          <m-input
            v-model="userInfo.homePage"
            class="w-full"
            type="text"
          ></m-input>
        </div>

        <!-- 个人介绍 -->
        <div class="py-1 xl:flex xl:my-1">
          <span class="w-8 block mb-1 font-bold dark:text-zinc-300 xl:mb-0"
            >个人介绍</span
          >
          <m-input
            v-model="userInfo.introduction"
            class="w-full"
            type="textarea"
            max="50"
          ></m-input>
        </div>
        <m-button
          class="w-full mt-2 mb-4 dark:text-zinc-300 dark:bg-zinc-800 xl:w-[160px] xl:ml-[50%] xl:translate-x-[-50%]"
          :loading="loading"
          @click="onChangeProfile"
          >保存修改</m-button
        >
        <!-- 移动端退出登录 -->
        <m-button
          v-if="isMobileTerminal"
          class="w-full dark:text-zinc-300 dark:bg-zinc-800 xl:w-[160px] xl:ml-[50%] xl:translate-x-[-50%]"
          @click="onLogoutClick"
        >
          退出登录
        </m-button>
      </div>
    </div>

    <!-- PC 端 -->
    <m-dialog
      title="图像裁剪"
      v-model="isDialogVisible"
      v-if="!isMobileTerminal"
    >
      <UpdateAvatar :blob="currentBlob" @close="isDialogVisible = false" />
    </m-dialog>

    <!--  移动端 -->
    <popup
      v-model="isDialogVisible"
      :class="isDialogVisible ? 'h-screen p-1' : ''"
      v-else
    >
      <UpdateAvatar :blob="currentBlob" @close="isDialogVisible = false" />
    </popup>
  </div>
</template>

<script>
export default {
  name: 'profile'
}
</script>

<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { isMobileTerminal } from '@/utils/flexible'
import { confirm, message } from '@/libs'
import { updateUserInfo } from '@/api/sys'
import UpdateAvatar from './components/change-avatar.vue' // 裁剪头像组件

const router = useRouter()
const store = useStore()
const userInfo = ref(store.getters.userInfo)

const inputFileTarget = ref(null)
const loading = ref(false)
const isDialogVisible = ref(false)
const currentBlob = ref('')

// Mobile Back()
const onNavbarLeftClick = () => {
  store.commit('app/changeRouterType', 'back')
  router.back()
}

// 选中文件后的回调
const onFileImgChange = () => {
  // 获取选中的文件
  const file = inputFileTarget.value.files[0]
  const blob = URL.createObjectURL(file)
  currentBlob.value = blob
  isDialogVisible.value = true
}

// 监听Dialog 关闭
watch(isDialogVisible, val => {
  if (!val) {
    inputFileTarget.value.value = null
  }
})

const onAvatarClick = () => {
  inputFileTarget.value.click()
}

// 保存修改用户信息
const onChangeProfile = async () => {
  loading.value = true
  await updateUserInfo(userInfo.value)
  message('success', '用户信息修改成功')
  store.commit('user/setUserInfo', userInfo.value)
  loading.value = false
}

// Vuex本地数据的双向同步
// const changeStoreUserInfo = (key, val) => {
//   store.commit('user/setUserInfo', {
//     ...store.getters.userInfo,
//     [key]: val
//   })
// }

// 退出登录
const onLogoutClick = () => {
  confirm('确认退出登录吗？').then(() => {
    store.dispatch('user/logout')
    router.push('/login')
  })
}
</script>

<style lang="scss" scoped></style>
