<template>
  <div id="detail">
    <detail-nav-bar/>
    <!--传入topImages动态展示轮播图-->
    <detail-swiper :top-images="topImages"/>
    <!--传入goods以展示-->
    <detail-base-info :goods="goods"/>
  </div>
</template>

<script>
  import DetailNavBar from './childComps/DetailNavBar'
  import DetailSwiper from './childComps/DetailSwiper'
  import DetailBaseInfo from './childComps/DetailBaseInfo'

  import {getDetail, Goods} from 'network/detail'

  export default {
    name: "Detail",
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo
    },
    data() {// 保存iid
      return {
        iid: null,// 设iid默认为null
        topImages: [],
        goods: null
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
      })
    }
  }
</script>

<style scoped>

</style>