<template>
  <div class="tab-control">
    <div v-for="(item, index) in titles"
         class="tab-control-item" :class="{active: index === currentIndex}" @click="itemClick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TabControl",
    props: {// 父组件使用props把数据向下传给子组件
      titles: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {//用于改变高亮文字和下边框颜色
      return {
        currentIndex: 0//当前选中的索引
      }
    },
    methods: {
      itemClick(index) {
        this.currentIndex = index;
        this.$emit('tabClick', index)// 子组件使用$emit触发父组件的自定义事件
      }
    }
  }
</script>

<style scoped>
  .tab-control {
    display: flex;
    text-align: center;
    font-size: 15px;
    height: 40px;
    line-height: 40px;/*line-height可以被继承*/
    background-color: #fff;
  }

  .tab-control-item {
    flex: 1;/*距离平分*/
  }

  .tab-control-item span {
    padding: 5px;
  }

  .active {
    color: var(--color-high-text);/*高亮文字颜色*/
  }

  .active span {
    border-bottom: 3px solid var(--color-tint);
  }
</style>
