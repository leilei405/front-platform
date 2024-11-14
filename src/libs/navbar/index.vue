<template>
  <div
    class="w-full h-5 border-b flex items-center z-10 bg-white dark:bg-zinc-800 border-b-zinc-200 dark:border-b-zinc-700"
    :class="[sticky ? 'sticky top-0 left-0' : 'relative']"
  >
    <div
      class="h-full w-5 absolute left-0 flex items-center justify-center"
      @click="onClickLeft"
    >
      <slot name="left">
        <svg-icon
          name="back"
          class="w-2 h-2"
          fillClass="fill-zinc-900 dark:fill-zinc-200"
        ></svg-icon>
      </slot>
    </div>

    <div
      class="h-full flex item-center justify-center m-auto font-bold text-base text-zinc-900 dark:text-neutral-200"
    >
      <slot></slot>
    </div>

    <!-- 右边 -->
    <div
      class="h-full w-5 absolute right-0 flex items-center justify-center"
      @click="onClickRight"
    >
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const props = defineProps({
  clickLeft: {
    type: Function,
    required: true
  },
  clickRight: {
    type: Function,
    required: true
  },
  sticky: {
    type: Boolean
  }
})

const router = useRouter()

const onClickLeft = () => {
  if (props.clickLeft) {
    props.clickLeft()
    return
  }
  router.back()
}

const onClickRight = () => {
  if (props.clickRight) {
    props.clickRight()
    return
  }
}
</script>

<style lang="scss" scoped></style>
