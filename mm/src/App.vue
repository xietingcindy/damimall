<template>
  <div id="app"> 
    <router-view :goods="goods"></router-view>
    <div class="tab">
      <div class="tab-item">
        <router-link to="/home">
          <span><i class="el-icon-s-home">首页</i></span>
        </router-link>
      </div>
      <div class="tab-item">
        <router-link to="/goods">
            <span><i class="el-icon-s-shop">分类</i></span>      
        </router-link>
      </div>
      <div class="tab-item">
        <router-link to="/cart">
            <span><i class="icon-shopping_cart">购物车</i></span>      
        </router-link>
      </div>
      <div class="tab-item">
        <router-link to="/user">
            <span><i class="el-icon-s-custom">个人中心</i></span>      
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
const ERR_OK=0;
export default {
  // name: 'App',
  // components: {},
  // name: 'header',
  data(){
    return {
      goods: {},
      scrollpic:{},
    };
  },
  created () {

    this.$http.get('/api/goods')
      .then(response => {
        //console.log(response);
        response=response.body
        if(response.errno===ERR_OK){
          this.goods = response.data
          //console.log(this.seller)
          }
        });  
  },
 
  components: { 

   }

}
</script>

<style lang="stylus" scoped>
@import "./common/stylus/mixin.styl"
  #app
   .tab
    position fixed
    bottom  0
    display flex
    z-index 5
    font-family: Helvetica Neue,Tahoma,Arial,PingFangSC-Regular,Hiragino Sans GB,Microsoft Yahei,sans-serif;
    text-align: center;
    color: #3c3c3c;
    background #ffffff
    width 100%
    height 52px
    line-height 52px
    font-size 20px
    
  
  .tab-item
    flex 1
    text-align center
    // border-bottom: 1px solid rgba(7, 17, 27, 0.1)
    border-1px(rgba(7, 17, 27, 0.1))
  &>a
    display  block
    font-size 14px
    color rgb(77, 85, 93)  
    &.active
      color rgb(240, 20, 20)
  
</style>


