<template>
  <div
    ref="containerTarget"
    class="group relative p-0.5 rounded-xl border-white dark:border-zinc-200 duration-500 hover:bg-blue-100/40"
  >
    <div>
      <!-- 前置搜索小图标 -->
      <svg-icon
        class="w-1.5 h-1.5 absolute translate-y-[-50%] top-[50%] left-2"
        name="search"
        color="#070707"
      />
      <!--输入框 -->
      <input
        type="text"
        class="block w-full h-[44px] pl-4 outline-0 bg-zinc-100 dark:bg-zinc-800 caret-zinc-400 rounded-xl text-zinc-900 dark:text-zinc-200 tracking-wide text-sm font-semibold border border-zinc-100 dark:border-zinc-700 duration-500 focus:border-blue-300 group-hover:bg-white dark:group-hover:bg-zinc-900 group-hover:border-zinc-300 dark:group-hover:border-zinc-700"
        placeholder="搜索"
        v-model="inputValue"
        @focus="onFocusHandler"
        @blur="onBlurHandler"
        @keyup.enter="onSearchHandler"
      />

      <!-- 删除按钮 -->
      <svg-icon
        v-show="inputValue"
        name="input-delete"
        class="w-1.5 h-1.5 absolute translate-y-[-50%] top-[50%] right-9 cursor-pointer duration-500"
        @click="onClearClick"
      />

      <!-- 分割线  -->
      <div
        class="opacity-0 h-1.5 w-[1px] absolute translate-y-[-50%] top-[50%] right-[72px] duration-500 bg-zinc-200 group-hover:opacity-100"
      ></div>

      <!-- 搜索按钮 -->
      <m-button
        class="absolute translate-y-[-50%] top-[50%] right-1 rounded-xl duration-500 opacity-0 group-hover:opacity-100"
        type="main"
        icon="search"
        iconColor="#ffffff"
        @click="onSearchHandler"
      />
    </div>

    <!-- 搜索出来的下拉内容区域 -->
    <transition name="slide">
      <div
        v-if="$slots.dropdown"
        v-show="isFocus"
        class="max-h-[368px] w-full text-base overflow-auto bg-white dark:bg-zinc-800 absolute z-20 left-0 top-[59px] p-2 rounded border border-zinc-200 dark:border-zinc-600 duration-200 hover:shadow-2xl"
      ></div>
    </transition>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useVModel, onClickOutside } from '@vueuse/core'
// 1. 输入内容实现双向数据绑定
const props = defineProps({
  modelValue: {
    type: String,
    required: true
  }
})

// 2. 事件处理
const emits = defineEmits([
  'update:modelValue',
  'search',
  'clear',
  'input',
  'focus',
  'blur'
])
const inputValue = useVModel(props)

// 3. 删除
const onClearClick = () => {
  inputValue.value = ''
  emits('clear', '')
}

// 4. 触发搜索
const onSearchHandler = () => {
  emits('search', inputValue.value)
}

// 5. 下拉框的显示和隐藏
const isFocus = ref(false)
const onFocusHandler = () => {
  isFocus.value = true
  emits('focus')
}

// 6. 区域外的事件处理
const containerTarget = ref(null)
onClickOutside(containerTarget, () => {
  isFocus.value = false
})

// 监听输出事件
watch(inputValue, val => {
  emits('input', val)
})
</script>

<style lang="scss" scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateX(40px);
}
</style>
