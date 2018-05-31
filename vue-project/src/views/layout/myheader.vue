<template>
  <div class="myHeader">
    <div class="switchNav" @click="switchSidebar">
      <svg-icon icon-class="switchNav" class="" />
    </div>
    <el-breadcrumb separator="/" class="myBreadcrumb">
      <el-breadcrumb-item :to="{ path: '/' }"  class="myBreadcrumb">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{path: $route.path}">{{$route.name}}</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="useInfo">
      <span>你好{{roles[0]}}</span>
      <span @click="logout">
        <svg-icon icon-class="logout" ></svg-icon>
      </span>

    </div>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  export default {
    computed: {
      ...mapGetters([
        'roles',
      ])
    },
    methods: {
      switchSidebar: function() {
        this.$store.dispatch('switchSidebar')
      },
      logout: function () {
        this.$store.dispatch('FedLogOut')
        location.reload()
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .myBreadcrumb{
    color:#000;
  }
  .myHeader{
    border-bottom:1px solid #eee;
    overflow: hidden;
    color:#000;
  }
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
    float: left;
  }
  .useInfo {
    float: right;
    display: inline-block;
    line-height: 60px;
    margin-right: 40px;
  }
  .logout {
    width: 60px;
    height: 60px;
  }
</style>
