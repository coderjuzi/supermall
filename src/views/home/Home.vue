<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <home-swiper :banners="banners"/>
    <recommend-view :recommends="recommends"/>
    <feature-view/>
    <!--用 v-on 或 @ 语法糖，监听点击事件-->
    <tab-control class="tab-control"
                 :titles="['流行', '新款', '精选']" @tabClick="tabClick"/>
    <goods-list :goods="showGoods"/>
  </div>
</template>

<script>
  // 子组件
  import HomeSwiper from './childComps/HomeSwiper';
  import RecommendView from './childComps/RecommendView';
  import FeatureView from "./childComps/FeatureView";
  // 公共组件
  import NavBar from 'components/common/navbar/NavBar';
  import TabControl from 'components/content/tabControl/TabControl';
  import GoodsList from 'components/content/goods/GoodsList';

  // 方法
  import {getHomeMultidata, getHomeGoods} from 'network/home';

  export default {
    name: "Home",
    components: {
      HomeSwiper,
      RecommendView,
      FeatureView,
      NavBar,
      TabControl,
      GoodsList
    },
    data() {
      return {
        // 组件中创建变量banners保存res，不会被内存回收
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []}
        },
        currentType: 'pop'// 默认当前类型（第一次展示的为pop）
      }
    },
    computed: {// 使用计算属性代替goods[currentType].list（注意加.this）
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    created() {// 使用生命周期函数，发送网络请求
      // 1. 请求多个数据
      this.getHomeMultidata()
      // 2. 请求商品数据
      this.getHomeGoods('pop')// 接收类型
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    methods: {
      /**
       * 事件监听相关的方法
       */
      tabClick(index) {
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
        }
      },
      /**
       * 网络请求相关的方法
       */
      getHomeMultidata() {
        // 当.then()前的方法执行完后再执行then()内部的程序，这样就避免了数据没获取到的问题
        getHomeMultidata().then(res => {// 函数执行完，会被内存回收
          // 将数据res赋值给变量，存储在变量banners中，防止数据消失
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
      },
      getHomeGoods(type) {
        const page = this.goods[type].page + 1;// 根据类型拿到最新的页码
        getHomeGoods(type, page).then(res => {// 请求最新的数据
          // push(...nums)函数可以传入可变参数
          this.goods[type].list.push(...res.data.list);// 根据类型拿到list，把最新拿到的数据塞入对应list里面
          this.goods[type].page += 1;// 页码+1
        })
      }
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
    z-index: 9;/*z-index属性指定一个元素的堆叠顺序，拥有更高堆叠顺序的元素总是会处于堆叠顺序较低的元素的前面*/
  }

  .tab-control {
    position: sticky;/*为tabControl添加吸顶效果，需要定义top属性*/
    top: 44px;/*达到top值前position属性为sticky，达到top值后自动改为fixed*/
    z-index: 9;/*防止图片遮挡住tabControl*/
  }
</style>
