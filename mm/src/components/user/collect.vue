<template>
    <div class="collect">
        <div class="header">
            <i class="el-icon-arrow-left" @click="goback"></i>
            <div class="title">我的收藏</div>
        </div> 
        <div class="content">
            <ul v-for="item in collection.items">
                <li>
                    <img :src="item.item.image" alt="" height="175" width="175">
                    <p class="name">{{item.item.title}}</p>
                    <p class="price">￥{{item.item.price}}</p>
                </li>
            </ul>
            
        </div>
        <div class="foot"></div>
    </div>
</template>

<script>
import axios from 'axios'
export default {

    data(){
        return {
            collection:{
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
            }
        }
    },
    mounted(){
        //获取收藏列表
            //   this.$axios({
            //     url: '/api/api/v1/star',
            //     method: 'get',
            //     }) .then(function (response) {
            //         console.log(response);
            //         this.collection=response.data.items;
            //     })
            //     .catch(function (error) {
            //         console.log(error);
            //     }); 
    
    },
    methods:{
        goback(){this.$router.go(-1);},

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
img{
    padding: 5px
}
.content{
    display: flex;
    margin-top: 55px;
    /* padding-left: 4px; */
    margin-left: 4px
}
.name,.price{
    text-align: center;
    line-height: 15px;
    padding: 4px;
    font-size: 15px;
}
.price{
    color: red
}
</style>
