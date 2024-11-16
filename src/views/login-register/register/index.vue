<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { Form, Field, ErrorMessage, defineRule } from 'vee-validate'
import { LOGIN_TYPE } from '@/constants'
import {
  validatePassword,
  validateUserName,
  validateConfirmPassword
} from '../validate'
import HeaderLogin from '../components/header.vue'

// 因为 validateConfirmPassword 需要依赖 password 字段，所以需要在定义的时候传入依赖的字段
// 所以需要进行注册
defineRule('validateConfirmPassword', validateConfirmPassword)

const router = useRouter()
const store = useStore()
const registerLoading = ref(false)
const registerForm = ref({
  username: '',
  password: '',
  confirmPassword: ''
})

const onRegisterHandler = async values => {
  registerLoading.value = true
  try {
    const payload = {
      username: registerForm.value.username,
      password: registerForm.value.password
    }
    await store.dispatch('user/register', payload)
    await store.dispatch('user/login', {
      ...payload,
      loginType: LOGIN_TYPE.username
    })
  } finally {
    registerLoading.value = false
  }
  router.push('/')
}

const toHandleLogin = () => {
  router.push('/login')
}
</script>

<script>
export default {
  name: 'register'
}
</script>

<template>
  <div
    style="background-image: linear-gradient(to top, #c1dfc4 0%, #deecdd 100%)"
    class="relative h-screen bg-white dark:bg-zinc-800 text-center xl:bg-zinc-200"
  >
    <HeaderLogin />
    <div
      class="block px-3 mt-4 dark:bg-zinc-800 xl:bg-white xl:w-[388px] xl:dark:bg-zinc-900 xl:m-auto xl:mt-8 xl:py-4 xl:rounded-sm xl:shadow-lg"
    >
      <h3
        class="mb-2 font-semibold text-base text-neutral-900 dark:text-zinc-300 hidden xl:block"
      >
        注册账号
      </h3>
      <Form @submit="onRegisterHandler">
        <Field
          name="username"
          type="text"
          placeholder="请输入用户名"
          autocomplete="on"
          :rules="validateUserName"
          v-model="registerForm.username"
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
          v-model="registerForm.password"
          class="rounded dark:bg-zinc-800 dark:text-zinc-400 border-b-zinc-400 border-b-[1px] w-full outline-0 pb-0 px-1 text-base focus:border-b-main dark:focus:border-b-zinc-200 xl:dark:bg-zinc-900"
        />
        <ErrorMessage
          class="text-sm text-red-600 block mt-0.5 text-left"
          name="password"
        ></ErrorMessage>

        <Field
          name="confirmPassword"
          type="password"
          placeholder="请确认密码"
          autocomplete="on"
          rules="validateConfirmPassword:@password"
          v-model="registerForm.confirmPassword"
          class="rounded dark:bg-zinc-800 dark:text-zinc-400 border-b-zinc-400 border-b-[1px] w-full outline-0 pb-0 px-1 text-base focus:border-b-main dark:focus:border-b-zinc-200 xl:dark:bg-zinc-900"
        />
        <ErrorMessage
          class="text-sm text-red-600 block mt-0.5 text-left"
          name="confirmPassword"
        ></ErrorMessage>

        <div class="pt-1 pb-3 leading-[0px] text-right">
          <div class="mb-2">
            <span class="text-sm">已有账号？</span>
            <a
              @click="toHandleLogin"
              class="inline-block p-1 text-zinc-400 text-right dark:text-zinc-600 hover:text-zinc-600 dark:hover:text-zinc-400 text-sm duration-400 cursor-pointer"
              >去登录</a
            >
          </div>
          <div class="text-center">
            <a
              class="text-zinc-400 dark:text-zinc-600 hover:text-zinc-600 dark:hover:text-zinc-400 text-sm duration-400"
              href="https://www.baidu.com/"
              target="__black"
            >
              注册即同意《安全注册协议》
            </a>
          </div>
        </div>

        <m-button
          :isActiveAnim="false"
          :loading="registerLoading"
          class="w-full dark:bg-zinc-900 xl:dark:bg-zinc-800"
          >快点注册</m-button
        >
      </Form>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
