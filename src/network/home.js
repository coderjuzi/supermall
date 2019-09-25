// 多增加一个home.js的层，首页Home.ve只需要面向此模块home.js开发即可
// 作用：封装所有对首页数据的请求，可以在这里进行统一的管理

import {request} from "./request";// 导入request.js中的网络请求

export function getHomeMultidata() {// 获取首页的多个数据
  return request({
    url: '/home/multidata'
  })
}

export function getHomeGoods(type, page) {
  return request({
    url: '/home/data',
    params: {
      type,
      page
    }
  })
}

// 函数调用 -> 压入函数栈(保存函数调用过程中所有变量)
// 函数调用结束 -> 弹出函数栈(释放函数所有的变量)
// function test() {
//   const names = ['why', 'aaa']
// }
