<template>
  <div>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="姓名">
        <el-input  placeholder="姓名" v-model="queryList.user"></el-input>
      </el-form-item>
      <el-form-item label="地址">
        <el-input placeholder="地址" v-model="queryList.address"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onClear">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        fixed
        prop="updatetime"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="username"
        label="姓名"
        width="120">
      </el-table-column>
      <el-table-column
        prop="province"
        label="省份"
        width="120">
      </el-table-column>
      <el-table-column
        prop="city"
        label="市区"
        width="120">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址"
        width="300">
      </el-table-column>
      <el-table-column
        prop="zip"
        label="邮编"
        width="120">
      </el-table-column>
      <el-table-column
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <template>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </template>
  </div>


</template>

<script>
  import { getRoleList } from '@/api/role'
  import {Message} from 'element-ui'
  export default {
    data() {
      return {
        tableData: null,
        currentPage: 1,
        total: null,
        rowNum:10,
        queryList:{
          page: 1,
          pagesize: 10,
          user: undefined,
          address: undefined
        },
        formInline:{}
      }
    },
    methods: {
      handleClick(row) {
        console.log(row);
      },
      handleSizeChange(val) {
        this.queryList.pagesize = val;
        this.getList()
      },
      handleCurrentChange(val) {
        this.queryList.page = val;
        this.getList()
      },
      getList() {
        getRoleList(this.queryList).then(res => {
          let data = res.data
          console.log(this.tableData)
          if(data.status == 1) {
              this.tableData = data.tableData
              this.total = data.total
              this.currentPage = data.page || 1
              this.rowNum = data.rowNum || 10
          } else {
              Message.error(data.msg)
          }
        })
      },
      onSubmit() {
        console.log('submit!');

        this.getList()
      },
      onClear() {
        this.queryList.address = ''
        this.queryList.user = ''
        this.getList()
      }
    },

    created() {
        this.getList()
    },

  }
</script>
