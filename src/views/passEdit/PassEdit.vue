<template>
  <div id="show">
    <div id="edit">
      <el-form
        :model="EditData"
        id="passElform"
        :rules="EditRules"
        label-position="right"
        ref="EditData">
        <el-form-item label="旧密码" label-width="100px" prop="oldPass">
          <el-input type="password" show-password v-model="EditData.oldPass"></el-input>
        </el-form-item>
        <el-form-item label="新密码" label-width="100px" prop="newPass">
          <el-input type="password" id="newPass" show-password v-model="EditData.newPass"></el-input>
        </el-form-item>
        <el-form-item label="确认新密码" label-width="100px" prop="checkPass">
          <el-input type="password" id="checkPass" show-password v-model="EditData.checkPass"></el-input>
        </el-form-item>
        <el-form-item label-width="100px">
          <el-button type="primary" @click="EditPass('EditData')">确认</el-button>
          <el-button @click="PassCancel('EditData')">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import {passEdit} from "../../network/pass/edit";

  export default {
    name: "PassEdit",
    data() {
      let validateOldPass = (rule, value, callback) => {
        if (value === ''){
          callback(new Error('请输入旧密码'));
        } else if(value !== this.$store.getters.getLoginPassWord) {
          callback(new Error('旧密码输入错误'));
        } else {
          callback();
        }
      };
      let validateCheckPass = (rule, value, callback) => {
        let pass = document.getElementById('newPass').value;
        console.log(pass);
        if (value === '') {
          callback(new Error('请确认新密码'));
        } else if(value !== pass) {
          callback(new Error('与新密码不一致'));
        } else {
          callback();
        }
      };
      return {
        EditData: {
          oldPass: '',
          newPass: '',
          checkPass: ''
        },
        EditRules: {
          oldPass: [
            { required: true, message: '请输入旧密码', trigger: 'blur' },
            { validator: validateOldPass, trigger: 'blur' },
          ],
          newPass: [
            { required: true, message: '请输入新密码', trigger: 'blur' },
          ],
          checkPass: [
            { required: true, message: '请确认新密码', trigger: 'blur' },
            { validator: validateCheckPass, trigger: 'blur' },
          ]
        }
      }
    },
    methods: {
      EditPass(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            console.log(this.$store.getters.getLoginUserName);
            passEdit(this.$store.getters.getLoginUserName, this.EditData.newPass).then(res => {
              console.log(res);
              if (res === 1) {
                alert('更改成功');
                // 退出到登录页面
                this.$router.push('/logout');
                this.$router.replace('/login');
              } else {
                alert('更改失败');
              }
            }).catch(err => {
              console.log(err);
            })
          }
        })
      },
      PassCancel(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style scoped>
  @import "../../assets/css/show/show.css";
  #edit {
    position: absolute;
    top: 10%;
    width: 80%;
    height: 60%;
    margin-left: 10%;
    border: dashed 1px #f9a928;
  }
  #passElform {
    margin-left: 20%;
    margin-top: 5%;
  }
  #passElform .el-input{
    width: 300px;
  }
</style>