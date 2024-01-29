<template>
  <div class="h-32 pb-32 w-full mt-4">
    <div class="flex justify-between mx-60 grow-1 bg-white items-center chathub-chat">
      <input :value="$store.state.chatBoxText" @input="$store.commit('setChatBoxText', $event.target.value)"  id="chat-box" type="text" class="text-3xl py-4 px-6 w-full" placeholder="Chat with AI Models..." />
      <div class="w-10 h-10 mx-4" @click="$store.dispatch('handleRequestChat')">
        <img class="hidden" src="@/assets/chat-send.png"/>
      </div>
    </div>
    {{ text }}
  </div>
</template>
  
  <script>
    export default {
      name: 'ChatBox',
      data() {
        return {
          text: ''
        }
      },
      methods: {  
  
      },
      mounted() {
  
      }
    }
  </script>
  
  <style scoped>
  #chat-box:focus {
    outline-width: 0px;
    color: black;
  }

  .chathub-chat{
    outline: 2px solid #9E9E9E;
  }
  .chathub-chat:focus-within{
    outline: 4px solid #27279C;
    color: #9E9E9E;
  }

  .chathub-chat:focus-within img{
    display: block;
  }
  
  .chathub-chat-type{
    color: #5F5F5F;
  }

  .chathub-chat-head{
    color: #575757;
  }

  .chathub-chat-text{
    color: #5F5F5F;
  }
  </style>