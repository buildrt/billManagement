<template>
  <div id="show">
    <div id="head">
      <el-form
        :inline="true"
        :model="searchUserData"
        :rules="searchUserRules"
        ref="searchUserData"
        id="profileSearch">
        <el-form-item class="profileElfrom" label="用户名" prop="clientName">
          <el-input id="name" type="text" v-model="searchUserData.clientName"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="SearchProfile('searchUserData')" style="margin-left: 50px">查询</el-button>
          <el-button type="success" :disabled="!$store.state.isAdmin" icon="el-icon-edit" @click="addDrawer = true" style="margin-left: 50px">添加用户</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table
      id="userInfo"
      :data="UserData.slice((currpage-1)*pagesize,currpage*pagesize)"
      height="64%"
      style="width: 96%"
      border>
      <el-table-column
        fixed
        prop="clientId"
        width="160"
        label="用户ID">
      </el-table-column>
      <el-table-column
        prop="clientName"
        width="160"
        fixed
        label="用户名">
      </el-table-column>
      <el-table-column
        prop="name"
        width="140"
        fixed
        label="真实姓名">
      </el-table-column>
      <el-table-column
        prop="crId"
        width="140"
        fixed
        label="用户角色">
      </el-table-column>
      <el-table-column
        prop="phoneNumber"
        width="200"
        label="电话">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="UserCheck(scope.$index, scope.row)">查看</el-button>
          <el-button
            size="mini"
            :disabled="!$store.state.isAdmin"
            @click="UserEdit(scope.$index, scope.row)">修改</el-button>
          <el-button
            size="mini"
            type="danger"
            :disabled="!$store.state.isAdmin"
            @click="UserDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      id="foot"
      @current-change="handleCurrentChange"
      :current-page="currpage"
      :page-sizes="[2, 4, 6, 8]"
      :page-size="pagesize"
      layout="total, sizes,prev, pager, next, jumper"
      :total="UserData.length">
    </el-pagination>
    <el-drawer
      title="查看信息"
      id="checkInfo"
      :visible.sync="checkDrawer"
      direction="rtl"
      size="30%">
      <p>用户ID：{{this.checkData.clientId}}</p>
      <p>用户名：{{this.checkData.clientName}}</p>
      <p>真实姓名：{{this.checkData.name}}</p>
      <p>用户电话：{{this.checkData.phoneNumber}}</p>
      <p>用户角色：{{this.checkData.crId}}</p>
    </el-drawer>
    <el-drawer
      title="修改信息"
      id="editInfo"
      :visible.sync="editDrawer"
      direction="rtl"
      size="30%">
      <el-form
        :model="editData"
        :rules="editRules"
        ref="editData"
        id="editForm"
        style="width: 96%"
        label-position="right">
        <el-form-item label="用户ID" label-width="100px" prop="clientId">
          <el-input type="text" v-model="editData.clientId"></el-input>
        </el-form-item>
        <el-form-item label="用户名" label-width="100px" prop="clientName">
          <el-input type="text" v-model="editData.clientName"></el-input>
        </el-form-item>
        <el-form-item label="真实姓名" label-width="100px" prop="name">
          <el-input type="text" v-model="editData.name"></el-input>
        </el-form-item>
        <el-form-item label="用户电话" label-width="100px" prop="phoneNumber">
          <el-input type="text" v-model="editData.phoneNumber"></el-input>
        </el-form-item>
        <el-form-item label="角色信息" label-width="100px" prop="crId">
          <el-input type="text" v-model="editData.crId"></el-input>
        </el-form-item>
        <el-form-item label-width="100px">
          <el-button type="primary" id="search" @click="UserEditSave('editData')">保存</el-button>
          <el-button id="reset" @click="UserCancel('editData')">取消</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
    <el-drawer
      title="添加信息"
      id="addInfo"
      :visible.sync="addDrawer"
      direction="rtl"
      size="30%">
      <el-form
        :model="addData"
        :rules="addRules"
        ref="addData"
        id="addForm"
        style="width: 96%"
        label-position="right">
        <el-form-item label="用户ID" label-width="100px" prop="clientId">
          <el-input type="text" v-model="addData.clientId"></el-input>
        </el-form-item>
        <el-form-item label="用户名" label-width="100px" prop="clientName">
          <el-input type="text" v-model="addData.clientName"></el-input>
        </el-form-item>
        <el-form-item label="真实姓名" label-width="100px" prop="name" >
          <el-input type="text" v-model="addData.name"></el-input>
        </el-form-item>
        <el-form-item label="用户密码" label-width="100px" prop="passWord">
          <el-input type="password" show-password v-model="addData.passWord"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" label-width="100px" prop="checkPass">
          <el-input type="password" show-password v-model="addData.checkPass"></el-input>
        </el-form-item>
        <el-form-item label="用户电话" label-width="100px" prop="phoneNumber">
          <el-input type="text" v-model="addData.phoneNumber"></el-input>
        </el-form-item>
        <el-form-item label="用户角色" label-width="100px" prop="crId">
          <el-input type="text" v-model="addData.crId"></el-input>
        </el-form-item>
        <el-form-item label-width="100px">
          <el-button type="primary" @click="InsertUser('addData')">添加</el-button>
          <el-button @click="UserCancel('addData')">取消</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>

<script>
  import {profileSearch} from "../../network/profile/search";
  import axios from "../../network/axios";
  import {retailerEdit} from "../../network/retailer/edit";
  import {deleteUser} from "../../network/profile/delete";
  import {userInsert} from "../../network/profile/insert";

  export default {
    name: "Profile",
    mounted() {
      this.getFullUserData();
    },
    data() {
      return {
        UserData: [],
        pagesize: 8,  // 每页的数据数
        currpage: 1,  // 默认开始页面
        checkDrawer: false,
        editDrawer: false,
        addDrawer: false,
        checkData: {
          clientId: '',
          clientName: '',
          phoneNumber: '',
          name: '',
          crId: ''
        },
        editData: {
          clientId: '',
          clientName: '',
          phoneNumber: '',
          name: '',
          crId: ''
        },
        editRules: {
          clientId: [
            { required: true, message: '请输入用户ID', trigger: 'blur' },
          ],
          clientName: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
          ],
          phoneNumber: [
            { required: true, message: '请输入用户电话', trigger: 'blur' },
          ],
          name: [
            { required: true, message: '请输入真实姓名', trigger: 'blur' },
          ],
          crId: [
            { required: true, message: '请输入用户角色', trigger: 'blur' },
          ]
        },
        searchUserData: {
          clientName: '',
        },
        searchUserRules: {
          clientName: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
          ]
        },
        addData: {
          clientId: '',
          clientName: '',
          phoneNumber: '',
          name: '',
          crId: '',
          passWord: '',
          checkPass: ''
        },
        addRules: {
          clientId: [
            { required: true, message: '请输入用户ID', trigger: 'blur' },
          ],
          clientName: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
          ],
          phoneNumber: [
            { required: true, message: '请输入用户电话', trigger: 'blur' },
          ],
          name: [
            { required: true, message: '请输入真实姓名', trigger: 'blur' },
          ],
          crId: [
            { required: true, message: '请输入用户角色', trigger: 'blur' },
          ],
          passWord: [
            { required: true, message: '请输入用户密码', trigger: 'blur' },
          ],
          checkPass: [
            { required: true, message: '请输入确认密码', trigger: 'blur' },
          ]
        }
      }
    },
    methods: {
      getFullUserData() {
        axios({
          url: '/userInfo'
        }).then(res => {
          console.log(res);
          console.log(res.length);
          let UserData = res.data;
          let data = [];
          let len = UserData.length;
          for (let i=0; i< len; i++){
            let obj = {};
            obj.clientId = UserData[i].clientId;
            obj.clientName = UserData[i].clientName;
            obj.passWord = UserData[i].passWord;
            obj.phoneNumber = UserData[i].phoneNumber;
            obj.name = UserData[i].name;
            obj.crId = UserData[i].crId;
            data[i] = obj;
          }
          this.UserData = data;
        }).catch(err => {
          console.log(err);
        })
      },
      UserEdit(index, row) {
        console.log(index, row);
        this.editDrawer = true;
      },
      UserCheck(index, row) {
        console.log(index, row);
        this.checkDrawer = true;
        this.checkData.clientId = row.clientId;
        this.checkData.clientName = row.clientName;
        this.checkData.name = row.name;
        this.checkData.phoneNumber = row.phoneNumber;
        this.checkData.crId = row.crId;
      },
      UserDelete(index, row) {
        console.log(index, row);
        deleteUser(row.clientId).then(res => {
          console.log(res);
          if (res === 1) {
            alert('删除成功');
            this.$router.go(0);
          } else {
            alert("删除失败");
          }
        }).catch(err => {
          console.log(err);
        });
        this.UserData.splice(index,1);
      },
      SearchProfile(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            console.log(this.searchUserData.clientName);
            profileSearch(this.searchUserData.clientName).then(res => {
              console.log(res);
              alert('查询成功');
            }).catch(err => {
              console.log(err);
            });
            // alert('查询成功');
          }
        })
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.pagesize=val;
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.currpage=val;
      },
      UserEditSave(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            retailerEdit(this.editData.clientId,this.editData.clientName,this.editData.name,this.editData.phoneNumber,this.editData.crId).then(res => {
              console.log(res);
              if (res === 1) {
                alert('修改成功');
                this.editDrawer = false;
                this.$router.go(0);
              } else {
                alert('修改失败');
              }
            }).catch(err => {
              console.log(err);
            });
            // alert('修改成功');
            // this.editDrawer = false;
            // this.$router.go(0);
          }
        });
      },
      UserCancel(formName) {
        this.$refs[formName].resetFields();
        this.editDrawer = false;
        this.addDrawer = false;
      },
      InsertUser(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            userInsert(this.addData.clientId,this.addData.clientName,this.addData.name,this.addData.phoneNumber,this.addData.crId, this.addData.passWord).then(res => {
              console.log(res);
              if (res === 1) {
                alert('添加成功');
                this.addDrawer = false;
                this.$router.go(0);
              }else {
                alert('添加失败');
              }
            }).catch(err => {
              console.log(err);
            })
          }
        })
      }
    }
  }
</script>

<style>
  .profileElfrom .el-form-item__label {
    color: white;
  }
</style>

<style scoped>
  @import "../../assets/css/show/show.css";
  #userInfo {
    position: absolute;
    top: 20%;
    left: 2%;
    font-size: 14px;
  }
  #foot {
    position: absolute;
    top: 90%;
    right: 10%;
  }
  #head {
    position: absolute;
    width: 100%;
    height: 18%;
    background-color: #ff8198;
  }
  #profileSearch {
    position: relative;
    top: 30%;
    margin-left: 3%;
  }
  .el-input {
    width: 180px;
  }
  #checkInfo {
    position: absolute;
    top: 0;
    left: 0;
    font-size: 22px;
    font-weight: bolder;
  }
  #checkInfo p {
    position: relative;
    top: 6%;
    margin-bottom: 40px;
    left: 10%;
    font-size: 18px;
  }
  #editInfo,#addInfo {
    position: absolute;
    top: 0;
    left: 0;
    font-size: 22px;
    font-weight: bolder;
  }
  #editInfo #editForm, #addInfo #addForm {
    position: relative;
    width: 100%;
    height: 80%;
    margin-left: 10%;
    margin-top: 10%;
  }
  #editInfo #editForm .el-input, #addInfo #addForm .el-input{
    width: 200px;
  }
</style>