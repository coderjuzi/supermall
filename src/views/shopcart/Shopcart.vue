<template>
  <div class="cart">
    <!--导航-->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{length}})</div>
    </nav-bar>
    <!--商品的列表-->
    <cart-list/>
    <!--底部汇总-->
    <cart-bottom-bar/>

  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import cartList from './childComps/CartList'
  import CartBottomBar from './childComps/CartBottomBar'

  import {mapGetters} from 'vuex'
  // 从vuex框架中导入

  export default {
    name: 'Shopcart',
    components: {
      NavBar,
      cartList,
      CartBottomBar
    },
    computed: {
      // mapGetters辅助函数将store中的getter映射到局部计算属性
      // 方法一：数组语法（使用原数组元素名）
      // ...mapGetters(['cartLength', 'cartList'])//进行解构，将getters.js中的东西转换为计算属性

      // 方法二：对象语法（可以自定义对象名）
      ...mapGetters({
        length: 'cartLength',
        list: 'cartList'
      })
    }
  }
</script>

<style scoped>
  .cart {
    height: 100vh;
  }
  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
    /*font-weight: 700;!*加粗*!*/
  }
</style>
