<template>
  <div class="goods">
    <goods-list-item v-for="item in goods" :goods-item="item"/>
  </div>
</template>

<script>
  import GoodsListItem from "./GoodsListItem";

  export default {
    name: "GoodsList",
    components: {
      GoodsListItem
    },
    props: {
      goods: {
        type: Array,
        default() {
          return []
        }
      }
    }
  }
</script>

<style scoped>
  .goods {
    display: flex;
    flex-wrap: wrap;/*让弹性盒元素在必要的时候拆行，默认为nowrap不拆行*/
    justify-content: space-around;/*设置项目位于各行之前、之间、之后都留有空白的容器内（均等分）*/
    padding: 2px;/*微调元素左右空白部分的宽度，使其大致相等*/
  }
</style>
