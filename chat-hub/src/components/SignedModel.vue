<template>
  <div v-if="index == 0">
    <div class="flex gap-4 mb-2 items-center">
      <div class="h-7 w-7"><img src="@/assets/gpt.png"/></div>
      <div class="flex flex-col gap-1">
        <div class="text-2xl text-black font-bold chat-head">Chat GPT 4</div>
      </div>
    </div>
    <div class="relative flex w-full h-44 bg-slate-200 signed-text">
      <SignedGptDetail></SignedGptDetail>
      <div class="absolute bg-white bottom-4 right-4 px-2" style="border: solid gray 1px; border-radius: 4s;">
        <label class="flex h-8 items-center text-l font-bold"
        style="cursor: pointer; color:#27279C;">
        Agree
          <input type="checkbox" class="bg-gray-100 w-5 h-5 ml-2"/>
        </label>
      </div>
    </div>
    <SignedInputKey class="w-full h-8" :index="index"></SignedInputKey>
  </div>
  <div v-else>
    <div class="flex gap-4 mb-2 items-center">
      <div class="h-7 w-7"><img src="@/assets/bard.png"/></div>
      <div class="flex flex-col gap-1">
        <div class="text-2xl text-black font-bold chat-head">BARD</div>
      </div>
    </div>
    <div class="relative flex w-full h-44 bg-slate-200 signed-text">
      <SignedBardDetail></SignedBardDetail>
      <div class="absolute bg-white bottom-4 right-4 px-2" style="border: solid gray 1px; border-radius: 4s;">
        <label class="flex h-8 items-center text-l font-bold"
          style="cursor: pointer; color:#27279C;">
          Agree
          <input type="checkbox" class="bg-gray-100 w-5 h-5 ml-2"/>
        </label>
      </div>
    </div>
    <SignedInputKey class="w-full h-8" :index="index"></SignedInputKey>
  </div>
</template>

<script>

import SignedGptDetail from './SignedGptDetail.vue'
import SignedBardDetail from './SignedBardDetail.vue'
import SignedInputKey from './SignedInputKey.vue'

  export default {
    name:'SignedModel',
    components:{
      SignedGptDetail,
      SignedBardDetail,
      SignedInputKey
    },
    props: {
      index: Number
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
  .chat-head{
    color: #5F5F5F;
  }

  .chathub-chat{
    outline: 2px solid #9E9E9E;
  }

  .signed-text{
    outline: 1px solid black;
    background: #F8F8F8;
  }
</style>