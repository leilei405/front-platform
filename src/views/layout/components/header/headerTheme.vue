<template>
  <popover placement="bottom-left">
    <template #reference>
      <svg-icon
        name="theme-light"
        class="w-4 h-4 p-1 cursor-pointer rounded-sm duration-200 outline-none hover:bg-zinc-100/60"
      />
    </template>
    <div class="w-[140px] overflow-hidden">
      <div
        v-for="item in THEME_CONFIG"
        :key="item.id"
        class="flex items-center p-1 cursor-pointer rounded hover:bg-zinc-100/60"
      >
        <svg-icon
          :name="item.icon"
          class="w-1.5 h-1.5 mr-1"
          fillClass="fill-zinc-900"
        />
        <span class="text-sm text-zinc-900">{{ item.name }}</span>
      </div>
    </div>
  </popover>
</template>

<script setup>
import { THEME_CONFIG } from '@/constants'
</script>

<style lang="scss" scoped></style>
