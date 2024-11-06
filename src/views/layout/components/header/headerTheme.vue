<template>
  <popover placement="bottom-left">
    <template #reference>
      <svg-icon
        :name="svgIconName"
        fillClass="fill-zinc-900 dark:fill-zinc-300"
        class="w-4 h-4 p-1 cursor-pointer rounded-sm duration-200 outline-none hover:bg-zinc-100/60 dark:hover:bg-zinc-900"
      />
    </template>
    <div class="w-[140px] overflow-hidden">
      <div
        v-for="item in THEME_CONFIG"
        :key="item.id"
        class="flex items-center p-1 cursor-pointer rounded hover:bg-zinc-100/60 dark:hover:bg-zinc-800"
        @click="onItemClick(item)"
      >
        <svg-icon
          :name="item.icon"
          class="w-1.5 h-1.5 mr-1"
          fillClass="fill-zinc-900 dark:fill-zinc-300"
        />
        <span class="text-sm text-zinc-900 dark:text-zinc-100">{{
          item.name
        }}</span>
      </div>
    </div>
  </popover>
</template>

<script setup>
import { THEME_CONFIG } from '@/constants'
import { computed } from 'vue'
import { useStore } from 'vuex'
const store = useStore()

// 这里踩了个坑
// dispatch 调用 action 里面的方法  然后触发mutation 里面的方法
// commit 调用 mutation 里面的方法
const onItemClick = item => {
  store.dispatch('theme/changeThemeType', item.type)
}

// 图标的展示
const svgIconName = computed(() => {
  const findTheme = THEME_CONFIG.find(item => {
    return item.type === store.getters.themeType
  })
  return findTheme.icon
})
</script>

<style lang="scss" scoped></style>
