import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import 'dayjs/locale/zh-cn'
import "/@/assets/iconfont/iconfont.js"
import "/@/assets/iconfont/iconfont.css";
// 内置国际化语言包
import { createI18n } from 'vue-i18n'
import ch from "./locales/ch.json"
import en from "./locales/en.json"
window.process = {}//path模块线上部署会遇到process is undefined问题 
const i18n = createI18n({
  locale: 'ch', //默认使用中文
  messages: {
    ch,
    en
  }
})
// console.log(import.meta.env)
const app = createApp(App)
app.use(store)
.use(router).use(ElementPlus).use(i18n).mount('#app')
