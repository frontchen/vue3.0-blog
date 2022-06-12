import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import 'dayjs/locale/zh-cn'
import '/@/assets/iconfont/iconfont.js'
import '/@/assets/iconfont/iconfont.css'

//图表组件
import ECharts from 'vue-echarts'
window.process = {} //path模块线上部署会遇到process is undefined问题
import i18n from '/@/services/i18n'

// console.log(import.meta.env)
const app = createApp(App)

// 全局注册组件（也可以使用局部注册）
app.component('v-chart', ECharts)
app.use(store).use(router).use(ElementPlus).use(i18n).mount('#app')
