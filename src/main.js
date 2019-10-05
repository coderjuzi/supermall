import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import FastClick from 'fastclick'// 导入FastClick
import VueLazyLoad from 'vue-lazyload'// 导入LazyLoad

import toast from './components/common/toast'

Vue.config.productionTip = false
// 给$bus赋值一个Vue实例，它可以作为事件总线
Vue.prototype.$bus = new Vue()// prototype是全局属性，适用于所有的JS对象
// 安装toast插件
Vue.use(toast)// 使用use会执行obj的install函数（index.js中）

// 解决移动端300毫秒延迟的问题
FastClick.attach(document.body)// vue.js中添加FastClick的支持

// 使用懒加载插件，通过Vue.use()调用
// 修改img后的:src为v-lazy
Vue.use(VueLazyLoad, {// 添加options可设置占位图
  loading: require('./assets/img/common/placeholder.png')// js中需要使用require将图片引用进来
})

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
