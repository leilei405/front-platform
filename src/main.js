import { createApp } from 'vue'
import router from '@/router/index'
import { useREM } from '@/utils/flexible'
import myLibs from '@/libs'
import App from './App.vue'
import './styles/index.scss'

useREM()
createApp(App).use(router).use(myLibs).mount('#app')
