<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item :to="{ path: '/' }">数据库</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  name: "DataSourceInfo",
  data() {
    return {}
  },
  created() {
    this.$api.DataSourceInfoApi.getList().then(resp => {
      console.log(resp)
    })
  }
}
</script>

<style scoped>

</style>