<template>
  <div class="h-full overflow-auto bg-white dark:bg-zinc-800 duration-500">
    <Navigation />
    <div class="max-w-screen-xl mx-auto relative m-1 xl:mt-4">
      <ImageList />
    </div>
  </div>
</template>

<script setup>
import Navigation from './components/navigation/index.vue'
import ImageList from './components/list/index.vue'
</script>

<style lang="scss" scoped></style>
