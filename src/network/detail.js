import {request} from './request'

export function getDetail(iid) {// 导出getDetail方法，需要传入的参数为iid
  return request({
    url: '/detail',
    params: {// 参数
      iid
    }
  })
}
// 整合商品信息
// 将服务器返回的数据先封装到一个类中，再创建对应类的对象
// 然后将对象传入下一层组件中，最后组件展示对象
export class Goods {// 导出商品详情
  constructor(itemInfo, columns, services) {// 使用构造函数
    this.title = itemInfo.title
    this.desc = itemInfo.desc
    this.newPrice = itemInfo.price
    this.oldPrice = itemInfo.oldPrice
    this.discount = itemInfo.discountDesc
    this.columns = columns
    this.services = services
    this.realPrice = itemInfo.lowNowPrice
  }
}
// 整合店铺信息
export class Shop {
  constructor(shopInfo) {
    this.logo = shopInfo.shopLogo;
    this.name = shopInfo.name;
    this.fans = shopInfo.cFans;
    this.sells = shopInfo.cSells;
    this.score = shopInfo.score;
    this.goodsCount = shopInfo.cGoods
  }
}


export class GoodsParam {
  constructor(info, rule) {
    // 注: images可能没有值(某些商品有值, 某些没有值)
    this.image = info.images ? info.images[0] : '';
    this.infos = info.set;
    this.sizes = rule.tables;
  }
}
