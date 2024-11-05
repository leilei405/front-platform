<template>
  <div class="relative" @mouseenter="onMouseenter" @mouseleave="onMouseleave">
    <div>
      <slot name="reference" />
    </div>
    <transition name="slide">
      <div
        v-show="isVisible"
        class="absolute p-1 z-20 bg-white border rounded-md"
      >
        <slot />
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const isVisible = ref(false)

// 鼠标进入时，显示弹层
const onMouseenter = () => {
  isVisible.value = true
}

// 鼠标离开时，隐藏弹层
const onMouseleave = () => {
  isVisible.value = false
}
</script>

<style lang="scss" scoped>
.slide-enter-active,
.slide-leave-active {
  transition: opacity 0.3s transform 0.3s;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateX(20px);
}
</style>
