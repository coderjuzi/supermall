<template>
  <!--监听鼠标点击-->
  <div class="tab-bar-item" @click="itemClick">
    <!--动态的展示tabBar中的图片和文字-->
    <!--给插槽外包一个div，在插槽被替换后，可保证原本设置的属性不会被替换掉-->
    <div v-if="!isActive"> <slot name="item-icon"></slot></div>
    <div v-else> <slot name="item-icon-active"></slot></div>
    <!--外包div并添加class，插槽被替换后，文字颜色可正常继承-->
    <!--<div :class="{active:isActive}"> <slot name="item-text"></slot></div>-->
    <!--上面的class行不通，颜色需要动态绑定style样式-->
    <div :style="activeStyle"> <slot name="item-text"></slot></div>
  </div>
</template>

<script>
export default {
  name: 'TabBarItem',
  props: {
    path: String, // 为replace()传入跳转路径
    activeColor: {// 添加活跃时文字颜色属性
      type: null,
      default: '#FF5777'// 设置默认颜色（无颜色传入时使用）
    }
  },
  data () {
    return {
      // isActive: true// 点击变量不能写死，也不能动态传入
    }
  },
  computed: {// 添加计算属性，动态的决定被点击的对象是哪个
    isActive () {
      // 当前的path为/home
      // /home -> item1(/home) = true
      // /home -> item1(/category) = false
      // /home -> item1(/shopcart) = false
      // /home -> item1(/profile) = false
      // 哪个路由活跃就是哪个对象（只有一个活跃），拿到处于活跃状态的路由的path
      return this.$route.path.indexOf(this.path) !== -1// indexOf不等于-1，就是找到了，则返回true，其他返回false
    },
    activeStyle () { // 添加style样式的计算属性
      // 判断当前对象是否处于活跃状态，若是则给样式传入动态获取的activeColor，否则传入空
      return this.isActive ? {color: this.activeColor} : {}
    }
  },
  methods: {// 添加鼠标点击监听的方法
    itemClick () {
      // console.log('itemClick')// 测试监听
      this.$router.replace(this.path)// replace中的值需要外面传进来
    }
  }
}
</script>
<style scoped>
  /*每个div都设置相同class，同时对所有div进行操作*/
  .tab-bar-item{
    /*设置均等分*/
    flex: 1;
    /*设置居中*/
    text-align: center;
    /*tabBar常用高度为49*/
    height: 49px;
    /*调整文字大小*/
    font-size: 14px;
  }
  .tab-bar-item img{
    /*设置图片的宽高*/
    width: 24px;
    height: 24px;
    /*设置上内边距*/
    margin-top: 3px;
    /*去掉图片下方的3个像素，设置为2个像素*/
    vertical-align: middle;
    margin-bottom: 2px;
  }
  /*颜色不能写死，需要动态的来决定*/
  /*.active {*/
  /*  color: #FF5777;*/
  /*}*/
</style>
