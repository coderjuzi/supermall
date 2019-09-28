import {request} from './request'

export function getDetail(iid) {// 导出getDetail方法，需要传入的参数为iid
  return request({
    url: '/detail',
    params: {// 参数
      iid
    }
  })
}
