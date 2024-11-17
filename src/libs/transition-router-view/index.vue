<template>
  <!-- 路由出口 -->
  <router-view v-slot="{ Component }">
    <!-- 动画组件 -->
    <transition
      :name="transitionName"
      @before-enter="beforeEnter"
      @after-leave="afterLeave"
    >
      <!-- 缓存组件 -->
      <keep-alive :include="taskStack">
        <component
          :class="isAnimation ? 'fixed top-0 left-0 w-screen z-50' : ''"
          :is="Component"
          :key="$route.fullPath"
        />
      </keep-alive>
    </transition>
  </router-view>
</template>

<script>
const NONE = 'none'
const PUSH = 'push'
const BACK = 'back'

const ROUTER_TYPE_ENUM = [NONE, PUSH, BACK]
</script>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps({
  // 路由跳转类型
  routerType: {
    type: String,
    default: NONE,
    validator: value => {
      const result = ROUTER_TYPE_ENUM.includes(value)
      if (!result) {
        throw new Error(
          '请传入正确的routerType',
          `${ROUTER_TYPE_ENUM.join('|')}其中一个`
        )
      }
      return result
    }
  },
  // 首页的组件名称
  mainComponent: {
    type: String,
    required: true
  }
})

const transitionName = ref('')

/**
 * @description: 路由的前置守卫
 * @description: 虚拟任务栈数组
 */
const taskStack = ref([props.mainComponent])
router.beforeEach(to => {
  transitionName.value = props.routerType

  if (props.routerType === PUSH) {
    // 入栈
    taskStack.value.push(to.name)
  } else if (props.routerType === BACK) {
    // 出栈
    taskStack.value.pop()
  }

  // 进入首页默认清空任务栈
  if (to.name === props.mainComponent) {
    clearStackTask()
  }
})

const clearStackTask = () => {
  taskStack.value = [props.mainComponent]
}

// 监听开始结束动画
const isAnimation = ref(false)
const beforeEnter = () => {
  isAnimation.value = true
}

const afterLeave = () => {
  isAnimation.value = false
}
</script>

<style lang="scss" scoped>
// push页面： 新页面进入动画
@keyframes push-in {
  0% {
    transform: translate(100%, 0);
  }
  100% {
    transform: translate(0, 0);
  }
}

// push页面： 老页面退出动画
@keyframes push-out {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(-50%, 0);
  }
}

// newPage 进入
.push-enter-active {
  animation-name: push-in;
  animation-duration: 0.5s;
}

// oldPage 离开
.push-leave-active {
  animation-name: push-out;
  animation-duration: 0.5s;
}

// TODO: back
// back页面：即将展示的页面动画
@keyframes back-in {
  0% {
    width: 100%;
    transform: translate(-100%, 0);
  }
  100% {
    width: 100%;
    transform: translate(0, 0);
  }
}

// back页面：后退页面执行的动画
@keyframes back-out {
  0% {
    width: 100%;
    transform: translate(0, 0);
  }
  100% {
    width: 100%;
    transform: translate(50%, 0);
  }
}

// back页面：即将展示的页面动画
.back-enter-active {
  animation-name: back-in;
  animation-duration: 0.5s;
}

// back页面：后退页面执行的动画
.back-leave-active {
  animation-name: back-out;
  animation-duration: 0.5s;
}
</style>
