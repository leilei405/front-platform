<template>
  <transition name="down" @after-leave="destroy">
    <div
      v-show="isVisible"
      class="min-w-[420px] fixed top-[20px] left-[50%] translate-x-[-50%] z-50 flex items-center px-3 py-1.5 rounded-sm border cursor-pointer"
      :class="styles[type].containerClass"
    >
      <svg-icon
        :name="styles[type].icon"
        :fillClass="styles[type].fillClass"
        class="h-1.5 w-1.5 mr-1.5"
      ></svg-icon>
      <span class="text-sm" :class="styles[type].textClass">
        {{ content }}
      </span>
    </div>
  </transition>
</template>

<script>
const SUCCESS = 'success'
const ERROR = 'error'
const WARN = 'warn'
const typeEnum = [SUCCESS, ERROR, WARN]
</script>

<script setup>
import { onMounted, ref } from 'vue'
import svgIcon from '../svg-icon/index.vue'

const props = defineProps({
  type: {
    type: String,
    required: true,
    validator: val => {
      const res = typeEnum.includes(val)
      if (!res) {
        console.error(`type 类型错误,必须是${typeEnum.join('|')}中的一个`)
      }
      return res
    }
  },
  content: {
    type: String,
    required: true
  },
  duration: {
    type: Number
  },
  destroy: {
    type: Function
  }
})

const isVisible = ref(false)

onMounted(() => {
  isVisible.value = true
  setTimeout(() => {
    isVisible.value = false
  }, props.duration)
})

const styles = {
  warn: {
    icon: 'warn',
    fillClass: 'fill-warn-300',
    textClass: 'text-warn-300',
    containerClass:
      'bg-warn-100 border-warn-200 hover:shadow-lg hover:shadow-warn-100'
  },
  error: {
    icon: 'error',
    fillClass: 'fill-error-300',
    textClass: 'text-error-300',
    containerClass:
      'bg-error-100 border-error-200 hover:shadow-lg hover:shadow-error-100'
  },
  success: {
    icon: 'success',
    fillClass: 'fill-success-300',
    textClass: 'text-success-300',
    containerClass:
      'bg-success-100 border-success-200 hover:shadow-lg hover:shadow-success-100'
  }
}
</script>

<style lang="scss" scoped>
.down-enter-from,
.down-leave-to {
  opacity: 0;
  transform: translate3d(-50%, -100%, 0);
}

.down-enter-active,
.down-leave-active {
  transition: all 0.5s;
}
</style>
