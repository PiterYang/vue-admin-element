<template>
  <el-container :class="classObj1">
    <el-aside width="auto">
      <navbar class="sidebar-container1"></navbar>
    </el-aside>
    <el-container class="app-main">
      <el-header>
        <myheader></myheader>
      </el-header>
      <el-main>
        <myMain></myMain>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
  import Myheader from './myheader.vue'
  import myMain from './main'
  import Navbar from './navbar'
  export default {
    components: {
      myMain,
      Navbar,
      Myheader
    },
    computed: {
      sidebar1() {
        return this.$store.state.app.sidebarSwitch
      },
      classObj1() {
        return {
          my_hide_side: !this.sidebar1
        }
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .el-header{
    padding: 0 5px;
  }
  .my_hide_side {
    .sidebar-container1 {
      position: fixed;
      font-size: 0px;
      top: 0;
      bottom: 0;
      left: 0;
      z-index: 1001;
      overflow: hidden;
      width: 220px !important;
    }
  }
  .sidebar-container1 {
    position: fixed;
    font-size: 0px;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 1001;
    overflow: hidden;
    width: 63px !important;
  }
  .app-main{
    margin-left: 70px;
    width: 100%;
  }
  .my_hide_side {
    .app-main{
      margin-left: 220px;
      width: 100%;
    }
  }
</style>
