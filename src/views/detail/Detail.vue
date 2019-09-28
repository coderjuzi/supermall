<template>
  <div id="detail">
    <detail-nav-bar></detail-nav-bar>
  </div>
</template>

<script>
  import DetailNavBar from './childComps/DetailNavBar'

  export default {
    name: "Detail",
    components: {
      DetailNavBar
    },
    data() {// 保存iid
      return {
        iid: null// 设iid默认为null
      }
    },
    created() {// 获取iid
      this.iid = this.$route.params.iid
    }
  }
</script>

<style scoped>

</style>
