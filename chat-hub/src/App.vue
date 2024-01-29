<template>
  <div class="flex w-full h-screen">
    <!-- 왼쪽 메뉴 -->
    <div class="flex flex-col justify-between w-1/5 h-screen custom-background">
      <SideBar></SideBar>
    </div>


    <!-- 오른쪽 섹션 -->
    <div class="flex flex-col justify-between w-4/5 h-screen">
      <InitPage v-if="$store.state.page == 0"></InitPage>
      
      <MainPage v-if="$store.state.page == 1"></MainPage>
    </div>
  </div>
</template>

<script>
import InitPage from '@/pages/InitPage.vue'
import MainPage from '@/pages/MainPage.vue'
import SideBar from '@/components/SideBar.vue'

export default {
  name: 'App',
  components:{
    InitPage,
    MainPage,
    SideBar
},
  data() {
    return {
    }
  },
  methods: {

  },
  mounted() {

  }
}
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Roboto:400,500,700&display=swap');

  .custom-background {
    background-color: #EEEEFF;
  }

  .chathub-main{
    color: #FF6600;
  }

  .chathub-sub{
    color: #6666FF;
  }

  .chathub-day{
    color: #FAA166;
  }

  .chathub-back{
    color: #27279C;
  }

  .chathub-back-madeby{
    color: #8686FF;
  }

  

  /* .chathub-chat-box{
    border-color: #27279C;
    border-width: 2px;
    background-color: #EEEEFF;
  } */

  div::-webkit-scrollbar {
  display: none;
}
  body {
    margin: 0;
    padding: 0;
    /* width: 1920px;
    height: 1080px; */
    /* border: 1px solid #000; */
    font-family: 'Roboto', sans-serif;
  }
</style>