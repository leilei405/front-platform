<template>
  <div
    class="fixed left-0 top-0 w-screen h-screen z-20 backdrop-blur-4xl bg-white dark:bg-zinc-800 pb-2 overflow-y-auto xl:p-2 xl:bg-transparent"
  >
    <!-- 移动端下展示navbar -->
    <navbar
      v-if="isMobileTerminal"
      sticky
      @clickLeft="closeModal"
      @clickRight="closeModal"
    >
      <span>{{ pexelsData.title }}</span>
      <template #right>
        <svg-icon
          name="share"
          class="w-3 h-3"
          fillClass="fill-zinc-900 dark:fill-zinc-200"
        ></svg-icon>
      </template>
    </navbar>

    <!-- close -->
    <svg-icon
      v-else
      name="close"
      class="w-3 h-3 ml-1 p-0.5 cursor-pointer duration-200 rounded-sm hover:bg-zinc-100 absolute right-2 top-2"
      fillClass="fill-zinc-400"
      @click="closeModal"
    ></svg-icon>

    <!-- content -->
    <div class="xl:w-[80%] xl:h-full xl:mx-auto xl:rounded-lg xl:flex">
      <img
        :src="pexelsData.photo"
        alt="img"
        class="w-screen mb-2 xl:w-3/5 xl:h-full xl:rounded-tl-lg xl:rounded-bl-lg"
      />
      <div
        class="xl:w-2/5 xl:h-full xl:bg-white xl:dark:bg-zinc-900 xl:rounded-tr-lg xl:rounded-br-lg xl:p-3"
      >
        <div v-if="!isMobileTerminal" class="flex justify-between mb-2">
          <svg-icon
            name="share"
            class="w-4 h-4 p-1 cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-800 duration-300 rounded"
            fillClass="fill-zinc-900 dark:fill-zinc-200"
          ></svg-icon>

          <m-button
            class=""
            type="info"
            icon="heart"
            iconClass="fill-zinc-900 dark:fill-zinc-200"
          ></m-button>
        </div>

        <!-- title -->
        <p
          class="text-base text-zinc-900 dark:text-zinc-200 ml-1 font-bold xl:text-xl xl:mb-5"
        >
          {{ pexelsData.title }}
        </p>

        <!-- author -->
        <div class="flex items-center mt-1 px-1">
          <img
            v-lazy
            class="h-3 w-3 rounded-full"
            :src="pexelsData.avatar"
            alt=""
          />
          <span class="text-base text-zinc-900 dark:text-zinc-200 ml-1">{{
            pexelsData.author
          }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { isMobileTerminal } from '@/utils/flexible' // 判断是否是移动端
import { getImageDetail } from '@/api/pexels' // 获取单个图片详情数据

const router = useRouter()
const store = useStore()

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

// 获取单个图片详情数据
const pexelsData = ref({})
const getImageDetailData = async () => {
  const result = await getImageDetail(props.id)
  pexelsData.value = result
}

// 关闭弹窗
const closeModal = () => {
  console.log('关闭弹窗')

  router.back()
}

getImageDetailData()
</script>

<style lang="scss" scoped></style>
