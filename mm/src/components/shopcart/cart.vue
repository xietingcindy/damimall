<template>
  
<div class="cart">
  <div class="body">
    <div class="tour">
        <a @click="goback" class="tour1"><img src="./back.png" style="height: 26px;width: 20px"></a>
        <p>购物车</p>
         <el-button type="text" class="tour2" @click="open"><i class="btn"></i></el-button>
        <!-- <a href="javascript:;" class="tour2"><i class="btn"></i></a> -->
    </div>
        <div class="spxz">
    <div class="tip" v-show="flag">
        <p><i class="el-icon-shopping-cart-2"></i>
            您还没有登陆哟，请
            <router-link to="/login">
                <el-button size="mini" type="info" plain>登陆</el-button>
            </router-link>  
        </p>
    </div>
    <ul>
        <li v-for="item in selectedGoods.items">
            <ul>
                <li class="li1"><input type="checkbox" :checked="item.is_selected"  name="box"/></li>
                <li class="li2"><img :src="item.item.image"  style="width: 60px;height: 60px"/></li>
                <li class="li3">
                    <div class="title">{{item.item.title}}</div>
                    <div class="one" style="color: red">￥{{item.item.price}}</div>
                </li>
                <li class="li4">数量：{{item.amount}}件</li>
            <!-- v-model="num" -->
            </ul>
        </li>
       
    </ul>
</div>
</div>
<div style="clear: both"></div>
<div class="footing">
    <ul>
        <li class="li5"><input type="checkbox" id="checkbox" value="1" @click="check" />全选</li>
        <li class="li6">合计：<span class="red">￥{{totalPrice}}</span></li>
        <li class="li7"><a href="#"><button type="button">结算</button></a></li>
    </ul>
</div>
    <!-- <div class="alert">
       <table border="1" cellSpacing=0  style="width: 100%;text-align: center;border-spacing:0;BORDER-COLLAPSE: collapse">
           <tr>
               <td colspan="2">
                   <div style="padding: 0.5rem 0 0.5rem 0;font-size: 1.6rem">提示</div>
                   <div style="padding: 0.5rem 0 0.5rem 0;font-size: 1.6rem">确定删除当前商品?</div>
               </td>
           </tr>
           <tr>
               <td><button type="button" class="delete" style="border: none;outline: none;background-color: white;font-size: 1.6rem;padding: 0.5rem 0 0.5rem 0;width:100%">确定</button></td>
               <td><button type="button" class="none" style="border: none;outline: none;background-color: white;font-size: 1.6rem;padding: 0.5rem 0 0.5rem 0;width:100%">取消</button></td>
           </tr>
       </table>
    </div>
<div class="theme-popover-mask"></div> -->
</div>

   
</template>

<script>
import VueEvent from "../../common/js/eventVue.js"
import axios from 'axios'
import Vue from 'vue'
export default {
  props:{
    // selectFoods:{
    //         type:Array,
    //         default(){
    //             return [];
    //         }
    //     }
  },
    data(){  
   return {
        selectedGoods:{
             "items": [
            {
              "item": {
                "id": 19,
                "created": null,
                "updated": null,
                "title": "Redmi Note 7Pro",
                "sellPoint": "索尼4800万超清拍照 / 18个月超长质保 / 骁龙675处理器 / 4000mAh大电量 / 128GB大存储 / 6.3\"水滴屏 / P2i整机防泼溅处理 / 标配18W充电器 / 德国莱茵 TÜV 认证护眼屏",
                "price": 1599,
                "num": 178,
                "image": "http://psic7eu47.bkt.clouddn.com/Fhg0B4KL7nIuE_pjj0TuSRvdoNnD",
                "cid": 1185,
                "status": null
              },
              "isHave": true,
              "amount": 1
            },
            {
              "item": {
                "id": 9,
                "created": null,
                "updated": null,
                "title": "小米8青春版",
                "sellPoint": "索尼2400万旗舰自拍 / 潮流镜面渐变色 / 手持超级夜景 / Dual PD 双核对焦 / 7.5mm超薄机身 / 6.26\"小刘海全面屏 / 骁龙660AIE处理器",
                "price": 1099,
                "num": 100,
                "image": "http://psic7eu47.bkt.clouddn.com/FjfG3Zi3eyoIsWYkCBGdjh0DbJ33",
                "cid": 1184,
                "status": null
              },
              "isHave": true,
              "amount": 1
            }
          ]
        },
        num: 1,
        flag:true,
        delFlag:false,
   }
  },
methods: {
      goback(){
          this.$router.go(-1);
      },
    
    selected(){

    } , 
       check(){
			var checkbox = document.getElementById('checkbox');
			checkbox.value==1?checkbox.value=2 : checkbox.value=1;
			var checkboxs = document.getElementsByName('box');
			for(var i=0; i<checkboxs.length;i++){

			if(checkbox.value==1){
				checkboxs[i].checked=false;
			}else{
			checkboxs[i].checked=true;
		  	}
      };
   } ,
     open() {
        this.$confirm('是否清空购物车?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
         
        //  this.$axios({
        //         url: '/api/api/v1/cart',
        //         method: 'post',
        //         }) .then(function (response) {
        //             console.log(response);
        //             this.selectedGoods=null;
        //             this.$message({
        //                 type:'info',
        //                 message:'删除成功！'
        //             })
        //         })
        //         .catch(function (error) {
        //             console.log(error);
        //         });     
                   
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      }
},
  
  mounted(){
      //获取购物车列表
      if(sessionStorage.getItem("username")){
             this.$axios({
                url: 'api/api/v1/cart',
                method: 'get',
                }) .then(function (response) {
                    console.log(response);
                    this.selectedGoods=response.data.items;
                })
                .catch(function (error) {
                    console.log(error);
                }); 
     
      }
      else{
          this.flag=true;
      }
    
  },
  computed:{
   
    totalPrice(){
            let total=0;
            this.selectedGoods.items.forEach((item) => {
                    total+=item.item.price*item.amount;
            });
          
            return total;
        },
    
    
  }
}
</script>
<style scoped>


img{
    width: 100%;
    display: block;
}
.tip{
    height: 40px;
    background-color:#f9f9f9 ;
}
.tip p{
    font-size: 14px;
    text-align: center;
}

.tour{
    width: 100%;
    height: 5rem;
    border-bottom: 1px solid #000000;
    position: relative;
}
.tour1{
    position: absolute;
    top:1rem;
    left: 2%;
}
.tour p{
    text-align: center;
    line-height: 5rem;
    font-size: 1.8rem;
}
.tour2{
    position: absolute;
    top:1.5rem;
    right: 2%;
}
.tour .tour2 .btn{
    background-image: url("delete.png");
    background-size: 20px 20px;
    display: inline-block;
    width: 20px;
    height: 20px;
}
.spxz{
	
	border:1px solid #dcdcdc;
}
.spxz ul{
    width: 100%;
    height: 70px;
}
.spxz ul li {
    display:flexS;
    float: left;
    font-size: 14px
}
.li1{
    line-height: 70px;
    width: 10%;
    text-align: center;
}
.li2{
    margin-top: 0.5rem;
    width: 10%;
    text-align: center;
}
.li2 img{
    border: 1px solid #dcdcdc;
    padding: 0.1rem;
}
.li3{
    position: relative;
    left: 20px;
    font-size: 1.3rem;
    line-height: 30px;
    text-align: center;
    padding-left: 35px
}
.title{
    font-size: 12px;
    line-height: 20px;
    /* width: 30px;
    overflow: hidden; */
}
.one{
    color: red;
    border: none;
    outline: none;
    text-align: center;
    width: 4rem;
    background-color: white;
}
.li4{
    /* width: 25%; */
    position: absolute;
    right: 20px;
    /* top: 40px; */
    font-size: 1.3rem;
    line-height: 70px;
    text-align: right;
}
.reduce,.plus{
    padding: 0 0.5rem 0 0.5rem;
    border: 1px solid gainsboro;
}
.num{
    text-align: center;
    width: 2rem;
    border: none;
    outline: none;
}
.footing{
    width: 100%;
    position: fixed;
    background-color: #ffffff;
    z-index:1;
    bottom: 45px;
}
.footing ul{
    width: 100%;
    height: 5rem;
    border-top: 1px solid #8a8a8a;
}
.footing ul li{
    display: inline-block;
    float: left;
}
.li5{
    line-height: 5rem;
    width: 20%;
    font-size: 1.3rem;
    text-align: center;
}
.li6{
    width: 60%;
    line-height: 5rem;
    font-size: 1.3rem;
    text-align: center;
}
.li7{
    width: 29%;
    position: absolute;
    right:0;
    margin-right: 1.5rem;
    text-align: center;
    line-height: 5rem;
}
.li7 button{
    white-space: nowrap;
    width: 100%;
    font-size: 0.8rem;
    /* line-height: 4rem; */
    background-color: #fa4949;
    color: #ffffff;
    font-weight: bold;
    border: none;
    outline: none;
    border-radius: 5px;
    height: 40px;
    width: 80px;
    margin-left: 35px;
}
.alert{
    display: none;
    z-index: 111;
    position: relative;
    top:50%;
    background-color: #ffffff;
    margin-left: 20%;
    margin-right: 20%;
    width: 60%;
}
.theme-popover-mask {
    z-index: 99;
    position:fixed;
    top:0;
    left:0;
    width:100%;
    height:100%;
    background:#000;
    opacity:0.4;
    filter:alpha(opacity=40);
    display:none
}
</style>

