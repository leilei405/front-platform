<!-- UI -->
<template>
  <div class="h-screen">
    <Header class="h-header" />
    <div class="h-main">
      <Main />
    </div>
    <Floating class="fixed bottom-10 right-2" />
  </div>
</template>

<!-- JS -->
<script setup>
import Header from './components/header/index.vue'
import Main from './components/main.vue'
import Floating from './components/floating.vue'
</script>

<!-- CSS -->
<style lang="scss" scoped></style>
