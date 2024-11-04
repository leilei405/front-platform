<template>
  <div class="w-full bg-white border-b border-b-zinc-200 px-2 py-1">
    <div class="flex items-center">
      <img
        class="h-5 w-5 cursor-pointer mr-2"
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
