<template>
    <div class="address">
         <div class="header">
            <i class="el-icon-arrow-left" @click="goback"></i>
            <div class="title">收货地址</div>
            <router-link to="/add-address">
                <i class="add el-icon-plus"></i>
            </router-link>
        </div> 
        <div class="address-manager">
            <ul v-for="(ad,index) in addr" class="ui-card">
                <li class="user-info">
                    <span class="name">{{ad.name}}</span>
                    <span class="phone">{{ad.phone}}</span>
                    <em class="default" v-show="ad.checked"> [默认]</em>
                    <span class="delete" @click="dialogVisible = true">删除</span>
                </li>
                <li class="ad" @click="edit">
                    <p>{{ad.city}}</p>
                    <p>{{ad.region}}</p>
                    <i class="el-icon-arrow-right"></i>
                </li>
            </ul>
        </div>
        <el-dialog title="提示" :visible.sync="dialogVisible">
            <span>确定要删除该地址吗？</span>
            <span slot="footer" class="dialog-footer">
                <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
                <el-button size="mini" type="primary" @click="deleteAd">确 定</el-button>
            </span>
        </el-dialog>
         <div class="foot"></div>
    </div>
</template>

<script>
import qs from 'qs'
import axios from 'axios'
import VueEvent from '../../common/js/eventVue'
export default {
   
    data(){
        return{
            dialogVisible: false,
            addr:[
                   {
                        name:'cindy',
                        phone:'15802541475',
                        checked:true,
                        city:'陕西省西安市长安区子午大道',
                        region:'长安校区西安邮电大学'
                    },
                    {
                        name:'tom',
                        phone:'15802541475',
                        checked:false,
                        city:'陕西省西安市长安区子午大道',
                        region:'长安校区西安邮电大学'
                    }
            ]
         
        }
    },
 methods:{
        goback(){this.$router.go(-1);},
        edit(){
            //传信息  
            this.$router.push({
                    path: '/edit-address',
                    query: {
                        address: this.addr,
                        index:this.index
                    }
                    }) 
        },
        
        
             
        //删除地址
        deleteAd(){
            const that=this;
            this.$axios({
                url: '/api/api/v1/user/deleteAd',
                method: 'post',
                data: {
                    addressid:1
                },
            transformRequest: [function (data) {
                data = qs.stringify(data);
                return data;
            }],
            headers:{'Content-Type':'application/x-www-form-urlencoded'}
                }) .then(function (response) {
                    if(response.status==200){
                        console.log(response); 
                        this.dialogVisible = false
                    }             
                })
                .catch(function (error) {
                    console.log(error);
                });     
            
        }
    },
    mounted(){
        //取地址
        //    this.$axios.get('/api/api/v1/content/89').then(response => {
        // // console.log(response);
        //     response=response.data.data
        //     this.addr=response;
        //     console.log(this.addr);
             
    //         })
    //   }
}
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
.address-manager{
    position: relative;
    margin-top: 50px;
    font-size: 20px;
}
.add{
    float:right;
    font-size: 25px;
    position: relative;
    top: -20px;
    right: 30px;
}
.ui-card{
    margin:10px; 
    border-bottom: 1px solid #f6f6f6;
    overflow: hidden;
    margin: 10px;
    border-radius: .06rem;
    background: #fff;
    text-align: left;
   
}
.user-info{
 border-bottom: 1px solid #f6f6f6;
 font-size: 18px;
 line-height: 38px;
 margin: 10px 20px
}
.phone{
    background-repeat: no-repeat;
    padding: 0;
    margin: 0;
    font-size: 15px;
}
.name{
    margin-right: .6rem;
    color: #f60;
}
.default{
    color: #f60;
    font-size: .2rem;
    font-style: normal;
    margin-left: .05rem;
}

.delete{
    float: right;
    color: #999;
}
.ad{
    position: relative;
    padding-right: .5rem;
    font-size: 18px;
    margin: 10px 20px
}
.el-icon-arrow-right { 
    position: absolute;
    width: 10px;
    height: 10px;
    right: 20px;
    top: 40%;   
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
