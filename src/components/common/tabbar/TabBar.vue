<template>
  <div id="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'TabBar'
}
</script>
<style scoped>
  #tab-bar {
    /*按照flex布局*/
    display: flex;
    /*设置背景色*/
    background-color: #f6f6f6;
    /*设置tabBar位置到页面底部*/
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    /*设置tabBar到页面主体的阴影过度*/
    /*box-shadow: x轴偏移量 y轴偏移量 模糊程度 颜色*/
    box-shadow: 0px -1px 1px rgba(100,100,100,.1);
  }
</style>
