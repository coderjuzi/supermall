<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"/>
    <!--使用封装好的Scroll包裹详情页需要滚动的部分，必须设置固定高度-->
    <!--probe-type的默认值在Scroll中是0，这里需要 传入3才能对position进行监听-->
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll">
      <!--传入topImages动态展示轮播图-->
      <detail-swiper :top-images="topImages"/>
      <!--传入goods以展示-->
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <!--监听商品详情图片的加载，调用imageLoad-->
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <!--传入paramInfo属性-->
      <detail-param-info ref="param" :param-info="paramInfo"/>
      <detail-comment-info ref="comment" :comment-info="commentInfo"/>
      <goods-list ref="recommend" :goods="recommends"/>
    </scroll>
    <detail-bottom-bar/>
  </div>
</template>

<script>
  import DetailNavBar from './childComps/DetailNavBar'
  import DetailSwiper from './childComps/DetailSwiper'
  import DetailBaseInfo from './childComps/DetailBaseInfo'
  import DetailShopInfo from './childComps/DetailShopInfo'
  import DetailGoodsInfo from './childComps/DetailGoodsInfo'
  import DetailParamInfo from './childComps/DetailParamInfo'
  import DetailCommentInfo from './childComps/DetailCommentInfo'
  import DetailBottomBar from './childComps/DetailBottomBar'

  import Scroll from 'components/common/scroll/Scroll'
  import GoodsList from 'components/content/goods/GoodsList'

  import {getDetail, Goods, Shop, GoodsParam, getRecommend} from 'network/detail'
  import {debounce} from 'common/utils'

  export default {
    name: "Detail",
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailBottomBar,
      Scroll,
      GoodsList
    },
    data() {// 保存iid
      return {
        iid: null,// 设iid默认为null
        topImages: [],
        goods: {}, // 设goods默认为空对象
        shop: {},
        detailInfo: {},// 变量对应的是对象
        paramInfo: {},
        commentInfo: {},
        recommends: [],
        themeTopYs: [],// 导航栏中4个对象对应的高度
        getThemeTopY: null,
        currentIndex: 0
      }
    },
    created() {
      // 1. 保存传入的iid
      this.iid = this.$route.params.iid
      // 2. 根据iid请求详情数据（抽离数据）
      getDetail(this.iid).then(res => {// 调用getDetail方法
        console.log(res);
        // 2.1 获取顶部的轮播图数据
        const data = res.result;// 定义data作为中转，方便下面使用
        this.topImages = data.itemInfo.topImages
        // 2.2 获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
        // 2.3 获取店铺信息
        this.shop = new Shop(data.shopInfo)
        // 2.4 获取商品详情数据
        this.detailInfo = data.detailInfo
        // 2.5 获取参数信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
        // 2.6 获取评论信息
        if(data.rate.cRate !== 0) {// 做判断，如果有评论信息
          this.commentInfo = data.rate.list[0]// 取出一条评论
        }
      })
      // 3. 请求推荐数据
      getRecommend().then(res => {
        this.recommends = res.data.list
      })
      // 4. 给getThemeTopY赋值（对给this.themeTopYs赋值的操作进行防抖）
      this.getThemeTopY = debounce(() => {// 多次被使用，因此生成防抖函数
        // 拿到对应的4个相对顶部的高度offsetTop
        // 图片加载完成后，获得最新的高度数据，对应的DOM是已经被渲染出来
        this.themeTopYs = []
        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.param.$el.offsetTop)// 组件需要用$el去拿offsetTop
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        this.themeTopYs.push(Number.MAX_VALUE)// 追加一个非常大的值

        console.log(this.themeTopYs);
      }, 100)// 设置delay
    },
    mounted() {
      // 监听详情页图片的加载
      const refresh = debounce(this.$refs.scroll.refresh, 500)// 延迟半秒刷新
      this.itemImgListener = () => {
        refresh()
      }
      this.$bus.$on('itemImageLoad', this.itemImgListener)
    },
    destroyed() {// 使用$off取消itemImgListener
      this.$bus.$off('itemImageLoad', this.itemImgListener)
    },
    methods: {
      imageLoad() {// 图片加载完后进行刷新，避免出现因高度问题而无法滚动
        this.$refs.scroll.refresh()
        this.getThemeTopY()// 调用防抖函数
      },
      titleClick(index) {
        this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200)// Y为负值
      },
      contentScroll(position) {
        // 1. 获取y值
        const positionY = -position.y// 给y值取反
        // 2. ppsitionY和主题中的值进行对比
        // 例如：[0, 13797, 15069, 15285, Number.MAX_VALUE]
        // positionY 在 0 和 13797 之间，index = 0
        // positionY 在 13797 和 15069 之间，index = 1
        // positionY 在 15069 和 15285 之间，index = 2
        // positionY 在 15285 和 非常大的值 之间，index = 3
        let length = this.themeTopYs.length
        // 遍历数组（最后一层不需要遍历）
        for(let i = 0; i < length-1; i++) {// i=0，使得i为number类型
          // 防止赋值过于频繁 this.currentIndex !== i
          if (this.currentIndex !== i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])) {
              this.currentIndex = i;
              this.$refs.nav.currentIndex = this.currentIndex;
          }
        }
      }
    }
  }
</script>

<style scoped>
  #detail { /*调整层级关系，使得详情页能够覆盖tabBar*/
    position: relative; /*相对定位可以保证原来的位置，并可以设置z-index*/
    z-index: 9;
    background-color: #fff; /*调整背景颜色，使其完全覆盖tabBar*/
    height: 100vh; /*100vh：100%相对于视口的高度*/
  }

  .content { /*设置滚动区域的固定高度*/
    height: calc(100% - 44px - 49px); /*100%是相对于父元素设置的，父元素必须要设置高度*/
  }
  /*.content {*/
  /*  position: absolute;*/
  /*  top: 44px;*/
  /*  bottom: 60px;*/
  /*}*/

  .detail-nav { /*调整层级关系，使得导航栏能够覆盖详情页内容*/
    position: relative;
    z-index: 1;
    background-color: #fff;
  }
</style>
