<template>
    <div class="add-address">
        <div class="header">
            <i class="el-icon-arrow-left" @click="goback"></i>
            <div class="title">新增地址</div>
        </div>
        <div class="add">
            <el-form :label-position="labelPosition" label-width="80px" :model="addressForm">
                <el-form-item label="收货人">
                    <el-input v-model="addressForm.name" placeholder="真实姓名"></el-input>
                </el-form-item>
                <el-form-item label="手机号码">
                    <el-input v-model="addressForm.phone" placeholder="手机号"></el-input>
                </el-form-item>
                <div class="address" @click="toAddress">
                    <el-form-item label="所在地区" @click="toAddress">                     
                        <el-input v-model="addressForm.city"></el-input>  
                    </el-form-item>
                </div>             
                    <el-form-item label="详细地址">
                        <el-input v-model="addressForm.region" placeholder="详细地址"></el-input>
                    </el-form-item>
                
                 
                    <el-form-item>
                         <el-checkbox v-model="addressForm.checked">设置为默认地址</el-checkbox>
                    </el-form-item>
                <el-form-item>
                    <el-button class="submit" type="primary" @click="addAddress">保存地址</el-button>
                    <!-- <el-button>取消</el-button> -->
                </el-form-item>
            </el-form>
        </div>
         <div class="mask" v-show="mask">
            <div class="areas">
                <div class="select">选择地址</div>
                <i class="el-icon-close" @click="close"></i>
                <v-distpicker class="distpicker" type="mobile" @selected='selected' v-show="addInp"></v-distpicker>
            </div>
        </div>
        <div class="foot"></div> 
    </div>
</template>

<script>
import VDistpicker from 'v-distpicker'
export default {
           data() {
      return {
        addInp :false,
        mask:false,
        labelPosition: 'left',
        addressForm: {
          name: '',
          phone: '',
          city:'请选择省市区',
          checked: true,
          region:''
        },
        
     
      }

    },
    methods:{
        goback(){this.$router.go(-1);},
        // onSubmit() {
        //     console.log('submit!');
        // },
         toAddress(){
            this.mask = true;
            this.addInp = true;
        },

 // 省市区三级联动
        selected(data){   
            this.addInp = false;
            this.city = data.province.value + ' ' + data.city.value +' ' + data.area.value;
            this.mask =false;
            },
        close(){this.mask =false;},
        //新增地址
         addAddress(){
            const that=this;
            this.$axios({
                url: '/api/api/v1/user/addaddress',
                method: 'post',
                data: {
                    address:this.addressForm
                },
            transformRequest: [function (data) {
                data = qs.stringify(data);
                return data;
            }],
            headers:{'Content-Type':'application/x-www-form-urlencoded'}
                }) .then(function (response) {
                    if(response.status==200){
                        console.log(response); 
                        that.$router.go(-1);
                    }             
                })
                .catch(function (error) {
                    console.log(error);
                });     
            
        }
    
    },
    components: { VDistpicker },
}
</script>

<style scoped>
.header{
    height: 50px;
    background: #f2f2f2;
    position: fixed;
    z-index: 9999;
    top: 0;
    left: 0;
    right: 0;
    }
    .title{
        font-family: Helvetica Neue,Tahoma,Arial,PingFangSC-Regular,Hiragino Sans GB,Microsoft Yahei,sans-serif;
        text-align: center;
        color: #3c3c3c;
        -webkit-text-size-adjust: none;
    }
    .el-icon-arrow-left{
        position: relative;
        left: 10px;
        top: 15px;
        font-size: 20px
    }
    .add{
        margin: 70px 20px;
    }
    .submit{
        margin: 0  auto;
        background: #ff6700;
        border: #ff6700;
    }
    .areas{
    position: fixed;
    bottom: 0;
    background: #ffffff;
    height: 55%;
    width: 100%;
    overflow-y:scroll;
    overflow-x: hidden;
    z-index: 101;
}
.select{
    height: 20px;
    font-size: 15px;
    text-align: center;
    margin: 5%
}
.el-icon-close{
    position: absolute;
    top:5%;
    right: 5%;
    font-size: 18px;
}
.mask{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,.8);
    z-index: 100;
}

    .foot{
    position: fixed;
    float: left;
    bottom: -40px;
    z-index: 10;
    height: 100px;
    width: 100%;
    line-height: 1.5;
    padding-left: 30px;
    background: #fff
}
</style>
