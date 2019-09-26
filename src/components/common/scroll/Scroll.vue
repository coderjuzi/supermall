<template>
  <!--如果ref绑定在组件中，则通过this.$ref.refname获取到的是一个组件对象-->
  <!--如果ref绑定在普通元素中，则通过this.$ref.refname获取到的是一个元素对象-->
  <div class="wrapper" ref="">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll';
  export default {
    name: "Scroll",
    data() {
      return {
        scroll: null
      }
    },
    mounted() {
      this.scroll = new BScroll(document.querySelector('.wrapper'), {

      })
    }
  }
</script>

<style scoped>

</style>
