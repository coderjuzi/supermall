import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false
// 给$bus赋值一个Vue实例，它可以作为事件总线
Vue.prototype.$bus = new Vue()// prototype是全局属性，适用于所有的JS对象

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
