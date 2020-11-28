import Vue from 'vue'
import App from './App'
import uView from "uview-ui";
import store from "./store"
import {usershop} from "./servers/natework.js"
import {shopdetail} from "./servers/natework.js"
import {shoprequest} from "./servers/natework.js"  
Vue.prototype.$usershop = usershop
Vue.prototype.$shoprequest = shoprequest
Vue.prototype.$shopdetail = shopdetail
Vue.use(uView);
Vue.config.productionTip = false

App.mpType = 'app'

// 注册全局的过滤器时间戳 dateFormat过滤器的名字  originVal 需要处理的时间数据
//padStart 第一个参数总长度为多少位 ，第二个参数代表如果不足多少位的话用字符串0来填充
Vue.filter('dateFormat', function (originVal) {
  const dt = new Date(originVal*1000)
  const y = dt.getFullYear()
  const m = (dt.getMonth() + 1 + '').padStart(2, '0')
  const d = (dt.getDate() + '').padStart(2, '0')

  const hh = (dt.getHours() + '').padStart(2, '0')
  const mm = (dt.getMinutes() + '').padStart(2, '0')
  const ss = (dt.getSeconds() + '').padStart(2, '0')

  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})



const app = new Vue({
	store,
    ...App
})
app.$mount()
