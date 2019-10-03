import Vue from 'vue'
import Vuex from 'vuex'

// 1. 安装插件
Vue.use(Vuex)

// 2. 创建Store对象
const store = new Vuex.Store({
  state: {
    cartList: []// 添加一个数组来放置商品对象
  },
  mutations: {
    // mutations唯一的目的就是修改state中的状态
    // 尽可能让mutations中的每个方法完成的事件比较单一一些
    addCart(state, payload){
      // 1. 查找之前数组中是否有该商品
      // find：查找一下当前为true时，则将item返回出去
      let oldProduct = state.cartList.find(item => item.iid === payload.iid)// 箭头函数
      // 2. 判断oldProduct
      if (oldProduct) {
        oldProduct.count += 1// 之前的商品数量+1
      } else {
        payload.count = 1// 新商品+1
        state.cartList.push(payload)
      }
    }
  }
})
// 3. 挂载到Vue实例上
export default  store
