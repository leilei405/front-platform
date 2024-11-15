<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { Form, Field, ErrorMessage } from 'vee-validate'
import { validatePassword, validateUserName } from '../validate'
import HeaderLogin from '../components/header.vue'
import SliderCaptcha from './slider-captcha.vue'
import { LOGIN_TYPE } from '@/constants'

const store = useStore()
const router = useRouter()

const isSliderCaptchaVisible = ref(false)
const loginLoading = ref(false)
const loginForm = ref({
  username: '',
  password: ''
})

// 登录触发事件
const onLoginHandler = values => {
  isSliderCaptchaVisible.value = true
  login()
}

// 人类行为验证触发
const onCaptchaHandlerSuccess = values => {
  isSliderCaptchaVisible.value = false
  console.log('人类行为验证')
}

// 登录
const login = async () => {
  loginLoading.value = true
  try {
    store.dispatch('user/login', {
      ...loginForm.value,
      loginType: LOGIN_TYPE.username
    })
  } finally {
    loginLoading.value = false
  }
  router.push('/')
}
</script>

<script>
export default {
  name: 'login'
}
</script>

<template>
  <div
    style="background-image: linear-gradient(to top, #c1dfc4 0%, #deecdd 100%)"
    class="relative h-screen bg-white dark:bg-zinc-800 text-center xl:bg-zinc-200"
  >
    <!-- Header -->
    <HeaderLogin />

    <!-- 表单 -->
    <div
      class="block px-3 mt-4 dark:bg-zinc-800 xl:bg-white xl:w-[388px] xl:dark:bg-zinc-900 xl:m-auto xl:mt-8 xl:py-4 xl:rounded-sm xl:shadow-lg"
    >
      <h3
        class="mb-2 font-semibold text-base text-main dark:text-zinc-300 hidden xl:block"
      >
        账号登录
      </h3>
      <Form @submit="onLoginHandler">
        <Field
          name="username"
          type="text"
          placeholder="请输入用户名"
          autocomplete="on"
          :rules="validateUserName"
          v-model="loginForm.username"
          class="rounded dark:bg-zinc-800 dark:text-zinc-400 border-b-zinc-400 border-b-[1px] w-full outline-0 pb-0 px-1 text-base focus:border-b-main dark:focus:border-b-zinc-200 xl:dark:bg-zinc-900"
        />
        <ErrorMessage
          class="text-sm text-red-600 block mt-0.5 text-left"
          name="username"
        ></ErrorMessage>
        <Field
          name="password"
          type="password"
          placeholder="请输入密码"
          autocomplete="on"
          :rules="validatePassword"
          v-model="loginForm.password"
          class="rounded dark:bg-zinc-800 dark:text-zinc-400 border-b-zinc-400 border-b-[1px] w-full outline-0 pb-0 px-1 text-base focus:border-b-main dark:focus:border-b-zinc-200 xl:dark:bg-zinc-900"
        />
        <ErrorMessage
          class="text-sm text-red-600 block mt-0.5 text-left"
          name="password"
        ></ErrorMessage>
        <div class="pt-1 pb-3 leading-[0px] text-right">
          <a
            class="inline-block p-1 text-zinc-400 text-right dark:text-zinc-600 hover:text-zinc-600 dark:hover:text-zinc-400 text-sm duration-400 cursor-pointer"
            >去注册</a
          >
        </div>

        <m-button
          :isActiveAnim="false"
          :loading="loginLoading"
          class="w-full dark:bg-zinc-900 xl:dark:bg-zinc-800"
          >登录</m-button
        >
      </Form>

      <!-- 第三方登录 -->
      <div class="flex justify-around mt-4">
        <svg-icon class="w-4 cursor-pointer" name="qq" />
        <svg-icon class="w-4 cursor-pointer" name="weixin" />
      </div>
    </div>
    <SliderCaptcha
      v-if="isSliderCaptchaVisible"
      @close="isSliderCaptchaVisible = false"
      @success="onCaptchaHandlerSuccess"
    />
  </div>
</template>

<style scoped lang="scss"></style>
