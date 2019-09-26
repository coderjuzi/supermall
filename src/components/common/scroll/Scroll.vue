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
  import BScroll from 'better-scroll';

  export default {
    name: "Scroll",
    props: {
      probeType: {//创建实时监听的属性
        type: Number,
        default: 0
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
        probeType: this.probeType// 根据传入的值来决定是否实时监听
      })
      // 2. 监听滚动的位置
      this.scroll.on('scroll', (position) => {
        // console.log(position);
        this.$emit('scroll', position)// 自定义'scroll'事件，将position传出去
      })
    },
    methods: {// 添加返回位置和所用时间的方法
      scrollTo(x, y, time=300) {
        this.scroll.scrollTo(x, y, time)
      }
    }
  }
</script>

<style scoped>

</style>
