<template>
  <div class="goods-item">
    <!--原生JS监听图片: img.onload = function() {}-->
    <!--Vue使用@load监听每一张图片加载完成，执行imageLoad方法-->
    <img :src="goodsItem.show.img" alt="" @load="imageLoad">
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "GoodsListItem",
    props: {
      goodsItem: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    methods: {
      imageLoad() {
        this.$bus.$emit('itemImageLoad')// 事件总线，发射itemImageLoad事件（item中的图片被加载完了）
      }
    }
  }
</script>

<style scoped>
  .goods-item {
    padding-bottom: 40px;
    position: relative;/*相对定位，子绝父相*/

    width: 48%;/*让每行显示两张图片*/
  }

  .goods-item img {
    width: 100%;
    border-radius: 5px;/*圆角图片*/
  }

  .goods-info {
    font-size: 12px;
    position: absolute;/*绝对定位，商品信息定位在图片下面*/
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .goods-info p {
    overflow: hidden;/*溢出隐藏*/
    text-overflow: ellipsis;/*文本溢出时显示省略标记（...）*/
    white-space: nowrap;/*规定文字不进行换行*/
    margin-bottom: 3px;
  }

  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .goods-info .collect {
    position: relative;
  }

  .goods-info .collect::before {/*伪元素*/
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>
