<template>
     <div class="register">
        <div class="lgnheader">
            <div class="header_tit t_c">
                <em id="custom_display_1" class="milogo">
                  <svg width="100%" height="100%" version="1.1" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" rx="3" ry="3" style="fill:#ff6700"></rect><rect x="10" y="15" width="4.2" height="18" style="fill:#FFFFFF"></rect><rect x="33.75" y="15" width="4.2" height="18" style="fill:#FFFFFF"></rect><rect x="11.25" y="15" width="15" height="4.1" style="fill:#FFFFFF"></rect><rect x="26.2" y="20.55" width="4.2" height="12.5" style="fill:#FFFFFF"></rect><rect x="20.6" y="15" width="9.8" height="9.8" rx="4.4" ry="4.4" style="fill:#FFFFFF"></rect><rect x="20.2" y="19" width="6" height="6" rx="2" ry="2" style="fill:#ff6700"></rect><rect x="18" y="19.1" width="4" height="2.2" style="fill:#ff6700"></rect><rect x="24.2" y="23" width="1.94" height="10" style="fill:#ff6700"></rect><rect x="18.1" y="22.8" width="4.2" height="10.2" style="fill:#FFFFFF"></rect></svg>
                </em>
            <h4 class="header_tit_txt" id="login-title">大米帐号注册</h4>
            <div class="site_info"></div>
            </div>
        </div>
      <div class="register_area">
        <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
            <el-form-item label="用户名" prop="username">
                <el-input class="inputs" type="text" v-model="ruleForm2.username" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pass">
                <el-input class="inputs" type="password" v-model="ruleForm2.pass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass">
                <el-input class="inputs" type="password" v-model="ruleForm2.checkPass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="phone">
                <el-input class="inputs"  v-model.number="ruleForm2.phone"></el-input>
            </el-form-item>
             <el-form-item label="邮箱" prop="email">
                <el-input class="inputs" type="text" v-model="ruleForm2.email" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button class="btn" type="primary" @click="submitForm('ruleForm2')">提交</el-button>
                <el-button class="btn" @click="resetForm('ruleForm2')">重置</el-button>
            </el-form-item>
        </el-form>
         
      </div>
      
      <div class="foot">
         <el-breadcrumb separator="|">
            <el-breadcrumb-item :to="{ path: '/' }">简体</el-breadcrumb-item>
            <el-breadcrumb-item><a href="/">繁体</a></el-breadcrumb-item>
            <el-breadcrumb-item>English</el-breadcrumb-item>
            <el-breadcrumb-item>常见问题</el-breadcrumb-item>
            <el-breadcrumb-item>隐私政策</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
                   
    </div>
</template>

<script>
import qs from 'qs'
import axios from 'axios'
export default {
      data() {
      var checkPhone = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('手机号不能为空'));
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入数字值'));
          } else {
            if (!/^1[3|4|5|7|8][0-9]{9}$/.test(value)) 
            {
              callback(new Error('必须为正规的手机号'));
            } else {
              callback();
            }
          }
        }, 1000);
      };
      var checkEmail = (rule, value, callback) => {
        if (value==='') {
          return callback(new Error('邮箱不能为空'));
        }
        setTimeout(() => {
          if (!/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/.test(value)) 
            {
              callback(new Error('请输入正确的邮箱格式'));
            } else {
              callback();
            }
          }, 1000);
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm2.checkPass !== '') {
            this.$refs.ruleForm2.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm2.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        ruleForm2: {
          pass: '',
          username:'',
          checkPass: '',
          email: '',
          phone:''
        },
        rules2: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          phone: [
            { validator: checkPhone, trigger: 'blur' }
          ],
           email: [
            { validator: checkEmail, trigger: 'blur' }
          ],
        }
      };
    },
    methods: {
      submitForm(formName) {
        const that=this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
              
            this.$axios({
            url: '/api/api/v1/user/register',
            method: 'post',
            data: {
                username:this.ruleForm2.username,
                password:this.ruleForm2.pass,
                email:this.ruleForm2.email,
                phone:this.ruleForm2.phone
            },
            transformRequest: [function (data) {
                data = qs.stringify(data);
                return data;
            }],
            headers:{'Content-Type':'application/x-www-form-urlencoded'}
                }) .then(function (response) {
                    console.log(response);
                    that.$router.push({
                        path: '/login',
                    })
                })
                .catch(function (error) {
                    console.log(error);
                });  
                    
                }else {
                        console.log('error submit!!');
                        return false;
                    }
                    });
                },
                resetForm(formName) {
                    this.$refs[formName].resetFields();
                }
                }
            
                
            }
</script>
<style scoped>
.login{
    height: 100%;
    
}
el-input{
    width:250px;
}
.header_tit {
    padding: 30px 0 10px;
}
.t_c {
    text-align: center;
}
.milogo {
    background-image: url(https://account.xiaomi.com/static/res/11eb7d1/account-static/respassport/acc-2014/img/2018/milogo.png);
    width: 48px;
    height: 48px;
    margin: 0 auto 15px;
    display: block;
    }
.header_tit_txt {
    font-size: 1.2rem;
    color: #000;
    font-weight: normal;
}
.inputs{
    width: 250px;
}
.tabs_con.now {
    display: block;
}
.user-info{
    margin-top: 40px
}

.oth_type_tit {
    border-top: 1px solid #f2f2f2;
    padding-top: 10px;
    color: #606266;
}
.btn{
    background-color: #fa4949;
    border-color:#fa4949;
    color: #f2f2f2;
    text-align: center

    
}
.register_area{
    margin-top: 30px
}
.foot{
    position: fixed;
    float: left;
    bottom: -40px;
    z-index: 10;
    height: 100px;
    width: 100%;
    line-height: 1.5;
    text-align: center;
    font-size: .14rem;
    padding-left: 30px;
    background: #fff
}

.oth_type_links{
    text-align: center;
    padding-top:40px
}


</style>

