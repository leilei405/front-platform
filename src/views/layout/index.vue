<!-- UI -->
<template>
  <div class="h-screen">
    <Header class="h-header" />
    <Main class="h-main" />
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
