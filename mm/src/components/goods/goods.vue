<template>  
    <div class="goods">
        <div class="head">
             <div class="search">
                <i class="el-icon-arrow-left" @click="goback"></i>        
                    分类                                    
             </div>
        </div>
        <div class="menu-wrapper" ref="menuWrapper">
            <ul>
                 <li class="menu-item" v-for ="(item,index) in goods" 
                 :class="{'current':currentIndex==index}" @click="selectMenu(index,$event)">
                    <span class="text border-1px">
                        <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>
                        {{item.name}}
                    </span>
                </li>
            </ul>
        </div> 
        <div class="foods-wrapper" ref="foodsWrapper">
            <ul>
                <li v-for="item in goods" class="food-list food-list-hook">
                    <h1 class="tittle">{{item.name}}</h1>
                    <ul>
                        <li v-for="food in item.foods" @click.stop="selectFood(food,$event)" class="food-item border-1px">
                            <div class="icon">
                                <img height="57" width="57" :src="food.icon">
                            </div>
                            <div class="content">
                                <h2 class="name">{{food.name}}</h2>
                                <p class="desc">{{food.description}}</p>
                                <div class="extra">
                                    <span class="count">月售{{food.sellCount}}件</span>
                                    <span>好评率{{food.rating}}%</span>
                                </div>
                                <div class="price">
                                    <span class="now">￥{{food.price}}</span>
                                    <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                                </div>
                                <div class="cartcontrol-wrapper">
                                    <cartcontrol :food="food"></cartcontrol>
                                </div>
                            </div>

                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <shopcart :select-foods="selectFoods"></shopcart>

        <food :good="selectGood" ref="good"></food> 

        
    </div> 
    
    
</template>

<script>
 import BScroll from 'better-scroll'
 import shopcart from '../shopcart/shopcart.vue'
 import cartcontrol from '../cartcontrol/cartcontrol.vue'
 import food from "../food/good.vue"
 import VueEvent from "../../common/js/eventVue"
//  import header from '../header/header'

const ERR_OK=0;
export default {
    props:['seller'],
    data(){
       return {
          goods:[],
          scrollpic:[],
          listHeight:[],
          scrollY:0,
          selectGood:{},
          input:''
       }; 
    },
    computed:{

        currentIndex(){
            for(let i=0;i<this.listHeight.length;i++){
                let height1=this.listHeight[i];
                let height2=this.listHeight[i+1];
                if(!height2||(this.scrollY >= height1&&this.scrollY<height2)){
                    return i;
                }
            }
            return 0;
        },
        //添加进购物车计算属性，实现购物车和组件联动
        selectFoods(){
            let foods=[];
            this.goods.forEach(goods=>{
                goods.foods.forEach(food=>{
                //遍历food，如果food有了count属性
                    if(food.count){
                        foods.push(food);
                    }
                });
            });
            //返回的是购物车里的商品
            return foods;
        }
    },
    created () {

        this.classMap=['decrease','discount','special','invoice','guarantee'];

        this.$http.get('/api/goods').then(response => {
            // console.log(response);
        response=response.body
        if(response.errno===ERR_OK){
          this.goods=response.data;
          this.$nextTick(()=>{
              this._initScroll();
              this._calculateHeight();
          })
          }
        });  
    },
  methods:{
      goback(){
          this.$router.go(-1);
      },
      selectMenu(index,event){
          if(!event._constructed){  //阻止浏览器点击多次
              return;
          }
          let foodList=this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
          let el=foodList[index];
          this.foodsScroll.scrollToElement(el,300);
                },
      _initScroll(){
          this.menuScroll=new BScroll(this.$refs.menuWrapper,{click:true});
          this.foodsScroll=new BScroll(this.$refs.foodsWrapper,{click:true,probeType:3});
          this.foodsScroll.on('scroll',(pos)=>{
              this.scrollY=Math.abs(Math.round(pos.y));
          })
      },
      _calculateHeight(){
          let foodList=this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
          let height=0;
          this.listHeight.push(height);
          for(let i=0;i<foodList.length;i++){
              let item=foodList[i];
              height+=item.clientHeight;
              this.listHeight.push(height);

          }
      },
      selectFood(good,event){
          if(!event._constructed){
              return;
          }
          this.selectGood=good;
          this.$refs.good.show();
      },
      selectGoods(){
          VueEvent.$emit('to-cart',this.selectGood)
      }

  },
  components:{
    //   'v-header':header,
      shopcart,
      cartcontrol,
      food
  }
  
}
</script>

<style lang="stylus" scoped>
@import "../../common/stylus/mixin";
    .goods
        display flex  
        position absolute
        top 50px
        bottom 46px
        width 100%
        overflow hidden
        .head
            position fixed
            left 0
            top 0   
            height 50px 
            width 100%
            background #f2f2f2 
            line-height 50px 
            vertical-align center      
            .search                              
                font-size 20px
                text-align center 
                .el-icon-arrow-left
                    float left
                    line-height 50px
                    font-size 30px
      
        .menu-wrapper
            flex 0 0 80px
            width 80px
            background #f3f5f7
            .menu-item
                display table
                height 54px
                width 56px
                line-height 14px
                padding 0 12px
                &.current
                    position relative
                    font-weight 700
                    margin-top -1px
                    z-index  10
                    background #fff
                    .text
                        border-none()

                .text
                    display table-cell
                    width  56px
                    vertical-align middle
                    border-1px(rgba(7,17,27,0.1))
                    font-size 12px
                    .icon
                        display inline-block
                        vertical-align top
                        width 12px
                        height 12px
                        margin-right 2px
                        background-size 12px 12px
                        background-repeat no-repeat
                        &.decrease
                            bg-image('decrease_3')
                        &.discount
                            bg-image('discount_3')
                        &.guarantee
                            bg-image('guarantee_3') 
                        &.invoice
                            bg-image('invoice_3') 
                        &.special
                            bg-image('special_3') 
                    
        .foods-wrapper
            flex 1
            .tittle
                padding-left 14px
                height 26px
                line-height 26px
                border-left 2px solid #d9dde1
                font-size 12px
                color rgb(147,153,159)
                background  #f3f5f7
            .food-item
                display flex
                margin  18px
                padding-bottom 18px
                border-1px(rgba(7,17,27,0.1))
                &:last-chiid
                    border-none()
                    margin-bottom 0
                .icon
                    flex 0 0 57px
                    margin-right 10px
                .content
                    flex 1
                    .name
                        margin 2px 0 8px 0
                        height 14px
                        line-height 14px
                        font-size 14px
                        color rgb(7,17,27)
                    .desc,.extra
                        line-height 10px
                        font-size 10px
                        color rgb(147,153,159)
                    .desc
                        line-height 12px
                        margin-bottom 8px
                    .extra
                        &.count
                            margin-right 12px
                    .price 
                        font-weight 700
                        line-height 24px
                        .now
                            margin-right 8px
                            font-size 14px
                            color rgb(240,20,20)
                        .old
                            text-decoration line-through
                            font-size 10px
                            color rgb(147,153,159)
                    .cartcontrol-wrapper
                        position absolute
                        right 0
                        bottom 12px

                        


                
</style>
