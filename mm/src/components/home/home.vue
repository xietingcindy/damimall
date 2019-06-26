<template>
<div class="home">
    <div class="head" height="188" width="375">
        <v-header :scrollpics="scrollpics"></v-header>
    </div>
       <div class="good-wrapper">        
        <div class="line"></div>
        <div class="list-wrapper" ref="listWrapper">
            <div class="rec" v-if="recpic[0].pic">
                <img class="rec1" :src="recpic[0].pic" width="175" height="254">
                <img class="rec2" :src="recpic[1].pic" width="175" height="125">
                <img class="rec3" :src="recpic[2].pic" width="175" height="125">
            </div>
            <div class="line cows-line"></div>
            <div> 
                <img class="rec4" src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/76e9a3e12c35dbbc9c15fddb3a69bb81.jpg?thumb=1&w=720&h=280" width="100%" height="140">
            </div>
            <div class="good-list">
                <ul>
                     <!-- class="v-infinite-scroll"  -->                      
                    <li v-for="item in goods" class="item-list">
                        <div class="list-first">
                            <h1 class="tittle">{{item.name}}</h1>
                            <img class="img-big" src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/40f2193534336aa5b4d4034ab8aa242d.jpg?thumb=1&w=720&h=440">
                        </div> 
                        <ul>
                            <div>
                                 <li v-for="xgood in item.data" class="goods"> 
                                <!-- @click.stop="selectGood(xgood,$event)" -->                          
                                    <div class="good-item"  @click="select(xgood,$event)">
                                        <div class="item-img">
                                            <img height="175" width="175" :src="xgood.image">
                                        </div>
                                        <div class="info">
                                            <div class="good-name">
                                                {{xgood.title}}
                                            </div>
                                            <div class="describ">
                                                {{xgood.sellPoint}}
                                            </div>
                                            <div class="good-price">
                                                <span class="p-now">￥{{xgood.price}}</span>
                                                <span class="p-old" v-show="xgood.oldPrice">￥{{xgood.oldPrice}}</span>
                                            </div>
                                        </div>
                                    </div>
                                </li> 
                            </div>
                                                        
                        </ul>                                                                                                                            
                    </li>
                </ul>
            </div>
            <div class="divider_line" style="height: 0.02rem; border-bottom: 0.02rem solid rgb(206, 206, 206); background-color: rgb(206, 206, 206);" index="34"></div>
            <div class="tib">更多小米手机产品 ></div>
        </div>
        <!-- <el-backtop target=".good-list" :bottom="100">      -->
        <detail :good="selectGood" ref="good"></detail>
      </div>
</div>
    
</template>

<script>
import axios from 'axios'
import BScroll from 'better-scroll'
import header from '../header/header'
import detail from '../goods/detail'
let ERR_OK=0;
export default {
     props:{
         scrollpic:{
            type:Object,
             default(){
                return {};
            }
         }
     },
         
     data () {
      return {
        count: 0,
        scrollpics:[],
        recpic:[],
        goods:[],
        selectGood:{}
      } 
    },
    methods: {
      _initScroll(){
          let listScroll=new BScroll(this.$refs.listWrapper,{click:true});
        },
        select(good,event){
        //   if(!event._constructed){
        //       return;
        //   }
          this.selectGood=good;
          this.$refs.good.show();
      },
    },
    created(){
          this.$axios.get('/api/api/v1/content/hot/1184').then(response => {
        // console.log(response);    
            this.goods=response.data.data;
            console.log(this.goods);
            this.$nextTick(()=>{
              this._initScroll(); 
            });
          
        });
        this.$axios.get('/api/api/v1/content/89').then(response => {
        // console.log(response);
            response=response.data.data
            // console.log(response)
            this.recpic=response;
            // console.log(this.recpic[0].pic)       
        });   
         this.$axios.get('/api/api/v1/content/89').then(response => {
        // console.log(response);
            response=response.data.data
            // console.log(response)
            this.scrollpics=response;
            console.log(this.scrollpics);       
        }); 
    },
    components:{
        'v-header':header,
        detail
    }
}
</script>

<style lang="stylus" scoped>
@import "../../common/stylus/mixin";
// .home
//     .good-wrapper
        .search 
            position relative
            display  inline-block
            margin-top  8px
            margin-left 20px
            padding: 5px auto 
            /* vertical-align: top */
            margin-bottom: 10px
            .search-text
                margin-left 50px
                line-height 40px
            .el-icon-goods
                position absolute
                left 10px
                top:2px
                font-size: 30px
                padding-right: 5px
    .line
        vertical-align middle
        height 0.16rem
        background-color rgb(245,245,245)
        border-bottom 0.16rem solid rgb(245,245,245)
    .list-wrapper
        display inline-block
        flex-flow:row
        align-content: flex-start
        .rec
            position relative
            width 360px
            height 254px
            padding 8px 
            margin 2px                    
            .rec1,
                display block 
                float left
                padding-top: 7px;
                // padding 4px              
            .rec2,.rec3
                padding 4px
                display block
        .line
            cows-line()
            height 5px
    .good-list
            .item-list
                .tittle
                    font-size: 25px;
                    color: #888888;
                    /* background: #fff; */
                    height: 45px;
                    vertical-align: top;
                    line-height: 45px;
                    font-weight: 800;
                    margin-left: 20px;
                .img-big 
                    margin 0 auto                    
                    width 100%
                    height 200px
                .goods
                    display inline-block
                    position relative
                    padding 4px
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    .good-item
                        vertical-align middle
                        padding-left 4px 
                        .info
                            padding: .2rem .27rem;
                            text-align: left;
                            white-space: nowrap;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            .good-name
                                font-size: .28rem;
                                color: rgba(0,0,0,.87);
                            .describ
                                margin-top: 5px;
                                width 150px  
                                                             
                                overflow hidden
                                font-size: .22rem;
                                // line-height: .3rem;
                                color: rgba(0,0,0,.54);
                            .good-price
                                padding: .2rem .27rem;
                                text-align: left;
                                font-size: .28rem;
                                height: 1.5em;
                                line-height: 1.5em;
                                position: relative;
                                display: inline-block;
                                .p-now
                                    color: #ea625b;
                                .p-old
                                    font-size: .22rem;
                                    text-decoration line-through
                                    color: rgba(0,0,0,.54);
    .tib
        color: rgba(0,0,0,.6);
        margin-top: 15px;
        line-height: 1rem;
        font-size: .28rem;
        height: 52px;
        text-align: center;           
                        
                        
</style>
