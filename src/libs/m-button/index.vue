<template>
  <button
    class="text-sm text-center rounded duration-150 flex justify-center items-center"
    :class="[
      typeEnum[type],
      sizeEnum[sizeKey].button,
      {
        'active:scale-105': isActiveAnim
      }
    ]"
  >
    <svg-icon
      v-if="loading"
      name="loading"
      class="w-2 h-2 animate-spin mr-1"
    ></svg-icon>

    <svg-icon
      v-if="icon"
      :name="icon"
      class="m-auto"
      :color="iconColor"
      :class="sizeEnum[sizeKey].icon"
      :fillClass="iconClass"
    ></svg-icon>

    <slot v-else />
  </button>
</template>

<script>
const typeEnum = {
  main: 'text-white bg-main hover:bg-hover-main active:bg-main', // 主题按钮
  primary: 'text-white bg-primary hover:bg-hover-primary active:bg-primary', // 主要按钮
  success: 'text-white bg-success hover:bg-hover-success active:bg-success', // 成功按钮
  warning: 'text-white bg-warning hover:bg-hover-warning active:bg-warning', // 警告按钮
  error: 'text-white bg-error hover:bg-hover-error active:bg-error', // 错误按钮
  info: 'text-zinc-800 bg-zinc-200 hover:bg-zinc-300 active:bg-zinc-200' // 信息按钮
}

const sizeEnum = {
  default: {
    button: 'w-8 h-4 text-base',
    icon: ''
  },
  'icon-default': {
    button: 'w-4 h-4',
    icon: 'w-1.5 h-1.5'
  },
  small: {
    button: 'w-7 h-3 text-base',
    icon: ''
  },
  'icon-small': {
    button: 'w-3 h-3',
    icon: 'w-1.5 h-1.5'
  }
}
</script>

<script setup>
import { computed } from 'vue'
const props = defineProps({
  icon: String,
  iconColor: String,
  iconClass: String,

  type: {
    type: String,
    default: 'main',
    validator(val) {
      const result = Object.keys(typeEnum).includes(val)
      if (!result) {
        throw new Error(
          `type 类型错误，可选值为：${Object.keys(typeEnum).join(',')}`
        )
      }
      return result
    }
  },
  size: {
    type: String,
    default: 'default',
    validator(val) {
      const keys = Object.keys(sizeEnum).filter(key => !key.includes('icon'))
      const result = keys.includes(val)
      if (!result) {
        throw new Error(`size 类型错误，可选值为：${keys.join(',')}`)
      }
      return result
    }
  },
  isActiveAnim: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  }
})

const sizeKey = computed(() => {
  return props.icon ? 'icon-' + props.size : props.size
})
</script>

<style lang="scss" scoped></style>
