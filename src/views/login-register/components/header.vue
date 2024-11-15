<script setup></script>

<template>
  <div>
    <!--  头部图标  PC  -->
    <div class="hidden p-5 h-8 xl:block">
      <img
        alt="img"
        v-lazy
        class="m-auto w-4 h-4"
        src="http://lowcodedemo.top/logo.jpg"
      />
    </div>

    <!--  头部图标  Mobile  -->
    <div class="h-[111px] xl:hidden">
      <!-- 背景图去掉 不用 -->
      <!-- <img
        v-lazy
        class="dark:hidden"
        src="https://res.lgdsunday.club/login-bg.png"
        alt="img"
      /> -->
      <img
        v-lazy
        class="h-5 absolute top-[5%] left-[50%] translate-x-[-50%]"
        alt="img"
        src="http://lowcodedemo.top/logo.jpg"
      />
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
