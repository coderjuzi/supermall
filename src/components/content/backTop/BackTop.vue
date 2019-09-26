<template>
  <div class="back-top">
    <img src="~assets/img/common/top.png" alt="">
  </div>
</template>

<script>
  export default {
    name: "BackTop"
  }
</script>

<style scoped>
  .back-top {/*设置小图标位置*/
    position: fixed;/*设置元素位置相对于浏览器窗口固定，即使窗口滚动也不会移动*/
    right: 8px;
    bottom: 55px;
  }

  .back-top img {/*设置小图标尺寸*/
    width: 43px;
    height: 43px;
  }
</style>
