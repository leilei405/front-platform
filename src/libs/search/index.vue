<template>
  <div
    class="group relative p-0.5 rounded-xl border-white duration-500 hover:bg-blue-100/40"
  >
    <div>
      <!-- search-icon -->
      <svg-icon
        class="w-1.5 h-1.5 absolute translate-y-[-50%] top-[50%] left-2"
        name="search"
        color="#070707"
      />
      <!-- search-input -->
      <input
        type="text"
        class="block w-full h-[44px] pl-4 outline-0 bg-zinc-100 caret-zinc-400 rounded-xl text-zinc-900 tracking-wide text-sm font-semibold border border-zinc-100 duration-500 focus:border-blue-300 group-hover:bg-white group-hover:border-zinc-300"
        placeholder="搜索"
      />

      <!-- search-delete -->
      <svg-icon
        class="w-1.5 h-1.5 absolute translate-y-[-50%] top-[50%] right-9 cursor-pointer duration-500"
        name="input-delete"
      />

      <!-- 分割线  -->
      <div
        class="opacity-0 h-1.5 w-[1px] absolute translate-y-[-50%] top-[50%] right-[72px] duration-500 bg-zinc-200 group-hover:opacity-100"
      ></div>
      <!-- click-search-icon -->
      <!-- TODO -->
    </div>
    <transition name="slide">
      <div
        class="max-h-[368px] w-full text-base overflow-auto bg-white absolute z-20 left-0 top-[59px] p-2 rounded border border-zinc-200 duration-200 hover:shadow-2xl"
      ></div>
    </transition>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateX(40px);
}
</style>
