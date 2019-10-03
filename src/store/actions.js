import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutation-types'

export default {
  addCart(context, payload) {
    // 1. 查找之前数组中是否有该商品
    // find：查找一下当前为true时，则将item返回出去
    let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)// 箭头函数
    // 2. 判断oldProduct
    if (oldProduct) {
      // oldProduct.count += 1// 对应商品数量+1
      context.commit(ADD_COUNTER,oldProduct)
    } else {
      payload.count = 1// 新商品+1
      // context.state.cartList.push(payload)
      context.commit(ADD_TO_CART, payload)
    }
  }
}
