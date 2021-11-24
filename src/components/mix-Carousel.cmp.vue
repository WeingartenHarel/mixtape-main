<template>
  <el-carousel indicator-position="outside" :interval="24000" :autoplay="true">

    <el-carousel-item v-for="item in imgs" :key="item" > 
<!-- <youtube :video-id="videoId" :player-vars="playerVars" @playing="playing"></youtube> -->
  
      <img class="left" v-bind:src="item"/>
      <!-- <h3 class="medium">{{ item }}</h3> -->
    </el-carousel-item>
  </el-carousel>
</template>

<script>
    export default {
      name:'mix-carosel',
      data(){
        return{
          imgs:[
            // 'https://res.cloudinary.com/hw-projects/image/upload/v1606309302/appmixes/party001.jpg',
            'https://res.cloudinary.com/hw-projects/image/upload/v1606309308/appmixes/party002.jpg',
            // 'https://res.cloudinary.com/hw-projects/image/upload/v1606309300/appmixes/party003.jpg',
         
         ],
        }
      },
      props:{
      
      },
      components: {  },
      computed : {
      },
      created(){
        
      }
    }
</script>

<style>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>