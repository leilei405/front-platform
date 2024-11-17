<template>
  <div>
    <PcPayment v-if="!isMobileTerminal" />
  </div>
</template>

<script setup>
import { isMobileTerminal } from '@/utils/flexible'
import PcPayment from './pc-payment/index.vue'
</script>

<style lang="scss" scoped></style>
