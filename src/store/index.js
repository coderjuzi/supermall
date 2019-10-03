import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'
import actions from './actions'

// 1. 安装插件
Vue.use(Vuex)

// 2. 创建Store对象
const state = {// state抽取出来
  cartList: []
}
const store = new Vuex.Store({
  state,
  mutations,// 做跟踪
  actions,// 需要修改某个操作，其中有判断逻辑的，推荐使用actions
})
// 3. 挂载到Vue实例上
export default  store
