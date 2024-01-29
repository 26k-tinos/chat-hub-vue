<template>
  <div class="flex flex-col justify-between items-center w-full h-full">
    <div class="flex flex-col pt-40 items-center">
      <div class="self-center"><img class="h-60 w-72" src="@/assets/chathub.png"/></div>
      <div class="text-4xl self-center py-1 chathub-main">CHAT HUB</div>
      <div class="text-2xl self-center py-1 chathub-sub">Try Everything! </div>
      <div class="self-center mb-2 pt-4 italic">with</div>
      <div class="flex justify-center gap-4">
        <div class="w-10 h-10"><img src="@/assets/gpt.png"/></div>
        <div class="w-10 h-10"><img src="@/assets/bard.png"/></div>
      </div>
    </div>

    <div class="flex flex-col w-full items-center my-16">
      <div class="flex flex-wrap w-1/2 bg-white">
        <div class="w-full text-xl py-2 px-2 chathub-chat-head">Prompt</div>
        <div v-for="chatPrompt, index in $store.state.chatPrompts" :key="index" class="flex justify-between h-50 w-1/2 items-center ">
          <div
            @click="$store.dispatch('handleClickChatPrompt', chatPrompt)"
            class="flex items-center justify-between w-full mx-4 border-gray border-2 my-2 chathub-chat-box">
            <div class="text-xl py-4 px-6 chathub-chat-text">{{ chatPrompt }}</div>
            <div class="w-10 h-10 mx-4"><img class="hidden" src="@/assets/arrow.png"/></div>
          </div>
        </div>
      </div>
    </div>
    <ChatBox></ChatBox>
  </div> 
</template>

<script>
import ChatBox from '@/components/ChatBox.vue'

export default {
  name: 'InitPage',
  components:{
    ChatBox
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

<style scoped>
.chathub-chat-box:hover img{
  display: block;
}
.chathub-chat-box:hover{
  border-color: #27279C;
  border-width: 2px;
  background-color: #EEEEFF;
}
</style>