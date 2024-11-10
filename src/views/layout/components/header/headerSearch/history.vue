<template>
  <div class="">
    <!-- title -->
    <div class="flex items-center text-base mb-2 text-zinc-400">
      <span>最近搜索</span>
      <svg-icon
        name="delete"
        class="w-2.5 h-2.5 ml-1 p-0.5 cursor-pointer duration-300 rounded-sm hover:bg-zinc-100"
        fillClass="fill-red-600"
        @click="onDeleteAllClick"
      />
    </div>

    <!-- historyList -->
    <div class="flex flex-wrap">
      <div
        v-for="(item, index) in $store.getters.historyList"
        :key="item"
        class="mr-2 mb-1.5 flex items-center cursor-pointer bg-sky-100 px-[5px] py-[3px] text-zinc-900 rounded-sm"
        @click="onItemClick(item)"
      >
        <span>{{ item }}</span>
        <svg-icon
          name="input-delete"
          class="w-2.5 h-2.5 p-0.5 ml-1 duration-300 rounded-sm hover:bg-zinc-200"
          @click.stop="onDeleteClick(index)"
        />
      </div>
    </div>
  </div>
</template>
<script>
const EMITS_ITEM_CLICK = 'itemClick'
</script>

<script setup>
import { useStore } from 'vuex'

const emits = defineEmits([EMITS_ITEM_CLICK])

const store = useStore()

// 删除所有历史记录
const onDeleteAllClick = () => {
  store.commit('search/clearAllHistory')
}

// 删除单个记录
const onDeleteClick = index => {
  store.commit('search/clearByIdHistory', index)
}

// 点击历史记录
const onItemClick = item => {
  emits(EMITS_ITEM_CLICK, item)
}
</script>

<style lang="scss" scoped></style>
