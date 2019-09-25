<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <home-swiper :banners="banners"/>
    <recommend-view :recommends="recommends"/>
    <feature-view/>
    <ul>
      <li>列表1</li>
      <li>列表2</li>
      <li>列表3</li>
      <li>列表4</li>
      <li>列表5</li>
      <li>列表6</li>
      <li>列表7</li>
      <li>列表8</li>
      <li>列表9</li>
      <li>列表10</li>
    </ul>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar';
  import HomeSwiper from './childComps/HomeSwiper';
  import RecommendView from './childComps/RecommendView';
  import FeatureView from "./childComps/FeatureView";

  import {getHomeMultidata} from 'network/home';

  export default {
    name: "Home",
    components: {
      NavBar,
      HomeSwiper,
      RecommendView,
      FeatureView
    },
    data() {
      return {
        // 组件中创建变量banners保存res，不会被内存回收
        banners: [],
        recommends: []
      }
    },
    created() {// 使用生命周期函数，发送网络请求
      // 1. 请求多个数据
      // 当.then()前的方法执行完后再执行then()内部的程序，这样就避免了数据没获取到的问题
      getHomeMultidata().then(res => {// 函数执行完，会被内存回收
        // 将数据res赋值给变量，存储在变量banners中，防止数据消失
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      })
    }
  }
</script>

<style scoped>
  #home {/*首页有id，所以用#*/
    padding-top: 44px;/*给顶部一个内边距，轮播图就可以完整的显示出来*/
  }
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;

    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;/* z-index较大的元素会覆盖较小的一个*/
  }
</style>
