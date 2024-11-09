<template>
  <div class="w-full">
    <search v-model="inputValue">
      <template #dropdown>
        <div>
          <Hint
            v-show="inputValue"
            :searchText="inputValue"
            @itemClick="onSearchHandler"
          />
        </div>
      </template>
    </search>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Hint from './hint.vue'
const inputValue = ref('')
const onSearchHandler = val => {
  inputValue.value = val
}
</script>

<style lang="scss" scoped></style>
