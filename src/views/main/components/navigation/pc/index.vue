<template>
  <div class="bg-white sticky top-0 left-0 w-full z-10">
    <ul
      class="w-[800px] relative flex flex-wrap justify-center overflow-x-auto px-[10px] py-1 text-zinc-600 duration-300 overflow-hidden mx-auto"
      :class="[isOpenCategory ? 'h-[206px]' : 'h-[56px]']"
    >
      <div
        class="absolute right-1 bottom-1 z-20 p-1 rounded cursor-pointer duration-200 hover:bg-zinc-200"
        @click="toggleCategory"
      >
        <svg-icon
          :name="isOpenCategory ? 'fold' : 'unfold'"
          class="w-1 h-1"
          fillClass=" fill-zinc-900"
        />
      </div>
      <li
        v-for="(item, index) in $store.getters.categoryData"
        :key="item.id"
        class="shrink-0 px-1.5 py-0 z-10 duration-200 text-zinc-900 text-base font-bold h-4 leading-4 cursor-pointer hover:bg-zinc-200 rounded mr-1 mb-1"
        :class="{
          'text-zinc-900 bg-zinc-200': selectedCurrentIndex === index
        }"
        @click="onItemClick(index)"
      >
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const isOpenCategory = ref(false)

// 展开收起
const toggleCategory = () => {
  isOpenCategory.value = !isOpenCategory.value
}

// 选中状态处理
const selectedCurrentIndex = ref(0)
const onItemClick = index => {
  selectedCurrentIndex.value = index
}
</script>

<style lang="scss" scoped></style>
