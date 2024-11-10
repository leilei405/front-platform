<template>
  <div class="w-full">
    <search
      v-model="inputValue"
      @search="onSearchHandler"
      @clear="onSearchHandler"
    >
      <template #dropdown>
        <div>
          <Hint
            v-show="inputValue"
            :searchText="inputValue"
            @itemClick="onSearchHandler"
          />

          <SearchHistory v-show="!inputValue" @itemClick="onSearchHandler" />

          <SearchTheme v-show="!inputValue" />
        </div>
      </template>
    </search>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import Hint from './hint.vue'
import SearchHistory from './history.vue'
import SearchTheme from './theme.vue'

const store = useStore()

const inputValue = ref('')

const onSearchHandler = val => {
  inputValue.value = val
  if (val) {
    store.commit('search/createHistory', val)
    store.commit('app/changeSearchText', val)
  }
}
</script>

<style lang="scss" scoped></style>
