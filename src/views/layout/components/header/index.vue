<template>
  <div
    class="w-full bg-white dark:bg-zinc-800 border-b border-b-zinc-200 dark:border-b-zinc-700 px-2 py-1"
  >
    <div class="flex items-center">
      <img
        class="h-3 w-3 cursor-pointer mr-2"
        src="http://lowcodedemo.top/logo.jpg"
      />
      <HeaderSearch />
      <HeaderTheme />
      <HeaderMy />
    </div>
  </div>
</template>

<script setup>
import HeaderSearch from './headerSearch/index.vue'
import HeaderMy from './headerMy.vue'
import HeaderTheme from './headerTheme.vue'
</script>

<style lang="scss" scoped></style>
