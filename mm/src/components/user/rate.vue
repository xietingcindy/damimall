<template>
    <div class="about">     
        <div class="header">
            <i class="el-icon-arrow-left" @click="goback"></i>
            <div class="title">评分</div>
        </div>   
            <div class="rate"> 
                <span class="demonstration">感谢您对大米商城的支持，赏个好评吧~~</span>
                <el-rate  v-model="value" show-text></el-rate>
                <el-button :plain="true" class="sub"  @click="open">提交</el-button>
            </div>
        <div class="foot">

        </div>
     
    </div>
</template>
<script>
export default {
     data() {
      return {
        value: null,
      }
    },
    methods:{
         goback(){
          this.$router.go(-1);
      },
       open() {
        this.$alert('感谢提交', {
          confirmButtonText: '确定',
          center: true,
          callback: action => {
            // this.$message({
            //   type: 'info',
            //   message: `action: ${ action }`
            // });
          }
        });
      
      },
    }
}
</script>
<style scoped>

.sub{
    margin-top: 20px;
    margin-left: 60px;
}
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
.rate{
    position: relative;
    left: 50px;
    top: 80px;
    font-size: 15px;
    line-height: 20px
}
.el-rate{
        height: 20px;
    /* line-height: 1; */
    margin-top: 20px;
    /* text-align: center; */
    font-size: 20px;
    margin-left: 50px;
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
