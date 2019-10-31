<template>
  <div id="show">
    <div id="head">
      <el-form
        :inline="true"
        :model="searchBillData"
        :rules="searchBillRules"
        ref="searchBillData"
        id="billSearch">
        <el-form-item class="billelfrom" label="商品名称" prop="commoditiesName">
          <el-input id="name" type="text" v-model="searchBillData.commoditiesName"></el-input>
        </el-form-item>
        <el-form-item class="billelfrom" label="供应商" prop="supplierName">
          <el-select v-model="searchBillData.supplierName" clearable placeholder="请选择">
            <el-option
              v-for="item in BillData"
              :key="item.supplierName"
              :label="item.supplierName"
              :value="item.supplierName">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="billelfrom" label="是否付款" prop="pay">
          <el-select v-model="searchBillData.pay" clearable placeholder="请选择" style="width: 120px">
            <el-option
              v-for="item in payData"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="SearchBill('searchBillData')" style="margin-left: 50px">查询</el-button>
          <el-button type="success" :disabled="!$store.state.isAdmin" icon="el-icon-edit" @click="addDrawer = true" style="margin-left: 50px">添加账单</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table
      id="billInfo"
      v-if="!this.billPartIsShow"
      :data="BillData.slice((currpage-1)*pagesize,currpage*pagesize)"
      height="64%"
      style="width: 96%"
      border>
      <el-table-column
        fixed
        prop="billCode"
        width="140"
        label="账单编码">
      </el-table-column>
      <el-table-column
        prop="commoditiesName"
        width="160"
        fixed
        label="商品名称">
      </el-table-column>
      <el-table-column
        prop="supplierName"
        width="200"
        fixed
        label="供应商">
      </el-table-column>
      <el-table-column
        prop="price"
        width="80"
        label="总金额">
      </el-table-column>
      <el-table-column
        prop="pay"
        width="100"
        label="是否付款">
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
            @click="BillCheck(scope.$index, scope.row)">查看</el-button>
          <el-button
            size="mini"
            :disabled="!$store.state.isAdmin"
            @click="BillEdit(scope.$index, scope.row)">修改</el-button>
          <el-button
            size="mini"
            type="danger"
            :disabled="!$store.state.isAdmin"
            @click="BillDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-table
      id="billSelectInfo"
      v-if="this.billPartIsShow"
      :data="BillSelectData.slice((currpage-1)*pagesize,currpage*pagesize)"
      height="64%"
      style="width: 96%"
      border>
      <el-table-column
        fixed
        prop="billCode"
        width="140"
        label="账单编码">
      </el-table-column>
      <el-table-column
        prop="commoditiesName"
        width="160"
        fixed
        label="商品名称">
      </el-table-column>
      <el-table-column
        prop="supplierName"
        width="200"
        fixed
        label="供应商">
      </el-table-column>
      <el-table-column
        prop="price"
        width="80"
        label="总金额">
      </el-table-column>
      <el-table-column
        prop="pay"
        width="100"
        label="是否付款">
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
            @click="BillCheck(scope.$index, scope.row)">查看</el-button>
          <el-button
            size="mini"
            :disabled="!$store.state.isAdmin"
            @click="BillEdit(scope.$index, scope.row)">修改</el-button>
          <el-button
            size="mini"
            type="danger"
            :disabled="!$store.state.isAdmin"
            @click="BillDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      id="foot"
      v-if="!this.billPartIsShow"
      @current-change="handleCurrentChange"
      :current-page="currpage"
      :page-sizes="[2, 4, 6, 8]"
      :page-size="pagesize"
      layout="total, sizes,prev, pager, next, jumper"
      :total="BillData.length">
    </el-pagination>
    <el-pagination
      @size-change="handleSizeChange"
      id="foot2"
      v-if="this.billPartIsShow"
      @current-change="handleCurrentChange"
      :current-page="currpage"
      :page-sizes="[2, 4, 6, 8]"
      :page-size="pagesize"
      layout="total, sizes,prev, pager, next, jumper"
      :total="BillSelectData.length">
    </el-pagination>
    <el-drawer
      title="查看信息"
      id="checkInfo"
      :visible.sync="checkDrawer"
      direction="rtl"
      size="30%">
      <p>账单编码：{{this.checkData.billCode}}</p>
      <p>商品名称：{{this.checkData.commoditiesName}}</p>
      <p>供应商：{{this.checkData.supplierName}}</p>
      <p>总金额：{{this.checkData.price}}</p>
      <p>是否付款：{{this.checkData.pay}}</p>
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
        <el-form-item label="账单编码" label-width="100px" prop="billCode">
          <el-input type="text" v-model="editData.billCode"></el-input>
        </el-form-item>
        <el-form-item label="商品名称" label-width="100px" prop="commoditiesName" >
          <el-input type="text" v-model="editData.commoditiesName"></el-input>
        </el-form-item>
        <el-form-item label="供应商名称" label-width="100px" prop="supplierName">
          <el-input type="text" v-model="editData.supplierName"></el-input>
        </el-form-item>
        <el-form-item label="总金额" label-width="100px" prop="price">
          <el-input type="text" v-model="editData.price"></el-input>
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
        <el-form-item label="是否付款" label-width="100px" prop="pay">
          <el-select v-model="editData.pay" clearable placeholder="请选择">
            <el-option
              v-for="item in payData"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label-width="100px">
          <el-button type="primary" id="search" @click="BillEditSave('editData')">保存</el-button>
          <el-button id="reset" @click="BillCancel('editData')">取消</el-button>
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
        <el-form-item label="账单编码" label-width="100px" prop="billCode">
          <el-input type="text" v-model="addData.billCode"></el-input>
        </el-form-item>
        <el-form-item label="商品名称" label-width="100px" prop="commoditiesName" >
          <el-input type="text" v-model="addData.commoditiesName"></el-input>
        </el-form-item>
        <el-form-item label="供应商名称" label-width="100px" prop="supplierName">
          <el-input type="text" v-model="addData.supplierName"></el-input>
        </el-form-item>
        <el-form-item label="总金额" label-width="100px" prop="price">
          <el-input type="text" v-model="addData.price"></el-input>
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
        <el-form-item label="是否付款" label-width="100px" prop="pay">
          <el-select v-model="addData.pay" clearable placeholder="请选择">
            <el-option
              v-for="item in payData"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label-width="100px">
          <el-button type="primary" @click="InsertBill('addData')">添加</el-button>
          <el-button @click="BillCancel('addData')">取消</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>

<script>
  import axios from "../../network/axios";
  import {billEdit} from "../../network/bill/edit";
  import {billSearch} from "../../network/bill/search";
  import {deleteBill} from "../../network/bill/delete";
  import {billInsert} from "../../network/bill/insert";

  export default {
    name: "Bill",
    mounted() {
      // this.$store.commit('setBillSelect',false);
      this.billPartIsShow = false;
      this.getFullData();
    },
    data() {
      return {
        BillData: [],
        BillSelectData: [],
        billPartIsShow: true,
        payData: [
          {value: 0, label: '未付款'},
          {value: 1, label: '已付款'}
        ],
        supplierValue: '',
        payValue: '',
        pagesize: 8,  // 每页的数据数
        currpage: 1,  // 默认开始页面
        checkDrawer: false,
        editDrawer: false,
        addDrawer: false,
        checkData: {
          billCode: '',
          commoditiesName: '',
          supplierName: '',
          price: '',
          pay: '',
          createTime: '',
          description: ''
        },
        editData: {
          billCode: '',
          commoditiesName: '',
          supplierName: '',
          price: '',
          pay: '',
          createTime: '',
          description: ''
        },
        editId: '',
        editRules: {
          billCode: [
            { required: true, message: '请输入账单编码', trigger: 'blur' },
          ],
          commoditiesName: [
            { required: true, message: '请输入商品名称', trigger: 'blur' },
          ],
          supplierName: [
            { required: true, message: '请输入供应商', trigger: 'blur' },
          ],
          price: [
            { required: true, message: '请输入总金额', trigger: 'blur' },
          ],
          pay: [
            { required: true, message: '请输入是否付款', trigger: 'blur' },
          ],
          createTime: [
            { required: true, message: '请输入创建时间', trigger: 'blur' },
          ],
          description: [
            { required: true, message: '请输入备注描述', trigger: 'blur' },
          ]
        },
        searchBillData: {
          commoditiesName: '',
          supplierName: '',
          pay: '',
        },
        searchBillRules: {
          commoditiesName: [
            { required: true, message: '请输入商品名称', trigger: 'blur' },
          ],
          supplierName: [
            { required: true, message: '请输入供应商', trigger: 'blur' },
          ],
          pay: [
            { required: true, message: '请输入是否付款', trigger: 'blur' },
          ],
        },
        addData: {
          billCode: '',
          commoditiesName: '',
          supplierName: '',
          price: '',
          pay: '',
          createTime: '',
          description: ''
        },
        addRules: {
          billCode: [
            { required: true, message: '请输入账单编码', trigger: 'blur' },
          ],
          commoditiesName: [
            { required: true, message: '请输入商品名称', trigger: 'blur' },
          ],
          supplierName: [
            { required: true, message: '请输入供应商', trigger: 'blur' },
          ],
          price: [
            { required: true, message: '请输入总金额', trigger: 'blur' },
          ],
          pay: [
            { required: true, message: '请输入是否付款', trigger: 'blur' },
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
      getFullData() {
        axios({
          url: '/Bill/selectAll'
        }).then(res => {
          console.log(res);
          let BillData = res;
          let data = [];
          let len = BillData.length;
          console.log(len);
          for (let i=0; i< len; i++){
            let obj = {};
            obj.billId = BillData[i].billid;
            obj.billCode = BillData[i].billcode;
            obj.commoditiesName = BillData[i].commoditiesname;
            obj.supplierName = BillData[i].suppliername;
            obj.price = BillData[i].price;
            if (BillData[i].pay === 1) {
              obj.pay = '已付款'
            }else {
              obj.pay = '未付款'
            }
            obj.createTime = BillData[i].createtime;
            obj.description = BillData[i].description;
            data[i] = obj;
          }
          this.BillData = data;
        }).catch(err => {
          console.log(err);
        })
      },
      BillEdit(index, row) {
        console.log(index, row);
        this.editId = row.billId;
        this.editDrawer = true;
      },
      BillCheck(index, row) {
        console.log(index, row);
        this.checkDrawer = true;
        this.checkData.billCode = row.billCode;
        this.checkData.commoditiesName = row.commoditiesName;
        this.checkData.supplierName = row.supplierName;
        this.checkData.price = row.price;
        this.checkData.pay = row.pay;
        this.checkData.createTime = row.createTime;
        this.checkData.description = row.description;

      },
      BillDelete(index, row) {
        console.log(index, row);
        deleteBill(row.billId).then(res => {
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
        this.BillData.splice(index,1);
      },
      SearchBill(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            console.log(this.searchBillData.commoditiesName, this.searchBillData.supplierName, this.searchBillData.pay);
            billSearch(this.searchBillData.commoditiesName, this.searchBillData.supplierName, this.searchBillData.pay).then(res => {
              console.log(res);
              // alert('查询成功');
              //this.$store.commit('setBillSelect',true);
              this.billPartIsShow = true;
              let BillSelectData = res;
              let obj = {};
              this.BillSelectData = [];
              obj.billId = BillSelectData.billid;
              obj.billCode = BillSelectData.billcode;
              obj.commoditiesName = BillSelectData.commoditiesname;
              obj.supplierName = BillSelectData.suppliername;
              obj.price = BillSelectData.price;
              if (BillSelectData.pay === 1) {
                obj.pay = '已付款'
              }else {
                obj.pay = '未付款'
              }
              obj.createTime = BillSelectData.createtime;
              obj.description = BillSelectData.description;
              this.BillSelectData[0] = obj;
              console.log(this.BillSelectData);
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
      BillEditSave(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(this.editId,this.editData.billCode,this.editData.commoditiesName,this.editData.supplierName,this.editData.price,this.editData.pay,this.editData.createTime, this.editData.description);
            let createTime = this.editData.createTime.getFullYear() + '-' + (this.editData.createTime.getMonth()+1 < 10 ? '0'+(this.editData.createTime.getMonth()+1) : this.editData.createTime.getMonth()+1) + '-' +  (this.editData.createTime.getDate()<10?'0'+(this.editData.createTime.getDate()):this.editData.createTime.getDate());
            console.log(createTime);
            billEdit(this.editId,this.editData.billCode,this.editData.commoditiesName,this.editData.supplierName,this.editData.price,this.editData.pay,createTime, this.editData.description).then(res => {
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
      BillCancel(formName) {
        this.$refs[formName].resetFields();
        this.editDrawer = false;
        this.addDrawer = false;
      },
      InsertBill(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            console.log(this.addData.billCode,this.addData.commoditiesName,this.addData.supplierName,this.addData.price,this.addData.pay,this.addData.createTime, this.addData.description);
            let createTime = this.addData.createTime.getFullYear() + '-' + (this.addData.createTime.getMonth()+1 < 10 ? '0'+(this.addData.createTime.getMonth()+1) : this.addData.createTime.getMonth()+1) + '-' +  (this.addData.createTime.getDate()<10?'0'+(this.addData.createTime.getDate()):this.addData.createTime.getDate());
            console.log(createTime);
            billInsert(this.addData.billCode,this.addData.commoditiesName,this.addData.supplierName,this.addData.price,this.addData.pay,createTime, this.addData.description).then(res => {
              console.log(res);
              if (res === 1) {
                alert('添加成功');
                this.addDrawer = false;
                this.$router.go(0);
              }else {
                alert('添加失败');
              }
            }).catch(err => {
              alert('添加失败');
              console.log(err);
            })
          }
        })
      }
    }
  }
</script>

<style>
  .billelfrom .el-form-item__label {
    color: #6d6666;
  }
</style>

<style scoped>
  @import "../../assets/css/show/show.css";
  #billInfo {
    position: absolute;
    top: 20%;
    left: 2%;
    font-size: 14px;
  }
  #billSelectInfo {
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
  #foot2 {
    position: absolute;
    top: 90%;
    right: 10%;
  }
  #head {
    position: absolute;
    width: 100%;
    height: 18%;
    /*background-color: #ff8198;*/
  }
  #billSearch {
    position: relative;
    top: 30%;
    margin-left: 3%;
  }
  .el-input {
    width: 130px;
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