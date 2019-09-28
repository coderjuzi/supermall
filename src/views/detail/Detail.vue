<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav"/>
    <!--使用封装好的Scroll包裹详情页需要滚动的部分，必须设置固定高度-->
    <scroll class="content" ref="scroll">
      <!--传入topImages动态展示轮播图-->
      <detail-swiper :top-images="topImages"/>
      <!--传入goods以展示-->
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <!--监听商品详情图片的加载，调用imageLoad-->
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
    </scroll>
  </div>
</template>

<script>
  import DetailNavBar from './childComps/DetailNavBar'
  import DetailSwiper from './childComps/DetailSwiper'
  import DetailBaseInfo from './childComps/DetailBaseInfo'
  import DetailShopInfo from './childComps/DetailShopInfo'
  import DetailGoodsInfo from './childComps/DetailGoodsInfo'

  import Scroll from 'components/common/scroll/Scroll'

  import {getDetail, Goods, Shop} from 'network/detail'

  export default {
    name: "Detail",
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      Scroll
    },
    data() {// 保存iid
      return {
        iid: null,// 设iid默认为null
        topImages: [],
        goods: {}, // 设goods默认为空对象
        shop: {},
        detailInfo: {}// 变量对应的是对象
      }
    },
    created() {
      // 1. 保存传入的iid
      this.iid = this.$route.params.iid
      // 2. 根据iid请求详情数据（抽离数据）
      getDetail(this.iid).then(res => {// 调用getDetail方法
        // a. 获取顶部的轮播图数据
        console.log(res);
        const data = res.result;// 定义data作为中转，方便下面使用
        this.topImages = data.itemInfo.topImages
        // b. 获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
        // c. 创建店铺信息的对象
        this.shop = new Shop(data.shopInfo)
        // d. 保存商品详情数据
        this.detailInfo = data.detailInfo
      })
    },
    methods: {
      imageLoad() {// 图片加载完后进行刷新，避免出现因高度问题而无法滚动
        this.$refs.scroll.refresh()
      }
    }
  }
</script>

<style scoped>
  #detail {/*调整层级关系，使得详情页能够覆盖tabBar*/
    position: relative;/*相对定位可以保证原来的位置，并可以设置z-index*/
    z-index: 9;
    background-color: #fff;/*调整背景颜色，使其完全覆盖tabBar*/
    height: 100vh;/*100vh：100%相对于视口的高度*/
  }

  .content {/*设置滚动区域的固定高度*/
    height: calc(100% - 44px);/*100%是相对于父元素设置的，父元素必须要设置高度*/
  }

  .detail-nav{/*调整层级关系，使得导航栏能够覆盖详情页内容*/
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
</style>
