<template>
  <popover class="guide-account" placement="bottom-left">
    <template #reference>
      <div
        class="relative flex items-center p-0.5 rounded-sm cursor-pointer duration-200 outline-none hover:bg-zinc-100"
        v-if="$store.getters.token"
      >
        <!-- Profile Img -->
        <img
          class="h-3 w-3 cursor-pointer mr-2"
          :src="$store.getters.userInfo.avatar"
        />
        <!-- arrow -->
        <svg-icon
          class="h-1.5 w-1.5 ml-[-15px]"
          name="down-arrow"
          fillClass="fill-zinc-900 dark:fill-zinc-300"
        />
        <!-- vip -->
        <svg-icon
          v-if="$store.getters.userInfo.vipLevel"
          name="vip"
          class="h-1.5 w-1.5 absolute right-[15px] top-[24px]"
        />
      </div>
      <div v-else>
        <m-button
          class="guide-my"
          icon="profile"
          iconColor="#fff"
          @click="onToLogin"
        ></m-button>
      </div>
    </template>
    <div v-if="$store.getters.token" class="w-[140px] overflow-hidden">
      <div
        v-for="item in PROFILE_CONFIG"
        :key="item.id"
        @click="onItemClick(item)"
        class="flex items-center p-1 cursor-pointer rounded hover:bg-zinc-100/60 dark:hover:bg-zinc-800"
      >
        <svg-icon
          :name="item.icon"
          class="w-1.5 h-1.5 mr-1"
          fillClass="fill-zinc-900 dark:fill-zinc-300"
        />
        <span class="text-sm text-zinc-900 dark:text-zinc-100">{{
          item.title
        }}</span>
      </div>
    </div>
  </popover>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { PROFILE_CONFIG } from '@/constants'
import { confirm } from '@/libs'

const router = useRouter()
const store = useStore()

// 跳转到登录页
const onToLogin = () => {
  store.commit('app/changeRouterType', 'push')
  router.push('/login')
}

const onItemClick = item => {
  store.commit('app/changeRouterType', 'push')
  const actionMap = {
    // 个人资料
    [+PROFILE_CONFIG[0].id]: () => {
      router.push('/profile')
    },
    // 升级会员
    [+PROFILE_CONFIG[1].id]: () => {
      router.push('/member')
    },
    // 退出登录
    [+PROFILE_CONFIG[2].id]: () => {
      confirm('确认退出登录?').then(() => {
        console.log('退出登录')
        store.dispatch('user/logout')
      })
    }
  }[item.id]

  actionMap()
}
</script>

<style lang="scss" scoped></style>
