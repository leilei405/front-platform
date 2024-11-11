<template>
  <popover class="guide-account" placement="bottom-left">
    <template #reference>
      <div
        class="relative flex items-center p-0.5 rounded-sm cursor-pointer duration-200 outline-none hover:bg-zinc-100"
      >
        <!-- Profile Img -->
        <img
          class="h-3 w-3 cursor-pointer mr-2"
          src="http://lowcodedemo.top/logo.jpg"
        />
        <!-- arrow -->
        <svg-icon
          class="h-1.5 w-1.5 ml-[-15px]"
          name="down-arrow"
          fillClass="fill-zinc-900 dark:fill-zinc-300"
        />
        <!-- vip -->
        <svg-icon
          name="vip"
          class="h-1.5 w-1.5 absolute right-[15px] top-[24px]"
        />
      </div>
    </template>
    <div class="w-[140px] overflow-hidden">
      <div
        v-for="item in PROFILE_CONFIG"
        :key="item.id"
        class="flex items-center p-1 cursor-pointer rounded hover:bg-zinc-100/60 dark:hover:bg-zinc-800"
      >
        <svg-icon
          :name="item.icon"
          class="w-1.5 h-1.5 mr-1"
          fillClass="fill-zinc-900 dark:fill-zinc-300"
        />
        <span class="text-sm text-zinc-900 dark:text-zinc-100">{{
          item.title
        }}</span>
      </div>
    </div>
  </popover>
</template>

<script setup>
import { PROFILE_CONFIG } from '@/constants'
</script>

<style lang="scss" scoped></style>
