<template>
  <div class="h-full bg-zinc-200 dark:bg-zinc-800 duration-400 xl:pt-1">
    <div
      class="max-w-screen-lg mx-auto bg-white dark:bg-zinc-900 duration-400 xl:rounded-sm xl:border-zinc-200 xl:dark:border-zinc-600 xl:border-[1px] xl:px-4"
    >
      <navbar sticky :clickLeft="onNavbarLeftClick" v-if="isMobileTerminal"
        >精选会员</navbar
      >
      <div class="py-2 px-1">
        <h2
          class="text-center text-[34px] font-bold tracking-widest text-yellow-600"
        >
          精选VIP
        </h2>
        <p class="text-center text-lg text-yellow-500">升级VIP,畅享所有内容</p>
        <div
          class="flex justify-between mt-5 overflow-auto pb-2 scrollbar-thin scrollbar-thumb-zinc-200 dark:scrollbar-thumb-zinc-700 scrollbar-track-transparent"
        >
          <PayMenuItem
            @click="onChangeCurrentPay"
            v-for="item in vipPayData"
            :key="item.id"
            :isHot="item.isHot"
            :isSelect="item.id === selectPayData.id"
            :data="item"
          />
        </div>
        <p class="mt-1 text-sm text-zinc-500">
          {{ selectPayData.desc }}
        </p>
        <count-down :time="1000 * 60"></count-down>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'member'
}
</script>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { isMobileTerminal } from '@/utils/flexible'
import { getVipPayData } from '@/api/sys'
import PayMenuItem from './components/pay-menu-item.vue'

const store = useStore()
const router = useRouter()

// 选中的支付项
const selectPayData = ref({})
const onChangeCurrentPay = item => {
  selectPayData.value = item
}

// 点击左侧导航栏
const onNavbarLeftClick = () => {
  store.commit('app/changeRouterType', 'back')
  router.back()
}

// 获取VIP支付数据
const vipPayData = ref([])
const getVipPay = async () => {
  const res = await getVipPayData()
  if (res) {
    vipPayData.value = res
    selectPayData.value = res[0]
  }
}

getVipPay()
</script>

<style lang="scss" scoped></style>
