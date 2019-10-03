<template>
  <!--动态绑定isChecked属性-->
  <div class="check-button" :class="{check: isChecked}">
    <img src="~assets/img/cart/tick.svg" alt="">
  </div>
</template>

<script>
  export default {
    name: "CheckButton",
    props: {
      isChecked: {// 添加是否选中的属性
        type: Boolean,
        default: false
      }
    }
  }
</script>

<style scoped>
  .check-button {
    border-radius: 50%;
    border: 2px solid var(--color-tint);
  }
  .check {/*按钮选中后边框颜色*/
    border-color: red;
    background-color: var(--color-tint);
  }
</style>
