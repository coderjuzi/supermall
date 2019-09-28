<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <!--复制一份tab-control，属性设置为isTabFixed，默认为不可见-->
    <tab-control :titles="['流行', '新款', '精选']"
                 @tabClick="tabClick"
                 ref="tabControl1"
                 class="tab-control"
                 v-show="isTabFixed"/>
    <!--传参时前面加上冒号则会将3/true当做数值型/布尔型传入，否则会被当做字符串-->
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore">
      <!--使用子组件HomeSwiper中的swiperImageLoad方法监听图片的加载-->
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
      <recommend-view :recommends="recommends"/>
      <feature-view/>
      <!--用 v-on 或 @ 语法糖，监听点击事件-->
      <tab-control :titles="['流行', '新款', '精选']"
                   @tabClick="tabClick"
                   ref="tabControl2"/>
      <goods-list :goods="showGoods"/>
    </scroll>
    <!--在监听一个组件的原生事件时，必须给对应事件加上.native修饰符-->
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
  // 子组件
  import HomeSwiper from './childComps/HomeSwiper'
  import RecommendView from './childComps/RecommendView'
  import FeatureView from "./childComps/FeatureView"
  // 公共组件
  import NavBar from 'components/common/navbar/NavBar'
  import TabControl from 'components/content/tabControl/TabControl'
  import GoodsList from 'components/content/goods/GoodsList'
  import Scroll from 'components/common/scroll/Scroll'
  import BackTop from 'components/content/backTop/BackTop'
  // 方法
  import {getHomeMultidata, getHomeGoods} from 'network/home'
  import {debounce} from 'common/utils'

  export default {
    name: "Home",
    components: {
      HomeSwiper,
      RecommendView,
      FeatureView,
      NavBar,
      TabControl,
      GoodsList,
      Scroll,
      BackTop,
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
        currentType: 'pop',// 默认当前类型（第一次展示的为pop）
        isShowBackTop: false,// 默认：不显示
        tabOffsetTop: 0,// offsetTop：当前对象到其上级层顶部的距离
        isTabFixed: false,// 默认：不吸顶
        saveY: 0// 当前位置，默认：0
      }
    },
    computed: {// 使用计算属性代替goods[currentType].list（注意加.this）
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    destroyed() {// 离开页面后，该页面自动销毁
      console.log('home destroyed');
    },
    activated() {// Home活跃时（在Home中）
      this.$refs.scroll.scrollTo(0, this.saveY, 0)// 迅速回到saveY位置
      this.$refs.scroll.refresh()// 滚动回到saveY位置后，进行一次刷新
    },
    deactivated() {// 离开Home时（进入其他页面中）
      this.saveY = this.$refs.scroll.getScrollY()// 拿到并保存当前位置为saveY
    },
    created() {// 使用生命周期函数，发送网络请求
      // 1. 请求多个数据
      this.getHomeMultidata()
      // 2. 请求商品数据
      this.getHomeGoods('pop')// 接收类型
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    // created：在模板渲染成html前调用，即通常初始化某些属性值，然后再渲染成视图
    // mounted：在模板渲染成html后调用，通常是初始化页面完成后，再对html的dom节点进行一些需要的操作
    mounted() {// 使用mounted来确保scroll有值之后再刷新
      // 1. item中图片加载完成的事件监听
      // 为避免refresh函数频繁调用，使用debounce防抖函数
      const refresh = debounce(this.$refs.scroll.refresh, 500)// 延迟半秒刷新
      this.$bus.$on('itemImageLoad', () => {
        refresh()// 调用刷新方法，并将其放入防抖函数中
      })
    },
    methods: {
      /**
       * 事件监听相关的方法
       */
      tabClick(index) {// tabControl的点击监听
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
        // 当点击之后，将两个tab-control的currentIndex统一为最新点击的index
        this.$refs.tabControl1.currentIndex = index;
        this.$refs.tabControl2.currentIndex = index;
      },
      backClick() {
        this.$refs.scroll.scrollTo(0, 0, 500)// 通过ref拿到对象，可以访问其内部属性和方法
      },
      // 1. 判断BackTop是否显示
      contentScroll(position) {// 内容发生滚动时，可以拿到position
        // 将position的y值和1000作对比，当大于1000时显示BackTop图标
        this.isShowBackTop = -(position.y) > 1000// y是一个负值，先转为正数
        // 2. 决定tabControl是否吸顶
        this.isTabFixed = (-position.y) > this.tabOffsetTop// 大于则吸顶
      },
      loadMore() {
        this.getHomeGoods(this.currentType)// 确定当前选中的栏目(type)
      },
      swiperImageLoad(){
        // 获取tabControl的offsetTop
        // 组件没有offsetTop属性，因此要拿到组件中的元素
        // 所有的组件都有一个属性$el：用于获取组件中的元素
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
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
          // push(...nums)函数可以传入多个可变参数
          this.goods[type].list.push(...res.data.list);// 根据类型拿到list，把最新拿到的数据塞入对应list里面
          this.goods[type].page += 1;// 页码+1

          this.$refs.scroll.finishPullUp()// 调用"完成加载更多"的方法
        })
      }
    }
  }
</script>

<style scoped>
  #home {/*首页有id，所以用#*/
    height: 100vh;/*100%视口*/
    position: relative;/*相对定位*/
  }
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;

    /*在使用浏览器原生滚动时，为了让导航不跟随一起滚动*/
    /*现在使用better-scroll局部滚动，所以就不需要对导航进行fixed*/
    /*position: fixed;!*元素的位置相对于浏览器窗口位置固定*!*/
    /*left: 0;*/
    /*right: 0;*/
    /*top: 0;*/
    /*z-index: 9;!*z-index属性指定一个元素的堆叠顺序，拥有更高堆叠顺序的元素总是会处于堆叠顺序较低的元素的前面*!*/
  }

  /*使用better-scroll后，此吸顶效果已失效*/
  /*.tab-control {*/
  /*  !*为tabControl添加吸顶效果，需要定义top属性*!*/
  /*  position: sticky;*/
  /*  top: 44px;!*达到top值前position属性为sticky，达到top值后自动改为fixed*!*/
  /*  z-index: 9;!*防止图片遮挡住tabControl*!*/
  /*}*/

  /*确定中间局部滚动区域的高度*/
  /*方法一：定位*/
  .content {
    overflow: hidden;
    position: absolute;/*绝对定位*/
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
  /*方法二：通过calc计算*/
  /*.content {*/
  /*  height: calc(100% - 93px);*/
  /*  overflow: hidden;*/
  /*  margin-top: 44px;*/
  /*}*/
  .tab-control {
    /*使用相对定位可以使得tabControl保持在原来的位置，而且可以设置z-index*/
    position: relative;
    z-index: 9;/*调整tabControl的堆叠顺序*/
  }
</style>
