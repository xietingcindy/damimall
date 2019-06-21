<template>
    <div class="login">
        <div class="lgnheader">
            <div class="header_tit t_c">
                <em id="custom_display_1" class="milogo">
                  <svg width="100%" height="100%" version="1.1" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" rx="3" ry="3" style="fill:#ff6700"></rect><rect x="10" y="15" width="4.2" height="18" style="fill:#FFFFFF"></rect><rect x="33.75" y="15" width="4.2" height="18" style="fill:#FFFFFF"></rect><rect x="11.25" y="15" width="15" height="4.1" style="fill:#FFFFFF"></rect><rect x="26.2" y="20.55" width="4.2" height="12.5" style="fill:#FFFFFF"></rect><rect x="20.6" y="15" width="9.8" height="9.8" rx="4.4" ry="4.4" style="fill:#FFFFFF"></rect><rect x="20.2" y="19" width="6" height="6" rx="2" ry="2" style="fill:#ff6700"></rect><rect x="18" y="19.1" width="4" height="2.2" style="fill:#ff6700"></rect><rect x="24.2" y="23" width="1.94" height="10" style="fill:#ff6700"></rect><rect x="18.1" y="22.8" width="4.2" height="10.2" style="fill:#FFFFFF"></rect></svg>
                </em>
            <h4 class="header_tit_txt" id="login-title">大米帐号登录</h4>
            <div class="site_info"></div>
            </div>
        </div>
      <div class="login_area">
        <el-form ref="form" :model="form" width="250px">
            <el-form-item>
                <el-input  class="user-info" clearable v-model="form.username" placeholder="用户名和或手机号"></el-input>
            </el-form-item>
             <el-form-item>
                 <el-input class="psw" clearable placeholder="请输入密码" v-model="form.password" show-password></el-input>
            </el-form-item> 
             <el-form-item>
            <el-button class="sub" type="primary" @click="onSubmit">立即登陆</el-button>
            </el-form-item> 
            
        </el-form>
         
      </div>
      <div style="display: block;" class="other_login_type sns-login-container" id="custom_display_16">
            <fieldset class="oth_type_tit">
                <legend align="center" class="oth_type_txt">其他方式登录</legend>
            </fieldset>
    
             <div id="sns-login-links" class="oth_type_links">
                 <img src="./qq.png" alt="" height="30px" width="30px">
                 <img src="./weixin.png" alt="" height="30px" width="30px">
                 <img src="./zhifubao.png" alt="" height="30px" width="30px">
             </div>
             
          
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
    data(){
        return{           
            form:{
                username:'',
                password:'',
            }
        }
    },
    methods:{
        onSubmit(){
            const that=this;
             this.$axios({
                url: '/api/api/v1/user/login',
                method: 'post',
                data: {
                    username: this.form.username,
                    password:this.form.password
                },
            transformRequest: [function (data) {
                data = qs.stringify(data);
                return data;
            }],
            headers:{'Content-Type':'application/x-www-form-urlencoded'}
                }) .then(function (response) {
                    console.log(response);
                    sessionStorage.setItem("username",that.form.username);
                    sessionStorage.setItem("password",that.form.password);  
                    if(response.status==200){
                         that.$router.push({
                        path: '/user',
                        query: {
                            username:that.form.username,
                        }
                     })
                    }
                   
                })
                .catch(function (error) {
                    console.log(error);
                });     
                   
        }
    }
}
</script>

<style scoped>
.login{
    height: 100%;
    
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
.tabs_con.now {
    display: block;
}
.user-info{
    margin-top: 40px
}
.user-info,.psw{
    width: 300px;
    height: 50px;
    margin-left: 40px;
     
}
.oth_type_tit {
    border-top: 1px solid #f2f2f2;
    padding-top: 10px;
    color: #606266;
}
.sub{
    background-color: #fa4949;
    border-color:#fa4949;
    height: 50px;
    width: 300px;
    margin-left: 40px;
    font-size: 20px;
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




