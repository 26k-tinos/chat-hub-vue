<template>
  <div class="flex items-center justify-center w-full h-screen" style="background-color: rgba(0,0,0, 0.5); z-index: 10; position: absolute; left: 0; top: 0;">
    <div class="flex flex-col w-3/5 h-8/12">
      <div class="flex items-center h-16 w-full mb-4 rounded-lg signed-top">
        <div class="text-2xl ml-4 text-white font-bold">Term of Service</div>
      </div>
      <div class="relative h-full pb-24 bg-white rounded-lg">
        <div v-for="item, index in 2" :key="index" class="flex flex-col px-8 py-6 bg-white rounded-lg">
          <SignedModel :index="index"></SignedModel>
        </div>

        <!-- Submit, Cancel -->
        <div class="absolute flex bg-white bottom-6 right-8">
          <SignedCancel></SignedCancel>
          <SignedSubmit></SignedSubmit>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { chatApi } from '@/lib/user.js'
import SignedCancel from  '@/components/SignedCancel.vue'
import SignedSubmit from  '@/components/SignedSubmit.vue'
import SignedModel from  '@/components/SignedModel.vue'

export default {
  name:'SignedPage',
  components:{
    SignedCancel,
    SignedSubmit,
    SignedModel
  },
  methods: {
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

  .button-submit:hover {
    border-color: #404095; 
    background-color: #404095;
  }

  .signed-top{
    background: #6666FF;
  }
  
  .chathub-chat:focus-within{
    outline: 2px solid #27279C;
    color: #9E9E9E;
  }

  .chathub-chat:focus-within img{
    display: block;
  }
  </style>