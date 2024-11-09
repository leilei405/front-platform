import { createApp } from 'vue'
import router from '@/router/index'
import { useREM } from '@/utils/flexible'
import useTheme from '@/utils/theme'
import myLibs from '@/libs'
import directives from './directives'
import '@/permission'
import store from './store'
import App from './App.vue'
import './styles/index.scss'

// 注册svg图标
import 'virtual:svg-icons-register'

useREM()
useTheme()

createApp(App).use(router).use(store).use(directives).use(myLibs).mount('#app')
