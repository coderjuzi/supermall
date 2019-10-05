<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button :is-checked="isSelectAll" class="check-button"/>
      <span>全选</span>
    </div>
    <div class="total-price">
      合计： {{totalPrice}}
    </div>
    <div class="calculate">
      去结算({{checkedLength}})
    </div>
  </div>
</template>

<script>
  import CheckButton from 'components/content/checkButton/CheckButton'

  import {mapGetters} from 'vuex'

  export default {
    name: "CartBottomBar",
    components: {
      CheckButton
    },
    computed: {
      ...mapGetters(['cartList']),
      totalPrice() {// 添加计算属性，计算总价
        return '￥' + this.cartList.filter(item => {// 对购物车中的商品进行过滤
          return item.checked// 返回已选中的商品
        }).reduce((preValue, item) => {
          return preValue + item.newPrice * item.count // 返回总价格
        }, 0).toFixed(2)// 保留两位小数
      },
      checkedLength() {
        return this.cartList.filter(item => item.checked).length
      },
      isSelectAll() {// 添加计算属性，判断是否全部选中
        // 判断，如果购物车为空，则返回false
        if(this.cartList.length === 0) return false

        // 方法一：使用高阶函数filter
        // 从数组中找到未选中的item，如果有则数组有长度，取反，返回false
        // return !(this.cartList.filter(item => !item.checked).length)// 需要遍历完，性能不高

        // 方法二：使用高阶函数find
        // 如果查找到有未选中的item，取反，返回false
        return !this.cartList.find(item => !item.checked)

        // 方法三：使用普通的遍历
        // for (let item of this.cartList) {
        //   if(!item.checked) {
        //     return false
        //   }
        // }
        // return true
      }
    }
  }
</script>

<style scoped>
  .bottom-bar {
    position: relative;/*相对定位*/
    display: flex;

    height: 40px;
    line-height: 40px;

    background-color: #eee;
    font-size: 14px;
  }

  .check-content {
    display: flex;
    align-items: center;
    margin-left: 10px;
    width: 60px;
  }

  .check-button {
    width: 20px;
    height: 20px;
    line-height: 20px;
    margin-right: 5px;
  }

  .total-price {
    margin-left: 20px;
    flex: 1;
  }

  .calculate {
    width: 90px;
    background-color: red;
    color: #fff;
    text-align: center;
  }
</style>
