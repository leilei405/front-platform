<template>
  <div>
    <PcPayment v-if="!isMobileTerminal" />
    <MobilePayment v-else />
  </div>
</template>

<script setup>
import { isMobileTerminal } from '@/utils/flexible'
import PcPayment from './pc-payment/index.vue'
import MobilePayment from './mobile-payment/index.vue'
</script>

<style lang="scss" scoped></style>
