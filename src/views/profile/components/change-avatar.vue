<template>
  <div class="overflow-auto relative flex flex-col items-center">
    <svg-icon
      v-if="isMobileTerminal"
      name="close"
      class="w-3 h-3 p-0.5 m-1 ml-auto"
      fillClass="fill-zinc-900 dark:fill-zinc-200 "
      @click="onClose"
    ></svg-icon>

    <img :src="blob" ref="imageTarget" alt="" />

    <m-button class="mt-4 w-[80%] xl:w-1/2" @click="onConfirmClick"
      >确定</m-button
    >
  </div>
</template>

<script>
const EMITS_CLOSE = 'close'
</script>

<script setup>
import { ref } from 'vue'
import { isMobileTerminal } from '@/utils/flexible'

defineProps({
  blob: {
    type: String,
    default: true
  }
})

const imageTarget = ref(null)

const emits = defineEmits([EMITS_CLOSE])

const onConfirmClick = () => {
  emits(EMITS_CLOSE)
}

const onClose = () => {
  emits(EMITS_CLOSE)
}
</script>

<style lang="scss" scoped></style>
