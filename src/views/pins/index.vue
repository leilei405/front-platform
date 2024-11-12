<template>
  <div class="fixed left-0 top-0 w-screen h-screen text-xl bg-slate-500 z-30">
    {{ id }}
  </div>
</template>

<script setup>
const props = defineProps({
  id: {
    type: String,
    required: true
  }
})
</script>

<style lang="scss" scoped></style>
