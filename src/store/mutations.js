import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutation-types'

export default {
  // mutations唯一的目的就是修改state中的状态
  // 尽可能让mutations中的每个方法完成的事件比较单一一些
  [ADD_COUNTER](state, payload) {
    payload.count++
  },
  [ADD_TO_CART](state, payload) {
    payload.checked = true// CheckButton默认为选中
    state.cartList.push(payload)
  }
}
