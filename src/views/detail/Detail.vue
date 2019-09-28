<template>
<div>{{iid}}</div>
</template>

<script>
  export default {
    name: "Detail",
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
