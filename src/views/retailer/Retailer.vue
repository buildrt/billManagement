<template>
  <div id="show">
    <div id="head">
      <el-form
        :inline="true"
        :model="searchRetailerData"
        :rules="searchRetailerRules"
        ref="searchRetailerData"
        id="retailerSearch">
        <el-form-item class="retailerelfrom" label="供应商名称" prop="supplierName">
          <el-input id="name" type="text" v-model="searchRetailerData.supplierName"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="SearchRetailer('searchRetailerData')" style="margin-left: 50px">查询</el-button>
          <el-button type="success" :disabled="!$store.state.isAdmin" icon="el-icon-edit" @click="addDrawer = true" style="margin-left: 50px">添加供应商</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table
      id="retailerInfo"
      v-if="!this.$store.state.retailerSelect"
      :data="RetailerData.slice((currpage-1)*pagesize,currpage*pagesize)"
      height="64%"
      style="width: 96%"
      border>
      <el-table-column
        fixed
        prop="supplierId"
        width="140"
        label="供应商编码">
      </el-table-column>
      <el-table-column
        prop="supplierName"
        width="220"
        fixed
        label="供应商名称">
      </el-table-column>
      <el-table-column
        prop="contactPerson"
        width="140"
        fixed
        label="联系人">
      </el-table-column>
      <el-table-column
        prop="phoneNumber"
        width="160"
        label="联系人电话">
      </el-table-column>
      <el-table-column
        prop="createTime"
        width="160"
        label="创建时间">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="RetailerCheck(scope.$index, scope.row)">查看</el-button>
          <el-button
            size="mini"
            :disabled="!$store.state.isAdmin"
            @click="RetailerEdit(scope.$index, scope.row)">修改</el-button>
          <el-button
            size="mini"
            type="danger"
            :disabled="!$store.state.isAdmin"
            @click="RetailerDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-table
      id="retailerSelectInfo"
      v-else
      :data="RetailerSelectData.slice((currpage-1)*pagesize,currpage*pagesize)"
      height="64%"
      style="width: 96%"
      border>
      <el-table-column
        fixed
        prop="supplierId"
        width="140"
        label="供应商编码">
      </el-table-column>
      <el-table-column
        prop="supplierName"
        width="220"
        fixed
        label="供应商名称">
      </el-table-column>
      <el-table-column
        prop="contactPerson"
        width="140"
        fixed
        label="联系人">
      </el-table-column>
      <el-table-column
        prop="phoneNumber"
        width="160"
        label="联系人电话">
      </el-table-column>
      <el-table-column
        prop="createTime"
        width="160"
        label="创建时间">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="RetailerCheck(scope.$index, scope.row)">查看</el-button>
          <el-button
            size="mini"
            :disabled="!$store.state.isAdmin"
            @click="RetailerEdit(scope.$index, scope.row)">修改</el-button>
          <el-button
            size="mini"
            type="danger"
            :disabled="!$store.state.isAdmin"
            @click="RetailerDelete(scope.$index, scope.row)">删除</el-button>
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
      :total="RetailerData.length">
    </el-pagination>
    <el-drawer
      title="查看信息"
      id="checkInfo"
      :visible.sync="checkDrawer"
      direction="rtl"
      size="30%">
      <p>供应商编码：{{this.checkData.supplierId}}</p>
      <p>供应商名称：{{this.checkData.supplierName}}</p>
      <p>联系人：{{this.checkData.contactPerson}}</p>
      <p>联系人电话：{{this.checkData.phoneNumber}}</p>
      <p>创建时间：{{this.checkData.createTime}}</p>
      <p>备注描述：{{this.checkData.description}}</p>
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
        <el-form-item label="供应商编码" label-width="100px" prop="supplierId">
          <el-input type="text" v-model="editData.supplierId"></el-input>
        </el-form-item>
        <el-form-item label="供应商名称" label-width="100px" prop="supplierName">
          <el-input type="text" v-model="editData.supplierName"></el-input>
        </el-form-item>
        <el-form-item label="联系人" label-width="100px" prop="contactPerson">
          <el-input type="text" v-model="editData.contactPerson"></el-input>
        </el-form-item>
        <el-form-item label="联系人电话" label-width="100px" prop="phoneNumber">
          <el-input type="text" v-model="editData.phoneNumber"></el-input>
        </el-form-item>
        <el-form-item label="创建时间" label-width="100px" prop="createTime">
          <el-date-picker
                  v-model="editData.createTime"
                  type="date"
                  placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="备注描述" label-width="100px" prop="description">
          <el-input type="text" v-model="editData.description"></el-input>
        </el-form-item>
        <el-form-item label-width="100px">
          <el-button type="primary" id="search" @click="RetailerEditSave('editData')">保存</el-button>
          <el-button id="reset" @click="RetailerCancel('editData')">取消</el-button>
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
        <el-form-item label="供应商编码" label-width="100px" prop="supplierId">
          <el-input type="text" v-model="addData.supplierId"></el-input>
        </el-form-item>
        <el-form-item label="供应商名称" label-width="100px" prop="supplierName">
          <el-input type="text" v-model="addData.supplierName"></el-input>
        </el-form-item>
        <el-form-item label="联系人" label-width="100px" prop="contactPerson" >
          <el-input type="text" v-model="addData.contactPerson"></el-input>
        </el-form-item>
        <el-form-item label="联系人电话" label-width="100px" prop="phoneNumber">
          <el-input type="text" v-model="addData.phoneNumber"></el-input>
        </el-form-item>
        <el-form-item label="创建时间" label-width="100px" prop="createTime">
          <el-date-picker
                  v-model="addData.createTime"
                  type="date"
                  placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="备注描述" label-width="100px" prop="description">
          <el-input type="text" v-model="addData.description"></el-input>
        </el-form-item>
        <el-form-item label-width="100px">
          <el-button type="primary" @click="InsertRetailer('addData')">添加</el-button>
          <el-button @click="RetailerCancel('addData')">取消</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>

<script>
  import {retailerSearch} from "../../network/retailer/search";
  import axios from "../../network/axios";
  import {retailerEdit} from "../../network/retailer/edit";
  import {deleteRetailer} from "../../network/retailer/delete";
  import {retailerInsert} from "../../network/retailer/insert";

  export default {
    name: "Retailer",
    mounted() {
      this.$store.commit('setRetailerSelect',false);
      this.getFullRetailerData();
    },
    data() {
      return {
        RetailerData: [],
        RetailerSelectData: [],
        RetailerSelect: [],
        pagesize: 8,  // 每页的数据数
        currpage: 1,  // 默认开始页面
        checkDrawer: false,
        editDrawer: false,
        addDrawer: false,
        checkData: {
          supplierId: '',
          supplierName: '',
          contactPerson: '',
          phoneNumber: '',
          createTime: '',
          description: ''
        },
        editData: {
          supplierId: '',
          supplierName: '',
          contactPerson: '',
          phoneNumber: '',
          createTime: '',
          description: ''
        },
        editRules: {
          supplierId: [
            { required: true, message: '请输入账单编码', trigger: 'blur' },
          ],
          supplierName: [
            { required: true, message: '请输入供应商', trigger: 'blur' },
          ],
          contactPerson: [
            { required: true, message: '请输入联系人', trigger: 'blur' },
          ],
          phoneNumber: [
            { required: true, message: '请输入联系人电话', trigger: 'blur' },
          ],
          createTime: [
            { required: true, message: '请输入创建时间', trigger: 'blur' },
          ],
          description: [
            { required: true, message: '请输入备注描述', trigger: 'blur' },
          ]
        },
        searchRetailerData: {
          supplierName: '',
        },
        searchRetailerRules: {
          supplierName: [
            { required: true, message: '请输入供应商', trigger: 'blur' },
          ]
        },
        addData: {
          supplierId: '',
          supplierName: '',
          contactPerson: '',
          phoneNumber: '',
          createTime: '',
          description: ''
        },
        addRules: {
          supplierId: [
            { required: true, message: '请输入账单编码', trigger: 'blur' },
          ],
          supplierName: [
            { required: true, message: '请输入供应商', trigger: 'blur' },
          ],
          contactPerson: [
            { required: true, message: '请输入联系人', trigger: 'blur' },
          ],
          phoneNumber: [
            { required: true, message: '请输入联系人电话', trigger: 'blur' },
          ],
          createTime: [
            { required: true, message: '请输入创建时间', trigger: 'blur' },
          ],
          description: [
            { required: true, message: '请输入备注描述', trigger: 'blur' },
          ]
        }
      }
    },
    methods: {
      getFullRetailerData() {
        axios({
          url: '/retailerInfo'
        }).then(res => {
          console.log(res);
          console.log(res.length);
          let RetailerData = res.data;
          let data = [];
          let len = RetailerData.length;
          for (let i=0; i< len; i++){
            let obj = {};
            obj.supplierId = RetailerData[i].supplierId;
            obj.supplierName = RetailerData[i].supplierName;
            obj.contactPerson = RetailerData[i].contactPerson;
            obj.phoneNumber = RetailerData[i].phoneNumber;
            obj.createTime = RetailerData[i].createTime;
            obj.description = RetailerData[i].description;
            data[i] = obj;
          }
          this.RetailerData = data;
        }).catch(err => {
          console.log(err);
        })
      },
      RetailerEdit(index, row) {
        console.log(index, row);
        this.editDrawer = true;
      },
      RetailerCheck(index, row) {
        console.log(index, row);
        this.checkDrawer = true;
        this.checkData.supplierId = row.supplierId;
        this.checkData.supplierName = row.supplierName;
        this.checkData.contactPerson = row.contactPerson;
        this.checkData.phoneNumber = row.phoneNumber;
        this.checkData.createTime = row.createTime;
        this.checkData.description = row.description;
      },
      RetailerDelete(index, row) {
        console.log(index, row);
        deleteRetailer(row.supplierId).then(res => {
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
        this.RetailerData.splice(index,1);
      },
      SearchRetailer(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            console.log(this.searchRetailerData.supplierName);
            retailerSearch(this.searchRetailerData.supplierName).then(res => {
              console.log(res);
              this.$store.commit('setRetailerSelect',true);
              alert('查询成功');
              let RetailerSelectData = res.data;
              let data = [];
              let len = RetailerSelectData.length;
              for (let i=0; i< len; i++){
                let obj = {};
                obj.supplierId = RetailerSelectData[i].supplierId;
                obj.supplierName = RetailerSelectData[i].supplierName;
                obj.contactPerson = RetailerSelectData[i].contactPerson;
                obj.phoneNumber = RetailerSelectData[i].phoneNumber;
                obj.createTime = RetailerSelectData[i].createTime;
                obj.description = RetailerSelectData[i].description;
                data[i] = obj;
              }
              this.RetailerSelectData = data;
            }).catch(err => {
              alert('查询失败');
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
      RetailerEditSave(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(this.editData.supplierId,this.editData.supplierName,this.editData.contactPerson,this.editData.phoneNumber,this.editData.createTime, this.editData.description);
            let createTime = this.editData.createTime.getFullYear() + '-' + (this.editData.createTime.getMonth()+1 < 10 ? '0'+(this.editData.createTime.getMonth()+1) : this.editData.createTime.getMonth()+1) + '-' +  (this.editData.createTime.getDate()<10?'0'+(this.editData.createTime.getDate()):this.editData.createTime.getDate());
            console.log(createTime);
            retailerEdit(this.editData.supplierId,this.editData.supplierName,this.editData.contactPerson,this.editData.phoneNumber,this.editData.createTime, this.editData.description).then(res => {
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
      RetailerCancel(formName) {
        this.$refs[formName].resetFields();
        this.editDrawer = false;
        this.addDrawer = false;
      },
      InsertRetailer(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            console.log(this.addData.supplierId,this.addData.supplierName,this.addData.contactPerson,this.addData.phoneNumber,this.addData.createTime, this.addData.description);
            let createTime = this.editData.createTime.getFullYear() + '-' + (this.editData.createTime.getMonth()+1 < 10 ? '0'+(this.editData.createTime.getMonth()+1) : this.editData.createTime.getMonth()+1) + '-' +  (this.editData.createTime.getDate()<10?'0'+(this.editData.createTime.getDate()):this.editData.createTime.getDate());
            console.log(createTime);
            retailerInsert(this.addData.supplierId,this.addData.supplierName,this.addData.contactPerson,this.addData.phoneNumber,this.addData.createTime, this.addData.description).then(res => {
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
  .retailerelfrom .el-form-item__label {
    color: white;
  }
</style>

<style scoped>
  @import "../../assets/css/show/show.css";
  #retailerInfo {
    position: absolute;
    top: 20%;
    left: 2%;
    font-size: 14px;
  }
  #retailerSelectInfo {
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
  #retailerSearch {
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