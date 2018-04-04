<template>
  <div>
    <div class="switchNav" @click="switchSidebar">
      <svg-icon icon-class="switchNav" class="" />
    </div>
    <el-breadcrumb separator="/" class="myBreadcrumb">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{path: $route.path}">{{$route.name}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<script>
  export default {
    methods: {
      switchSidebar: function() {
        console.log(111111111)
        this.$store.dispatch('switchSidebar')
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .el-breadcrumb__item {
    line-height:60px;
  }
  .switchNav {
    float: left;
    line-height:60px;
    font-size:26px;
  }
  .myBreadcrumb {
    margin-left: 35px;
  }
</style>
