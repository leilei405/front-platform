<template>
  <div>
    <div
      v-for="(item, index) in hintData"
      :key="index"
      class="py-1 pl-1 text-base font-bold text-zinc-500 rounded cursor-pointer duration-300 hover:bg-zinc-200 dark:hover:bg-zinc-900"
      @click="onItemClick(item)"
    >
      {{ item }}
    </div>
  </div>
</template>
321
<script setup>
import { ref, watch } from 'vue'
import { watchDebounced } from '@vueuse/core'
import { getHintList } from '@/api/pexels'
const emits = defineEmits(['itemClick'])
const props = defineProps({
  searchText: {
    type: String,
    required: true
  }
})
// 获取搜索数据
const hintData = ref([])
const getHintData = async () => {
  if (!props.searchText) return
  const { result } = await getHintList(props.searchText)
  hintData.value = result
}
// 监听searchText 输入框变化 防抖 500ms 后请求数据
watchDebounced(() => props.searchText, getHintData, {
  immediate: true,
  debounce: 500
})
const onItemClick = item => {
  emits('itemClick', item)
}
</script>
