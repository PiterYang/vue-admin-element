<template>
  <el-container>
    <el-aside width="auto">
      <navbar></navbar>
    </el-aside>
    <el-container>
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
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .el-header{
    padding: 0 5px;
  }
</style>
