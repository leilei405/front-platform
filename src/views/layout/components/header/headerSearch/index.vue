<template>
  <div class="w-full">
    <search v-model="inputValue">
      <template #dropdown>
        <div class="w-full h-20 bg-red-500">drop</div>
      </template>
    </search>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const inputValue = ref('')
</script>

<style lang="scss" scoped></style>
