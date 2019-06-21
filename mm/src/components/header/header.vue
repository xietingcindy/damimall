<template>
    <div class="header">
        <el-carousel height="188px">
            <el-carousel-item v-for="picture in this.scrollpic">
                <div class="pics-list">
                    <img :src="picture.pic" class="scroll-img">
                </div>
            </el-carousel-item>
         </el-carousel>
    </div>
</template>

<script>
import axios from 'axios'

const ERR_OK=0;
export default {
    props:['goods'],
    data(){
        return{
           scrollpic:[],
           
        } 
    },
    methods:{
       
    },
    created(){
        this.$axios.get('/api/api/v1/content/89').then(response => {
        // console.log(response);
            response=response.data.data
            // console.log(response)
            this.scrollpic=response;
            console.log(this.scrollpic);
            
          
        });   
    },

    components:{
       
    }
}
</script>

<style lang="stylus" scoped>
@import "../../common/stylus/mixin";
    .header 
        position relative
        .scroll-img
            height 188px
            width 375px
        //     // display: block;
        //     width: 100%;
        //     height: auto;
            // -webkit-transform: translate(-50%,-50%);
            // transform: translate(-50%,-50%);
            // position: absolute;
            // left: 50%;
            // top: 50%;
    
  
  
    
            
            






</style>
