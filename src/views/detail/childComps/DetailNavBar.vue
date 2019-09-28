<template>
  <div>
    <nav-bar>
      <!--监听整个left插槽的点击，包含返回按钮-->
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="title">
        <!--使用v-for遍历导航栏，因为可以点击，所以要拿到对象的index-->
        <!--动态绑定class，监听index的点击，改变文字颜色-->
        <div v-for="(item, index) in titles"
             class="title-item"
             :class="{active: index === currentIndex}"
             @click="titleClick(index)">
          {{item}}
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'

  export default {
    name: "DetailNavBar",
    components: {
      NavBar
    },
    data() {
      return {// 保存导航栏中的对象
        titles: ['商品', '参数', '评论', '推荐'],
        currentIndex: 0// 设index下标默认为0
      }
    },
    methods: {
      titleClick(index) {// titles的点击，传入index参数
        this.currentIndex = index
      },
      backClick() {// 返回按钮的点击，
        this.$router.back()// 使用back()或go(-1)通过路由器进行返回
      }
    }
  }
</script>

<style scoped>
  .title {
    display: flex;
    font-size: 13px;
  }

  .title-item {
    flex: 1;
  }

  .active {
    color: var(--color-high-text)
  }

  .back img {
    margin-top: 10px;
  }
</style>
