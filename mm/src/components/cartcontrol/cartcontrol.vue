// 加减商品组件
<template>
    <div class="cartcontrol">
        <transition name="move">
            <div class="cart-decrease icon-remove_circle_outline" 
            v-show="food.count>0" @click.stop="decreaseCart"></div>
        </transition>
        
        <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
        <div class="cart-add icon-add_circle" @click.stop="addCart"></div>
    </div>
</template>

<script>
import Vue from 'vue'

export default {
    props:{
        food:{
            type:Object
        }
    },
    methods:{
        addCart(event){
            if(!event._constructed){
                  return;
            }
            if(!this.food.count){
            //为food对象新增count属性，并将其置为1，会影响父组件goods里的food
                Vue.set(this.food,'count',1);               
            }
            else{
                this.food.count++;
            }
        },
        decreaseCart(){
            if(!event._constructed){
                  return;
            }
            if(this.food.count>0){
                this.food.count--;
            }
        }
    }
};
</script>

<style lang="stylus">
.cartcontrol
    font-size 0   
    transform: translate3d(0, 0, 0);
    .move-enter-active, .move-leave-active
        transform rotate(180deg)
        transition: all .5s linear;
    .move-enter, .move-leave-active       
        transform: translate3d(24px, 0, 0);
    .cart-decrease,.cart-add
        line-height 24px
        font-size 24px
        display inline-block
        padding 6px
        color rgb(250, 73, 73)
    .cart-count
        display inline-block
        vertical-align top
        font-size 10px
        width 12px
        padding-top 6px
        line-height 24px
        text-align center
        color rgb(147,153,159)
        
       
</style>
