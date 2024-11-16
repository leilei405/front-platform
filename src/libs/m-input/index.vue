<template>
  <div class="relative leading-none">
    <input
      v-if="type === TEXT_TYPE[0]"
      :placeholder="placeholder"
      :maxlength="max"
      v-model="text"
      type="text"
      class="border-gray-200 dark:border-zinc-600 dark:bg-zinc-800 duration-100 dark:text-zinc-400 border-[1px] outline-0 py-0.5 px-1 text-sm rounded-sm focus:border-blue-400 w-full"
    />

    <textarea
      v-if="type === TEXT_TYPE[1]"
      :placeholder="placeholder"
      :maxlength="max"
      v-model="text"
      rows="5"
      class="border-gray-200 dark:border-zinc-600 dark:bg-zinc-800 duration-100 dark:text-zinc-400 border-[1px] outline-0 py-0.5 px-1 text-sm rounded-sm focus:border-blue-400 w-full"
    />

    <span
      v-if="max"
      class="absolute right-1 bottom-0.5 text-zinc-400 text-sm"
      :class="{ 'text-red-700': inputLength === parseInt(max) }"
    >
      {{ inputLength }} / {{ max }}
    </span>
  </div>
</template>

<script>
const TEXT_TYPE = ['text', 'textarea']
</script>

<script setup>
import { computed } from 'vue'
import { useVModel } from '@vueuse/core'

const props = defineProps({
  modelValue: {
    required: true,
    type: String
  },
  type: {
    type: String,
    default: TEXT_TYPE[0],
    validator: val => {
      const result = TEXT_TYPE.includes(val)
      if (!result) {
        throw new Error(`type must be one of ${TEXT_TYPE.join(',')}`)
      }
      return result
    }
  },
  max: {
    type: [Number, String]
  },
  placeholder: {
    type: String,
    default: '请输入'
  }
})

// 事件声明
defineEmits(['update:modelValue'])
const text = useVModel(props)

// 计算当前输入的长度
const inputLength = computed(() => {
  if (text.value) {
    return text.value.length
  }
})
</script>

<style lang="scss" scoped></style>
