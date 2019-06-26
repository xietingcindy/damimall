<template>
    <div class="header">
        <el-carousel height="188px">
            <el-carousel-item v-for="card in scrollpics">
                <div class="pics-list">
                    <img :src="card.pic" class="scroll-img">
                </div>
            </el-carousel-item>
         </el-carousel>
    </div>
</template>

<script>
import axios from 'axios'

const ERR_OK=0;
export default {
    props:{
        scrollpics:{
            type:Array
            }
        },
    data(){
        // return{
        //    scrollpic:[],
        // } 
    },
    methods:{
       
    },
    created(){
        // this.$axios.get('/api/api/v1/content/89').then(response => {
        // // console.log(response);
        //     response=response.data.data
        //     // console.log(response)
        //     this.scrollpic=response;
        //     console.log(this.scrollpic);
            
          
        // });   
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
    
  
  
    
            
            






</style>
