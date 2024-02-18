<template>
  <div class="flex items-center justify-center w-full h-screen" style="background-color: rgba(0,0,0, 0.5); z-index: 10; position: absolute; left: 0; top: 0;">
    <div class="flex flex-col w-3/5 h-8/12">
      <div class="flex items-center h-16 w-full mb-4 rounded-lg signed-top">
        <div class="text-2xl ml-4 text-white font-bold">Term of Service</div>
      </div>
      <div class="relative h-full pb-24 bg-white rounded-lg">
        <div v-for="item, index in 2" :key="index" class="flex flex-col px-8 py-6 bg-white rounded-lg">
          <div class="flex gap-4 mb-2 items-center">
            <div class="h-7 w-7"><img src="@/assets/gpt.png"/></div>
            <div class="flex flex-col gap-1">
              <div class="text-2xl text-black font-bold chat-head">Chat GPT 4</div>
            </div>
          </div>
          <div class="relative flex w-full h-44 bg-slate-200 signed-text">
            <div class="overflow-auto p-6">
              11111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
              111111111111111111111111111111111111111111111111111111111111111111111111
              1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
              111111111111111111111111111111111111111111111111111111111111111111111111
              11111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
              111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
              111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
              111111111111111111111111111111111111111111111111111111111111111111111111
            </div>
            <div class="absolute bg-white bottom-4 right-4 px-2" style="border: solid gray 1px; border-radius: 4s;">
              <label class="flex h-8 items-center text-l font-bold chathub-chat-head"
                style="cursor: pointer; color:#27279C;">
                Agree
                <input type="checkbox" class="bg-gray-100 w-5 h-5 ml-2"/>
              </label>
            </div>
          </div>
          <div class="w-full h-8">
            <div class="flex justify-between mt-4 grow-1 bg-white items-center chathub-chat">
              <input :value="setInputValue(index)" @input="handleAPIKeyInput($event, index)" id="chat-box" type="text" class="text-l py-1 px-4 w-full" placeholder="Input API Key" />
              <div class="w-4 h-4 mx-4">
                <img class="hidden" src="@/assets/chat-send.png" style="cursor:pointer;"/>
              </div>
            </div>
          </div>
        </div>
        <div class="absolute flex bg-white bottom-6 right-8">
          <div 
            class="flex items-center justify-center h-12 w-28 text-2xl rounded-lg button-cancel"
            style="cursor: pointer"
            
            @click="$store.commit('modelClose')">
            Cancel
          </div>
          <div 
            class="flex items-center justify-center h-12 w-28 ml-6 text-2xl text-white rounded-lg button-submit"
            style="cursor: pointer;"
            @click="handleSubmitClick()"
            >
            Submit
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { chatApi } from '@/lib/user.js'

export default {
  name:'SignedPage',
  methods: {
    setInputValue(type) {
      if (type == 0) return this.$store.state.userGptApiKey
      else if (type == 1) return this.$store.state.userBardApiKey
      else throw new Error('Invalid type')
    },

    handleSubmitClick() {
      // 1. -> 데이터가 잘 저장돼었는지 확인....
      if (this.$store.state.userGptApiKey == '' || this.$store.state.userBardApiKey == '') {
        alert('API Key를 입력해주세요.')
        return
      }

      // 2. -> 잘 저장되었다면, 그 데이터를 쿠키에 저장..
      this.$store.commit('setSaveKeyInCookie')

      // 3. -> 모달 닫기...
      this.$store.commit('modelClose')
    },

    handleAPIKeyInput(e, type) {
      if (type == 0 ) this.$store.commit('setUserGptApiKey', e.target.value)
      else if (type == 1) this.$store.commit('setUserBardApiKey', e.target.value)
      else throw new Error('Invalid type');
    },  
  }, 
  mounted() {
    this.$store.commit('setUserBardApiKey', chatApi.getBardApiKey())
    this.$store.commit('setUserGptApiKey', chatApi.getGPTApiKey())
  },
}
</script>


  <style scoped>
  #chat-box:focus {
    outline-width: 0px;
    color: black;
  }
  
  .button-cancel:hover {
    border-color: #6666FF;
    border-width: 1px;
    background-color: #6666FF;
    color: white;
  }
  .button-cancel {
    border-color: #6666FF;
    border-width: 1px;
    color: #6666FF;
  }
  .button-submit {
    border-width: 1px; 
    border-color: #6666FF; 
    background-color: #6666FF;
    color: white;
  }

  .button-submit:hover {
    border-color: #404095; 
    background-color: #404095;
  }

  .signed-top{
    background: #6666FF;
  }
  .signed-text{
    outline: 1px solid black;
    background: #F8F8F8;
  }

  .chathub-chat{
    outline: 2px solid #9E9E9E;
  }
  .chathub-chat:focus-within{
    outline: 2px solid #27279C;
    color: #9E9E9E;
  }

  .chathub-chat:focus-within img{
    display: block;
  }
  
  .chathub-chat-type{
    color: #5F5F5F;
  }

  .chat-head{
    color: #5F5F5F;
  }

  .chathub-chat-text{
    color: #5F5F5F;
  }
  </style>