<template>
  <!--如果ref绑定在组件中，则通过this.$ref.refname获取到的是一个组件对象-->
  <!--如果ref绑定在普通元素中，则通过this.$ref.refname获取到的是一个元素对象-->
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    name: "Scroll",
    props: {
      probeType: {//创建实时监听的属性
        type: Number,
        default: 0
      },
      pullUpLoad: {// 添加上拉加载属性
        type: Boolean,
        default: false// 默认：不需要
      }
    },
    data() {
      return {
        scroll: null,
        message: '哈哈哈'
      }
    },
    mounted() {
      // 1. 创建BScroll对象
      this.scroll = new BScroll(this.$refs.wrapper, {
        click: true, //设置click为true, 则div才能监听点击，TabControl才能正常切换
        probeType: this.probeType,// 根据传入的值来决定是否实时监听
        pullUpLoad: this.pullUpLoad
      })
      // 2. 监听滚动的位置
      if (this.probeType === 2 || this.probeType === 3){
        this.scroll.on('scroll', (position) => {
          // console.log(position);
          this.$emit('scroll', position)// 自定义'scroll'事件，将position传出去
        })
      }
      // 3. 监听scroll滚动到底部
      if (this.pullUpLoad) {// 添加判断，在有pullUpLoad时才监听
        this.scroll.on('pullingUp', () => {
          this.$emit('pullingUp')
        })
      }
    },
    methods: {// 添加"返回位置和所用时间"的方法
      scrollTo(x, y, time=300) {
        // 逻辑与：先判断scroll对象有没有值（是否为null）
        this.scroll && this.scroll.scrollTo(x, y, time)
      },
      finishPullUp() {// 添加"完成加载更多"的方法
        this.scroll && this.scroll.finishPullUp()// 先判断scroll是否有值，若有则调用finishPullUp方法
      },
      refresh() {// 添加刷新的方法
        this.scroll && this.scroll.refresh()
      },
      getScrollY() {// 添加拿到saveY值的方法
        // 判断scroll是否有值，若有则通过.y取出该值，若无则返回0
        return this.scroll ? this.scroll.y : 0
      }
    }
  }
</script>

<style scoped>

</style>
