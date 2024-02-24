<template>
  <div class="flex w-full h-screen">
    <!-- 왼쪽 메뉴 --> 
    <div class="flex flex-col justify-between w-1/5 h-screen custom-background">
      <SideBar></SideBar>
    </div>

    <!-- 오른쪽 섹션 -->
    <div class="flex flex-col justify-between w-4/5 h-screen overflow-hidden">
      <InitPage v-if="$store.state.page == 0"></InitPage>
      
      <MainPage v-if="$store.state.page == 1"></MainPage>

      
    </div>
  </div>
  <SignedPage v-if="$store.state.modelOpen == true"></SignedPage>
</template>

<script>
import { ensureUserInfo, initChatTrials } from '@/lib/user.js'

import InitPage from '@/pages/InitPage.vue'
import MainPage from '@/pages/MainPage.vue'
import SideBar from '@/components/SideBar.vue'
import SignedPage from '@/pages/SignedPage.vue'

export default {
  name: 'App',
  components:{
    InitPage,
    MainPage,
    SideBar,
    SignedPage
},
  data() {
    return {
    }
  },
  methods: {

  },
  created() { // 화면이 올라오기 전
    // 앱 초기화 시 UUID 확인
    const { userUUID, userChatTrials } = ensureUserInfo()
    // initChatTrials(0)
    this.$store.commit('setUserUUID', userUUID)

    console.log('[State] [userUUID]',this.$store.state.userUUID)
    console.log('User UUID:', userUUID)
    console.log('User Chat Trials:', userChatTrials)

    // 가지고 있는것 : 유저 아이디.. 단 하나,,,,
    // 1. 유저 아이디를 기반으로 log를 불러옴

    // 만약.. 로그가 있다면,,,, 
    
    // 
    this.$store.dispatch('handleChatLog')

  }, 
  mounted() { // 화면이 올라온 상태
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