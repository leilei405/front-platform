<template>
  <div class="w-full bg-white border-b border-b-zinc-200 px-2 py-1">
    <div class="flex items-center">
      <img
        class="h-5 w-5 cursor-pointer mr-2"
        src="http://lowcodedemo.top/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20241104203230.jpg"
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
