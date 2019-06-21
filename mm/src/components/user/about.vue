<template>
    <div class="about">     
        <div class="header">
            <i class="el-icon-arrow-left" @click="goback"></i>
            <div class="title">关于我们</div>
        </div>
            <p class="content">
              大米商城，为每一位顾客提供“满足家庭所需”的一站式网购体验。顾客不出家门、不出国门，即能享受到来自全国及世界各地的商品和服务，省力、省钱、省时间。 
            目前，大米商城在线销售涵盖食品饮料、酒水、生鲜、进口食品、进口牛奶、美容化妆、个人护理、服饰鞋靴、厨卫清洁、母婴用品、手机数码、家居家纺、家用电器、保健用品、箱包珠宝、运动用品及礼品卡等商品。
            大米商城以“诚信”为本，在供应商筛选、商品质量管理和商品入库、入驻商家引进及日常运营监管等环节上，由专业人员严格把关，保障商品和服务的高质量，并严格遵照国家有关“三包”的法律法规，让顾客放心购买。    
            与传统零售相比，大米商城有3-5%的运营成本优势，同时，通过建立高效优化的供应链，节省采购、仓储、配送、售后服务等各个环节的成本并回馈给顾客，并通过科学的价格管理，保证淘库商城的价格优惠。
            大米商城将在全国100多个城市成立分公司并建立自配送物流体系。提供次日达、当天达、一小时达等送货到家服务，以满足顾客快速收货的需求。 
            </p>
        <div class="foot">
            @copyright xieting
        </div>
     
    </div>
</template>
<script>
export default {
    methods:{
         goback(){
          this.$router.go(-1);
      },
    }
}
</script>
<style scoped>
.about{
    width: 300px;
    display: inline-block;
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
p{
    position: relative;
    left: 45px;
    top: 80px;
    font-size: 14px;
    line-height: 20px;
    color: #666666;
}
.header_tit {
    padding: 30px 0 10px;
}

.foot{
    text-align: center;
    color:#666666;
    font-size: 10px;
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
