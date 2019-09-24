<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import {getHomeMultidata} from 'network/home'

  export default {
    name: "Home",
    components: {
      NavBar
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
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
  }
</style>
