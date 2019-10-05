<template>
  <!--监听GoodsListItem的点击-->
  <div class="goods-item" @click="itemClick">
    <!--原生JS监听图片: img.onload = function() {}-->
    <!--Vue使用@load监听每一张图片加载完成，执行imageLoad方法-->
    <!--使用v-lazy代替:src实现图片懒加载-->
    <img v-lazy="showImage" alt="" @load="imageLoad">
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
    computed: {// 添加展示图片的计算方法
      showImage() {
        // 使用逻辑或，如果前面取不到图片（为空），则使用后面的
        return this.goodsItem.image || this.goodsItem.show.img
      }
    },
    methods: {
      imageLoad() {
        // 根据路由进行判断，使得home页和detail页分别监听自己的全局事件，不会发生冲突
        if (this.$route.path.indexOf('/home')) {// 如果在home页中才发送事件
          // 涉及到非父子组件的通信, 因此选择使用$bus（事件总线）
          this.$bus.$emit('itemImageLoad')// 发射itemImageLoad事件（item中的图片被加载完了）
        } else if (this.$route.path.indexOf('/detail')) {// 如果在详情页中才发送事件
          this.$bus.$emit('itemImageLoad')
        }
      },
      itemClick() {
        // 使用push进行详情页的路由跳转
        this.$router.push('/detail/' + this.goodsItem.iid)// 拼接商品的iid
      }
    }
  }
</script>

<style scoped>
  .goods-item {
    padding-bottom: 40px;
    position: relative; /*相对定位，子绝父相*/

    width: 48%; /*让每行显示两张图片*/
  }

  .goods-item img {
    width: 100%;
    border-radius: 5px; /*圆角图片*/
  }

  .goods-info {
    font-size: 12px;
    position: absolute; /*绝对定位，商品信息定位在图片下面*/
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .goods-info p {
    overflow: hidden; /*溢出隐藏*/
    text-overflow: ellipsis; /*文本溢出时显示省略标记（...）*/
    white-space: nowrap; /*规定文字不进行换行*/
    margin-bottom: 3px;
  }

  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .goods-info .collect {
    position: relative;
  }

  .goods-info .collect::before { /*伪元素*/
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>
