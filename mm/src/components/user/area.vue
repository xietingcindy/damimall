<template>
<div class="area">
    <li class="address" @click="toAddress">            
            <el-form>
                <div class="address" @click="toAddress">
                    <el-form-item label="所在地区" @click="toAddress">                     
                        <el-input v-model="city"></el-input>  
                    </el-form-item>
                </div>
            </el-form>         
    </li>
   
    <div class="mask" v-show="mask">
        <div class="areas">
            <div class="select">选择地址</div>
            <i class="el-icon-close" @click="close"></i>
            <v-distpicker class="distpicker" type="mobile" @selected='selected' v-show="addInp"></v-distpicker>
        </div>
    </div>
</div>
  

</template>

<script>
import VDistpicker from 'v-distpicker'
 
export default {
  components: { VDistpicker },
  //定义data数据
  data(){
      return{
        city:'请选择',
        addInp :false,
        mask:false
      }
  },

methods:{
    //在methodes中定义方法
// 点击弹出三级联动
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
        close(){
            this.mask =false;
        }
    },
    
}

</script>

<style scoped>
/* .address{
   
    height: 25px;
} */
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
</style>
