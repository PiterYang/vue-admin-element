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
      <el-form-item>
        <el-button type="primary" @click="add">新增</el-button>
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
        prop="roles"
        label="角色"
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
          <el-button type="text" size="small" @click="handleClick(scope.row)" >编辑</el-button>
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

    <el-dialog
      title="roleEdit"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose">
      <el-form label-position="left" :rules="rules" label-width="80px" :model="formLabelAlign" ref="myForm">
        <el-form-item label="日期" prop="updatetime">
          <el-col :span="11">
            <el-form-item >
              <el-date-picker type="date" placeholder="选择日期" v-model="formLabelAlign.updatetime" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="姓名" prop="username">
          <el-input v-model="formLabelAlign.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" v-if="!formLabelAlign.id" prop="password">
          <el-input v-model="formLabelAlign.password"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="roles">
          <el-input v-model="formLabelAlign.roles"></el-input>
        </el-form-item>
        <el-form-item label="省份" prop="province">
          <el-input v-model="formLabelAlign.province"></el-input>
        </el-form-item>
        <el-form-item label="市区" prop="city">
          <el-input v-model="formLabelAlign.city"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="formLabelAlign.address"></el-input>
        </el-form-item>
        <el-form-item label="邮编" prop="zip">
          <el-input v-model.number="formLabelAlign.zip"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary" @click="submit('myForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import { getRoleList, roleEdit, roleAdd } from '@/api/role'
  import {Message} from 'element-ui'
  export default {
    data() {
      return {
        tableData: null,
        currentPage: 1,
        total: null,
        rowNum:10,
        dialogVisible: false,//弹窗是否显示
        queryList:{
          page: 1,
          pagesize: 10,
          user: undefined,
          address: undefined
        },
        formInline:{},
        formLabelAlign: {
          username: '',
          province: '',
          zip: '',
          updatetime: '',
          city: '',
          address: '',
          roles: '',
          password: '',
          id: ''
        },
        rules: {
          password: [{
            required: true,
            message: '请输入用户密码',
            trigger: 'blur',
          }],
          username: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          zip: [{
            required: true,
            type: 'number'
          }],
          updatetime: [{
            required: true,
            message: '请输入时间',
            trigger: 'change'
          }]
        }
      }
    },
    methods: {
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
      },
      handleClose(done) {
        this.$refs['myForm'].resetFields();
        done()
      },
      handleClick(data) {
        console.log(data)
        this.dialogVisible = ! this.dialogVisible;
        this.formLabelAlign  = Object.assign({}, data) //copy obj
        console.log(this.formLabelAlign)
      },
      closeDialog() {
        this.$refs['myForm'].resetFields();
        this.dialogVisible = false
      },
      submit(formName) {
        console.log(this.$refs[formName].validate())
        this.$refs[formName].validate((valid,obj) => {
          console.log(valid)
          console.log(obj)
          if (valid) {
            let submitData = {}
            submitData.id = this.formLabelAlign.id
            submitData.address = this.formLabelAlign.address
            submitData.province = this.formLabelAlign.province
            submitData.updatetime = this.formLabelAlign.updatetime
            submitData.city = this.formLabelAlign.city
            submitData.roles = this.formLabelAlign.roles
            submitData.zip = this.formLabelAlign.zip
            submitData.username = this.formLabelAlign.username
            if(submitData.id) {
              roleEdit(submitData).then((res) => {
                console.log(res)
                if(res.data.status == 1) {
                  this.dialogVisible = false
                  this.getList()
                } else {
                  Message.error(res.data.msg)
                }

              })
            } else {
              submitData.password = this.formLabelAlign.password
              roleAdd(submitData).then((res) => {
                if(res.data.status == 1) {
                  this.dialogVisible = false
                  this.getList()
                } else {
                  Message.error(res.data.msg)
                }
              })
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });



      },
      add() {
        this.dialogVisible = true
        this.formLabelAlign.id = ''
        this.formLabelAlign.address = ''
        this.formLabelAlign.province = ''
        this.formLabelAlign.updatetime = ''
        this.formLabelAlign.city = ''
        this.formLabelAlign.roles = ''
        this.formLabelAlign.zip = ''
        this.formLabelAlign.username = ''
        this.formLabelAlign.password = ''
      }
    },

    created() {
        this.getList()
    },

  }
</script>
