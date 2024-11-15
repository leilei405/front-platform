<script setup>
import HeaderLogin from '../components/header.vue'
</script>

<template>
  <div
    style="background-image: linear-gradient(to top, #c1dfc4 0%, #deecdd 100%)"
    class="relative h-screen bg-white dark:bg-zinc-800 text-center xl:bg-zinc-200"
  >
    <HeaderLogin />
    <!--  表单区域  -->
    <div
      class="block px-3 mt-4 dark:bg-zinc-800 xl:bg-white xl:w-[388px] xl:dark:bg-zinc-900 xl:m-auto xl:mt-8 xl:py-4 xl:rounded-sm xl:shadow-lg"
    >
      <!--  title    -->
      <h3
        class="mb-2 font-semibold text-base text-main dark:text-zinc-300 hidden xl:block"
      >
        账号登录
      </h3>
      <!-- 表单 -->
      <form>
        <input
          name="username"
          type="text"
          placeholder="请输入用户名"
          autocomplete="on"
          class="rounded dark:bg-zinc-800 dark:text-zinc-400 border-b-zinc-400 border-b-[1px] w-full outline-0 pb-0 px-1 text-base focus:border-b-main dark:focus:border-b-zinc-200 xl:dark:bg-zinc-900"
        />
        <input
          name="password"
          type="password"
          placeholder="请输入密码"
          autocomplete="on"
          class="rounded dark:bg-zinc-800 dark:text-zinc-400 border-b-zinc-400 border-b-[1px] w-full outline-0 pb-0 px-1 text-base focus:border-b-main dark:focus:border-b-zinc-200 xl:dark:bg-zinc-900"
        />
        <div class="pt-1 pb-3 leading-[0px] text-right">
          <a
            class="inline-block p-1 text-zinc-400 text-right dark:text-zinc-600 hover:text-zinc-600 dark:hover:text-zinc-400 text-sm duration-400 cursor-pointer"
            >去注册</a
          >
        </div>

        <m-button class="w-full dark:bg-zinc-900 xl:dark:bg-zinc-800"
          >登录</m-button
        >
      </form>
      <!--      -->
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
