<template>
    <transition name="mv">
    <div class="detail" v-show="showFlag" ref="good1">
        <div class="food-content">
            <div class="image-header">
                <img class="img1" :src="good.image">
                <div class="back" @click="hide">
                    <i class="icon-arrow_lift"></i>
                </div>
            </div>
            <div class="content">
                <h1 class="tittle">{{good.name}}</h1>
                <div class="detail1">
                    <span class="sell-count">月销量12笔</span>
                    <span class="count">库存{{good.num}}件</span>
                    <span class="rating">好评率98%</span>
                </div>
                <div class="collect" ref="star" @click="collect(good.id)">
                    <i class="el-icon-star-off"></i>
                     收藏
                </div>
                <div class="sellPoint">
                    {{good.sellPoint}}
                </div>
                <div class="price">
                    <span class="now">￥{{good.price}}</span>
                    <span class="old" v-show="good.oldPrice">￥{{good.oldPrice}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                <!-- 绑定前为子组件属性，后为父组件 -->
                    <!-- <cartcontrol :food="good"></cartcontrol> -->
                    <el-input-number v-model="num" size="mini" @change="handleChange" :min="1" :max="10" label="描述文字"></el-input-number>
                    <el-button type="primary" size="mini" class="buy" round @click="addCart(good.id)">加入购物车</el-button>
                </div>
                <!-- <transition name="fade2">
                 <div v-show="!good.count||good.count===0" @click="addFirst($event)" class="buy">加入购物车</div>           
                 </transition> -->
                
            </div>
            <split v-show="good.sellPoint"></split>
            <div class="info" v-show="good.sellPoint">
                <h1 class="tittle">商品信息</h1>
                <p class="text">{{good.sellPoint}}</p>
            </div>
            <split v-show="good.info"></split>
            <div class="rating1">
                <h1 class="tittle">商品评价</h1>
                <ratingselect :select-type="selectType" :only-content="onlyContent"
                :desc="desc" :ratings="good.ratings"></ratingselect>
                <div class="rating-wrapper">
                    <ul v-show="good.ratings && good.ratings.length">
                        <li class="rating-item border-1px" v-for="rating in good.ratings">
                            <div class="user">
                                <span class="name">{{rating.username}}</span>
                                <img :src="rating.avatar" width="12" height="12"  class="avater">
                            </div>
                            <div class="">{{rating.rateTime}}</div>
                            <p class="text1">
                                <span :class="{'icon-thumb_up':rating.rateType===0,
                                'icon-thumb_down':rating.rateType===1}"></span>
                                {{rating.text}}
                            </p>
                        </li>
                    </ul>
                    <div class="no-rating" v-show="!good.ratings||!good.ratings.length">暂无评价</div>
                </div>
            </div>
        </div>
        <router-link to="/cart">
         <div class="foot">
            <span>
                前往购物车
                <i class="el-icon-arrow-right"></i>
            </span>          
         </div>
        </router-link>
      

    </div>
    </transition>
</template>

<script>
import qs from 'qs'
import axios from 'axios'
import BScroll from 'better-scroll'
import Vue from 'vue'
import split from '../split/split.vue';
import ratingselect from '../ratingselect/ratingselect.vue'

const  POSITIVE=0;
const NAGATIVE=1;
const ALL=2;
export default {
    props:{
        good:{
            type:Object,
             default(){
                return {};
            }
        },
        selectType:ALL,
        onlyContent:true,
    },
    //依赖
    data(){
        return {
            showFlag:false,
            // selectType:ALL,
            // onlyContent:true,
            num: 1,
            desc:{
                all:'全部',
                positive:'推荐',
                nagative:'吐槽'
            }          
        }
    },
    methods:{
        show(){
            this.showFlag=true;
            this.selectType=ALL;
            this.onlyContent=true;
            this.$nextTick(()=>{
                if(!this.$scroll){
                    this.scroll=new BScroll(this.$refs.good1,{click:true});
                }
                this.scroll.refresh();              
            })
        },
        handleChange(value) {
        console.log(value);
      },
      
        hide(){
             this.showFlag=false;
        },
        // addFirst($event){
        //     if(!event._constructed){
        //           return;
        //     }
        //     if(!this.good.count){
          
        //         Vue.set(this.good,'count',1);               
        //     }
        //     else{
        //         this.good.count++;
        //     }
        // },
        
        //收藏商品
          collect(id){
            const that =this;
             this.$axios({
                url: '/api/api/v1/star',
                method: 'post',
                data: {
                    id:id,
                },
            transformRequest: [function (data) {
                data = qs.stringify(data);
                return data;
            }],
            headers:{'Content-Type':'application/x-www-form-urlencoded'}
                }) .then(function (response) {    
                    alert("收藏成功！！");
                    that.$refs.star.style.color = 'red';
                    console.log(response);
                    }).catch(function (error) {
                        alert("收藏失败！！")
                    console.log(error);
                });     
        },
        //加入购物车
        addCart(id){
               this.$axios({
                url: '/api/api/v1/cart',
                method: 'post',
                data: {
                    id:id,
                    amount:this.num
                },
            transformRequest: [function (data) {
                data = qs.stringify(data);
                return data;
            }],
            headers:{'Content-Type':'application/x-www-form-urlencoded'}
                }) .then(function (response) {
                    console.log(response);
                    }).catch(function (error) {
                    console.log(error);
                });     
        }
    },
    
    events:{
        'typeSelect'(type){
            this.selectType=type;
            this.scroll.refresh();  
        },
        'contentToggle'(onlyContent){
            this.onlyContent=onlyContent;
            this.scroll.refresh();  
        }
    },
    components:{
        split,
        ratingselect
    }
}
</script>

<style lang="stylus" scoped>
@import "../../common/stylus/mixin";
.detail
    position fixed
    left 0
    top 0
    bottom 48px
    z-index 30
    width 100%
    background #ffffff  
    .mv-enter-active,.mv-leave-active 
        transition  all .2s linear       
        transform translate3d(0,0,0)          
    .mv-enter,.mv-leave
        transform translate3d(100%,0,0)
     .food-content  
        .image-header
            position relative
            width 100%
            height 0
            // width 512px
            // height 384px
            padding-top 100%          
            .img1
                position absolute
                top 0
                left 0           
                width 100%
                height 100%
            .back
                position absolute
                top 10px
                left 0
                .icon-arrow_lift
                    display block
                    padding 10px
                    font-size 20px
                    color #fff
        .content
            position relative
            padding 18px
            .tittle
                line-height 14px
                margin-bottom 8px
                font-size 14px
                font-weight 700
                color rgb(7,17,27)
             .collect
                position: absolute;
                right: 35px;
                top: 25px;
                font-size: 14px;
                .el-icon-star-off
                    font-size: 20px;
            .detail1
                margin-bottom 18px
                line-height 10px
                font-size 0
                height 10px
                .sell-count,.rating,.count
                    font-size 12px
                    color rgb(147,153,159)
                .count
                    padding-right 8px
                .sell-count
                    margin-right 12px
            .sellPoint
                font-size 14px
                color rgb(147,153,159)
                margin-right 12px
                line-height 20px
            .price 
                font-weight 700
                line-height 24px
                .now
                    margin-left 5px
                    font-size 14px
                    color rgb(240,20,20)
                .old
                    text-decoration line-through
                    font-size 10px
                    color rgb(147,153,159)
            .buy
                position absolute 
                right 30px
                // top 100px
                margin-top: -20px;
                z-index 10  
                height 24px
                line-height 24px
                padding 0 12px
                box-sizing border-box
                font-size 10px
                border-radius 12px
                color #ffffff
                background rgb(0,160,220)
            
                .move-enter-active, .move-leave-active
                    opacity 1
                    transition all 0.5s
                .move-enter, .move-leave-active 
                    opacity 0      
                    background rgb(0,160,220)
        .info
            padding 18px
            .tittle
                line-height 14px
                margin-bottom 6px
                font-size 14px
                color rgb(7,17,27)
            .text
                line-height 24px
                padding 0 8px 
                font-size 12px
                color rgb(77,85,93)
        .rating1
            padding-top 18px
            .tittle
                line-height 14px
                margin-left 18px
                font-size 14px
                color rgb(7,17,27)
            .rating-wrapper
                padding 0 18px
                .rating-item
                    position relative
                    padding 16px 0
                    border-1px(7,17,27,0.1)
                    .user
                        position absolute
                        right 0
                        top 16px
                        line-height 12px  
                        font-size 0
                        .name
                            display inline-block
                            margin-right 6px
                            vertical-align top
                            font-size 10px
                            color rgb(147,153,159)
                        .avatar
                            border-radius 50%
                    .time
                        margin-bottom 6px
                        line-height 12px
                        font-size 10px
                        color rgb(147,153,159)
                    .text1
                        line-height 16px
                        font-size 12px
                        color rgb(7,17,27)
                        .icon-thumb_up,.icon-thumb_down
                            margin-right 4px
                            line-height 16px
                            font-size 12px
                        .icon-thumb_up
                            color rgb(0,160,220)
                        .icon-thumb_down
                            color rgb(147,153,159)
                .no-rating
                    padding  16px 0
                    font-size 12px
                    color rgb(147,153,159)
    .foot
        position: fixed;
        float: left;
        bottom: -30px;
        z-index: 10;
        height: 80px;
        width: 100%;
        line-height: 1.5;
        padding-left: 30px;
        background: #fff
</style>


