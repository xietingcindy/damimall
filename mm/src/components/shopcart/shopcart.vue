<template>
<div>
    <div class="shopcart">
        <div class="content" @click="toggleList">
            <div class="content-left">
                <div class="logo-wrapper">
                    <div class="logo" :class="{'heightlight':totalCount>0}">
                        <i class="icon-shopping_cart" :class="{'heightlight':totalCount>0}"></i>
                    </div>
                    <div class="num" v-show="totalCount>0">{{totalCount}}</div>
                </div>
                <div class="price" :class="{'heightlight':totalPrice>0}">￥{{totalPrice}}</div>
                <!-- <div class="desc">另需配送费￥{{deliveryPrice}}</div> -->
            </div>
            <div class="content-right" @click.stop.prevent="pay">
                <div class="pay" :class="payClass">
                    {{payDesc}}
                </div>
            </div>
        </div>
        <transition name="fold">
            <div class="shopcart-list" v-show="listShow">
            <div class="list-header">
                <h1 class="tittle">购物车</h1>
                <span class="empty" @click="empty">清空</span>
            </div>
            <div class="list-content" ref="listContent">
                <ul>
                    <li class="food" v-for="food in selectFoods">
                        <span class="name">{{food.name}}</span>
                        <div class="price">
                            <span>￥{{food.price*food.count}}</span>
                        </div>
                        <div class="cartcontrol-wrapper">
                            <cartcontrol :food="food"></cartcontrol>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        </transition>
        
    </div>
    <transition name="fad">
        <div class="list-mask" v-show="listShow" @click="hideList"></div> 
    </transition>
</div>
    
        
 
    
</template>

<script>
import BScroll from 'better-scroll'
import cartcontrol from '../cartcontrol/cartcontrol.vue'
export default {
    props:{
        deliveryPrice:{
            type:Number
        },
        selectFoods:{
            type:Array,
            default(){
                return [];
            }
        }
    }, 

    //购物车是否折叠
   data(){
    return {
      fold :true
    };
  },
   
    computed:{
        //总价
        totalPrice(){
            let total=0;
            this.selectFoods.forEach(food => {
                total+=food.price*food.count;
            });
            return total;
        },
        //件数
        totalCount(){
            let count=0;
            this.selectFoods.forEach(food=>{
                count+=food.count;
            });
            return count;
        },
        //配送描述
        payDesc(){
            if(this.totalPrice===0){
                return `购物车为空喔`;
            }
            else{
                return `去结算`;
            }
        },
        //是否达到起送价格
        payClass(){
            if(this.totalPrice<this.minPrice){
                return 'not-enough';
            }
                return 'enough';
        },
        //购物车弹层显示
        listShow(){
            if(!this.totalCount){
                this.fold=true;
                return false;
            }
            let show=!this.fold;
            if(show){
                 this.$nextTick(()=>{
                     if(!this.scroll){
                        this.scroll=new BScroll(this.$refs.listContent,{
                        click:true
                        });
                     }else{
                         this.scroll.refresh();
                     } 
              })
            }
            return show;
        }
    },
     methods:{
        toggleList(){
            if(!this.totalCount){
                return
            }
            this.fold=!this.fold;
        },
        empty(){
            this.selectFoods.forEach(food=>{
                food.count=0;
            })
        },
        hideList(){
            this.fold=true;
        },
        pay(){
            if(this.totalPrice<this.minPrice){
                return;            }
            window.alert(`需要支付${this.totalPrice}元`);
        }
    },
    components:{
        cartcontrol
    }
}
</script>

<style lang="stylus">
@import "../../common/stylus/mixin";

    .shopcart
        position fixed
        left 0
        bottom  0
        z-index 50
        width 100%
        height 48px

        
        .content
            display flex
            background #141d27
            color rgba(255,255,255,0.4)
            .content-left
                flex 1
                .logo-wrapper
                    display inline-block
                    vertical-align top
                    position relative
                    top  -10px
                    margin 0 12px
                    padding 6px
                    width 56px
                    height 56px
                    box-sizing border-box
                    vertical-align top
                    border-radius 50%
                    background #141d27
                    .num
                        position absolute
                        top 0
                        right 0
                        width 24px
                        height 16px
                        line-height 16px
                        text-align center
                        border-radius 16px
                        font-size 9px
                        font-weight 700
                        color #fff
                        background rgb(240,20,20)
                        box-shadow 0 4px 8px 0 rgba(0,0,0,0.4) 
                    .logo
                        height 100%
                        width 100%
                        border-radius 50%
                        background #2b3c3c
                        text-align center
                        &.heightlight
                            background rgb(250, 73, 73)
                        .icon-shopping_cart
                            font-size 24px
                            color #80858a
                            line-height 44px
                            &.heightlight
                                color #fff
                    
                .price
                    display inline-block
                    vertical-align top
                    line-height 24px
                    margin-top 12px
                    box-sizing border-box
                    padding-right 12px
                    border-right 1px solid rgba(255,255,255,0.1)
                    font-size 16px
                    font-weight 700
                    &.heightlight
                        color #fff
                    
                // .desc
                //     display inline-block
                //     vertical-align top
                //     line-height 24px
                //     margin 12px 0 0 12px
                //     font-size 10px
                   

            .content-right
                flex 0 0 105px
                width 105px
                .pay
                    font-size 12px
                    height 48px
                    line-height 48px 
                    text-align center
                    font-weight 700
                    background #2b333b
                    &.not-enough
                        background #2b333b
                    &.enough
                        background rgb(250, 73, 73)
                        color #fff
        .shopcart-list
            position absolute
            left 0
            top 0
            z-index -1
            width 100%
            transform: translate3d(0, -100%, 0);
        .fold-enter-active, .fold-leave-active
            transition: all .5s;
        .fold-enter, .fold-leave-active       
            transform: translate3d(0, 0, 0);
        .list-header
            height 40px
            line-height 40px
            padding 0 18px
            background #f3f5f7
            border-bottom 1px solid rgba(7,17,27,0.1)
            .tittle
                float left
                font-size 14px
                color rgb(7,17,27)
            .empty
                float right 
                // margin-top -30px 
                font-size 14px
                color rgb(0,160,220)
        .list-content
                padding 0 18px
                max-height 217px
                // overflow hidden
                background #fff
                .food
                    position relative
                    padding 12px 0
                    box-sizing border-box
                    border-1px(rgba(7,17,27,0.1))
                    .name
                        line-height 24px
                        font-size 14px
                        color rgb(7,17,27)
                    .price
                        position absoulte 
                        right 90px
                        bottom 12px
                        line-height 24px
                        font-size 14px
                        font-weight 700
                        color rgb(240,20,20)
                   .cartcontrol-wrapper
                       position absolute
                       right 0
                       bottom 6px
     .list-mask
                position fixed
                top 0 
                left 0
                width 100%
                height 100%
                z-index 40
                backdrop-filter blur(10px)
                background rgba(1,17,27,0.6)                  
    .fad-enter-active,.fad-leave-active
            transition: all .5s
            
    .fad-enter,.fad-leave
            opacity: 0
            background rgba(1,17,27,0)
           
                
                
      



</style>
