<template>
  <div>
    <pc-navigation v-if="!isMobileTerminal" />
    <mobile-navigation v-else />
  </div>
</template>

<script setup>
import { isMobileTerminal } from '@/utils/flexible'
import pcNavigation from './pc/index.vue'
import mobileNavigation from './mobile/index.vue'
</script>

<style lang="scss" scoped></style>
