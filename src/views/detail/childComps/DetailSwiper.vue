<template>
  <swiper class="detail-swiper">
    <!--v-for遍历展示topImages中的item-->
    <swiper-item v-for="item in topImages">
      <img :src="item" alt="">
    </swiper-item>
  </swiper>
</template>

<script>
  // 用轮播图进行展示
  import {Swiper, SwiperItem} from 'components/common/swiper'

  export default {
    name: "DetailSwiper",
    components: {
      Swiper,
      SwiperItem
    },
    props: {// 详情页面顶部轮播图属性
      topImages: {// 拿topImages数据去展示
        type: Array,
        default() {
          return []
        }
      }
    }
  }
</script>

<style scoped>
  .detail-swiper {
    height: 300px;/*给轮播图设定高度*/
    overflow: hidden;/*超出部分隐藏*/
  }
</style>
