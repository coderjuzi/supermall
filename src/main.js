import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import FastClick from 'fastclick'// 导入FastClick

import toast from './components/common/toast'

Vue.config.productionTip = false
// 给$bus赋值一个Vue实例，它可以作为事件总线
Vue.prototype.$bus = new Vue()// prototype是全局属性，适用于所有的JS对象
// 安装toast插件
Vue.use(toast)// 使用use会执行obj的install函数（index.js中）

// 解决移动端300毫秒延迟的问题
FastClick.attach(document.body)

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
