<template>
  <swiper>
    <swiper-item v-for="item in banners" >
      <!--动态绑定要加冒号-->
      <a :href="item.link">
      <!--使用@load监听图片是否加载完毕，以确定offsetTop的距离-->
        <img :src="item.image" alt="" @load="imageLoad">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
  import {Swiper, SwiperItem} from 'components/common/swiper';

  export default {
    name: "HomeSwiper",
    props: {// 获取数据
      banners: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data(){// 使用一个变量isLoad，来通知之前监听事件是否已经发出
      return {
        isLoad: false// 默认加载情况设为false
      }
    },
    components: {
      Swiper,
      SwiperItem
    },
    methods: {// 添加图片加载监听的方法
      imageLoad() {
        if (!this.isLoad){// 如果还没有加载
          // 因为轮播图中有4张图片，所以监听射出去了4次事件
          this.$emit('swiperImageLoad')// 只需要发出1次，因为只需要获取1个高度即可
          this.isLoad = true// 此时将isLoad设置为true，使得循环只会执行一次
        }
      }
    }
  }
</script>

<style scoped>

</style>
