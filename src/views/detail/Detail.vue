<template>
  <div id="detail">
    <detail-nav-bar/>
    <!--传入topImages动态展示轮播图-->
    <detail-swiper :top-images="topImages"/>
  </div>
</template>

<script>
  import DetailNavBar from './childComps/DetailNavBar'
  import DetailSwiper from './childComps/DetailSwiper'

  import {getDetail} from 'network/detail'

  export default {
    name: "Detail",
    components: {
      DetailNavBar,
      DetailSwiper
    },
    data() {// 保存iid
      return {
        iid: null,// 设iid默认为null
        topImages: []
      }
    },
    created() {
      // 1. 保存传入的iid
      this.iid = this.$route.params.iid
      // 2. 根据iid请求详情数据（抽离数据）
      getDetail(this.iid).then(res => {// 调用getDetail方法
        // a. 获取顶部的轮播图数据
        console.log(res);
        this.topImages = res.result.itemInfo.topImages
      })
    }
  }
</script>

<style scoped>

</style>
