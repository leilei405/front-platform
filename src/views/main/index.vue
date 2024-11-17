<template>
  <div
    ref="containerTarget"
    class="h-full overflow-auto bg-white dark:bg-zinc-800 duration-500 scrollbar-thin scrollbar-thumb-transparent xl:scrollbar-thumb-zinc-200 xl:dark:scrollbar-thumb-zinc-900 scrollbar-track-transparent"
  >
    <Navigation />
    <div class="max-w-screen-xl mx-auto relative m-1 xl:mt-4">
      <ImageList />
    </div>

    <!--  移动端TabBar -->
    <trigger-menu
      v-if="isMobileTerminal"
      class="fixed bottom-6 m-auto left-0 right-0 w-[220px]"
    >
      <trigger-menu-item
        class=""
        icon="home"
        iconClass="fill-zinc-900 dark:fill-zinc-200"
        >首页</trigger-menu-item
      >

      <trigger-menu-item
        v-if="$store.getters.token"
        icon="vip"
        iconClass="fill-zinc-400 dark:fill-zinc-500"
        textClass="text-zinc-400 dark:fill-zinc-500"
        @click="onVipClick"
        >VIP</trigger-menu-item
      >

      <trigger-menu-item
        icon="profile"
        iconClass="fill-zinc-400 dark:fill-zinc-500"
        textClass="text-zinc-400 dark:fill-zinc-500"
        @click="onProfileClick"
        >{{ $store.getters.token ? '我的' : '去登录' }}</trigger-menu-item
      >
    </trigger-menu>
  </div>
</template>

<script>
export default {
  name: 'home'
}
</script>

<script setup>
import { ref, onActivated } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { useScroll } from '@vueuse/core'
import { isMobileTerminal } from '@/utils/flexible'
import Navigation from './components/navigation/index.vue'
import ImageList from './components/list/index.vue'

const router = useRouter()
const store = useStore()

// 点击
const onVipClick = () => {
  // 跳转到 VIP 页面
}

const onProfileClick = () => {
  store.commit('app/changeRouterType', 'push')
  // 跳转到 登录 页面
  if (!store.getters.token) {
    router.push('/login')
  } else {
    router.push('/profile')
  }
}

// 记录页面滚动位置
const containerTarget = ref(null)
const { y: containerScrollY } = useScroll(containerTarget)
onActivated(() => {
  if (!containerTarget.value) {
    return
  }
  containerTarget.value.scrollTop = containerScrollY.value
})
</script>

<style lang="scss" scoped></style>
