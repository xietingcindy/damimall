<template>
    <div class="user">
    <div class="scroll-content" >
        <div class="scroll">
         <div class="header home-header">
            <div class="toolbar statusbar-padding active">
                <button class="bar-button current-city"><i class="icon el-icon-s-tools"></i></button>
                <button class="bar-button icon-button"><i class="icon el-icon-chat-line-round"></i></button>
            </div>
        </div>
        <div class="my-info">
            <div class="my-info-background" style="background-color:#fa4949; -webkit-filter:blur(0px)"></div>
            <img class="my-avatar" src="./touxiang.jpg">
            <span class="name" v-show="isLogin">{{username}}</span>
            <span class="my-vip"  style="background:none">
                <router-link v-show="!isLogin" to="/login">登陆/</router-link>
                <a @click="userout">登出</a>
                <router-link to="/register">注册</router-link>
            </span>
             <!-- <router-view :login="login"></router-view> -->
        </div>
       
        <div class="my-car-shortcut">
            <div class="layout-column">
                <router-link to="/collect" class="col">           
						<span class="img-icon ">
							<img class="img-icon-home" src="./icon-ax-6.png" />
						</span>
                    <span class="img-icon-name">我的收藏</span>
                </router-link>
                <router-link to="/address">
                <a class="col"  rel="test" href="#">
							<span class="img-icon ">
								<img class="img-icon-home el-icon-location-information" src="./icon-ad3.png" />
							</span>
                    <span class="img-icon-name">我的地址</span>
                </a>
                </router-link>

                <a class="col" href="#" rel="test">
							<span class="img-icon ">
								<img class="img-icon-home" src="./icon-ax-8.png" />
							</span>
                    <span class="img-icon-name">我的消息</span>
                </a>
            </div>

        </div>
        <div class="devider b-line"></div>
        <!-- 个人中心 begin-->
        <div>
            <div class="aui-list-cells">
              <router-link to="/update">
                <a href="javascript:;" class="aui-list-cell">
                    <div class="aui-list-cell-fl"><img src="./icon-n-1.png"></div>
                    <div class="aui-list-cell-cn">我的信息</div>
                    <div class="aui-list-cell-fr"></div>
                </a>
              </router-link>
               
                <a href="javascript:;" class="aui-list-cell">
                    <div class="aui-list-cell-fl"><img src="./icon-n-3.png"></div>
                    <div class="aui-list-cell-cn">我的订单</div>
                    <div class="aui-list-cell-fr"></div>
                </a>
               
                <div class="devider b-line"></div>
                <a href="javascript:;" class="aui-list-cell">
                    <div class="aui-list-cell-fl"><img src="./icon-n-5.png"></div>
                    <div class="aui-list-cell-cn">意见反馈</div>
                    <div class="aui-list-cell-fr"></div>
                </a>
                <router-link to="/rate">
                <a href="javascript:;" class="aui-list-cell">
                    <div class="aui-list-cell-fl"><img src="./icon-n-6.png"></div>
                    <div class="aui-list-cell-cn">点击好评</div>
                    <div class="aui-list-cell-fr"></div>
                </a>
                </router-link>
                
                <div class="devider b-line"></div>
                
                <a href="javascript:;" class="aui-list-cell">
                    <div class="aui-list-cell-fl"><img src="./icon-n-8.png"></div>
                    <div class="aui-list-cell-cn">浏览历史</div>
                    <div class="aui-list-cell-fr"></div>
                </a>
                <router-link to="/about">
                <a href="javascript:;" class="aui-list-cell">
                    <div class="aui-list-cell-fl"><img src="./icon-n-7.png"></div>
                    <div class="aui-list-cell-cn">关于我们</div>
                    <div class="aui-list-cell-fr"></div>
                </a>
                </router-link>
                <div class="devider b-line"></div>
            </div>
        </div>


    </div>
</div>

    </div>
</template>

<script>
    import login from "../user/login"
    export default {
    data(){
        return{
            username:'',
            isLogin:false
        }
    },
    mounted(){
        // this.$route.query.username=this.username;
        if(sessionStorage.getItem("username")){
            this.username=sessionStorage.getItem("username");
            this.isLogin=true;
        }
    },
    methods:{
        //登出
       userout(){
        //    sessionStorage.removeItem(username); 
            sessionStorage.clear() //清除 sessionStorage 对象所有的项。
       }
    },
    computed:{
        
    },
  
}
</script>

<style scoped>
.scroll-content {
  position: absolute;
  width: 100%;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.aui-list-cell-fl img {
    width: 100%;
    height: 100%;
    display: block;
    border: none;
}
.scroll {
    position: absolute;
    z-index: 0;
    width: 100%;
}
.header {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 99;
    width: 100%;
    }
.statusbar-padding {
    height: 44px;
}
.header .current-city {
    padding-right: 20px;
    font-weight: 400;
    font-size: 13px;
    color: #ffffff;
}

.header .icon-button {
    width: 32px;
}
.header .bar-button {
    position: relative;
    z-index: 1;
    display: block;
    width: 56px;
    height: 32px;
    line-height: 30px;
    font-size: 17px;
    border: none;
    box-shadow: none;
    background: none;
}
.icon {
    display: block;
    margin: 0 auto;
    width: 25px;
    height: 25px;
    background-position: center center;
    background-repeat: no-repeat;
    -webkit-background-size: 32px;
    background-size: 32px;
}
.my-info {
    position: relative;
    overflow: hidden;
}
.my-info-background {
    width: 100%;
    min-height: 220px;
    overflow: hidden;
    background-position: center;
    background-repeat: no-repeat;
    -webkit-background-size: cover;
    background-size: cover;
    -webkit-filter: blur(5px);
    filter: blur(5px);
}
.my-info .my-avatar {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 98px;
    height: 98px;
    margin: -70px 0 0 -49px;
    border-radius: 50%;
    border: solid 4px rgba(255, 255, 255, 0.5);
}
.my-info .name {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 200px;
    height: 20px;
    margin: 40px 0 0 -100px;
    text-align: center;
    color: #fff;
}
.my-info .my-vip {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 200px;
    height: 24px;
    line-height: 24px;
    margin: 70px 0 0 -100px;
    padding: 0 4px;
    border-radius: 3px;
    text-align: center;
    font-size: 17px;
    color: #fff;
    background: rgba(0, 0, 0, 0.2);
}
.my-car-shortcut {
    padding: 15px;
}
.home-shortcut, .my-car-shortcut {
    position: relative;
    padding: 2px 5px;
}
.devider {
    display: -webkit-flex;
    display: flex;
    overflow: hidden;
    -webkit-align-items: center;
    align-items: center;
    -webkit-justify-content: space-between;
    justify-content: space-between;
    width: 100%;
    min-height: 10px;
    background: #f5f5f5;
}
.aui-list-cell-fr {
  font-size: 11px;
  text-align: right;
  color: #999999;
  padding-right: 13px;
  position: relative;
}
.b-line {
    position: relative;
}
.aui-list-cells {
    background-color: #FFFFFF;
    line-height: 1.41176471;
    font-size: 14px;
    overflow: hidden;
    position: relative;
}
.aui-list-cell {
    padding: 14px 15px;
    position: relative;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
}
.aui-list-cell-fl {
    width: 20px;
    height: 20px;
}

.layout-column .col {
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
    position: relative;
    height: 100%;
    text-align: center;
}
icon, .my-car-shortcut .img-icon {
    margin: 5px auto 4px auto;
}
.home-shortcut .img-icon-name, .my-car-shortcut .img-icon-name {
    display: block;
    margin-bottom: 8px;
    text-align: center;
    font-size: 13px;
    color: #646464;
}
.shortcut {
    position: relative;
    padding: 2px 5px;
}
.header .current-city {
    padding-right: 20px;
    font-weight: 400;
    font-size: 13px;
    color: #ffffff;
}
.header .bar-button {
    position: relative;
    z-index: 1;
    display: block;
    width: 56px;
    height: 32px;
    line-height: 30px;
    font-size: 17px;
    border: none;
    box-shadow: none;
    background: none;
}
.icon, .my-car-shortcut .img-icon {
    margin: 5px auto 4px auto;
}
.img-icon {
    position: relative;
    display: block;
    margin: 0 auto;
    width: 26px;
    height: 26px;
    overflow: hidden;
}
.layout-column {
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    width: 100%;
}
.header .current-city .icon-set {
    right: 22px;
}
.img-icon img {
    display: block;
    width: 100%;
    height: 100%;
    border: none;
}
.toolbar {
    display: -webkit-flex;
    display: flex;
    -webkit-flex-direction: row;
    flex-direction: row;
    -webkit-justify-content: space-between;
    justify-content: space-between;
    -webkit-align-items: center;
    align-items: center;
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
    width: 100%;
    padding: 6px;
    min-height: 44px;
}
.aui-list-cell::before {
    content: " ";
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    height: 1px;
    border-bottom: 1px solid #D9D9D9;
    color: #D9D9D9;
    -webkit-transform-origin: 0 100%;
    transform-origin: 0 100%;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
}
.aui-list-cell::after {
    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAACjUlEQVR4nO3WMY2VARCFUSSsBCQgAQfgACTggO02M3/x44CVgAQcYAUH0FAR7ru7BXmQd04y/W2+ZF68AAAAAAAAAAAAAAAAAOD/NDPvjuP4+OveXHsP/BN299XuftvdH7/dt/M87669D64qxCESmJkPF+IQCbdtZh6fEIhIuE27++WJgYiE2zMz988IRCTclvM872bmu0ggmJm3zwxEJNyW3X0vErhAJFCIBAqRQCESKEQChUigEAkUIoFCJFCIBAqRQCESKEQChUigEAkUIoFCJFCIBAqRQCESKEQChUigEAkUIoFCJFCIBAqRQCESKEQChUigEAkUIoFCJFCIBAqRQCESKEQChUigEAkUIoFCJFCIBAqRQCESKEQChUigEAkUIoFCJFCIBAqRQCESKEQChUigEAkUIoFCJFCIBAqRQCESKEQChUigEAkUIoFCJFCIBAqRQCESKEQChUigEAkUIoFCJFCIBAqRQCESKEQCF+zu5+cGMjOP194Nf504IBAHBOKAQBwQiAMCcUAgDgjEAYE4IBAHBOKAQBwQiAMCcUAgDgjEAYE4IBAHBOKAQBwQiAMCcUAgDgjEAYE4IBAHBOKAQBwQiAMCcUAgDgjEAYE4IBAHBOKAQBwQiAMCcUAgDgjEAYE4IBAHBOKAQBwQiAMCcUAgDgjEAYE4IBAHBOKAQBwQiAMCcUAgDgjEAYE4IBAHBOKAQBwQiAMCcUAgDgjEAYE4IBAHBOKAQBwQiAMCcUAgDgjEAcHM3IsD/mB3X4kDgt39JA4IdverOCCYmUdxQLC778UBF1x6s8TBzTvP8+5Pr9bM3F97G/wzHh4eXh7H8fo4jtfned5dew8AAAAAAAAAAAAAAD8BXuiHrSIluv8AAAAASUVORK5CYII=');
    background-position: center;
    background-repeat: no-repeat;
    background-size: 18px;
    width: 18px;
    height: 18px;
    content: " ";
    display: inline-block;
    position: relative;
    top: -8px;
    position: absolute;
    top: 50%;
    margin-top: -10px;
    right: 10px;
}

</style>
