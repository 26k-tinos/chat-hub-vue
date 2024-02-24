<template>
  <div v-for="item, index in prompts" :key="index" 
    @click="handlePromptsClick(chats[index])"
    class="flex justify-between items-center py-2 chathub-title font-bold"
    style="cursor:pointer;">
    <div class="text-2xl px-4">{{ item }}</div>
    <div class="w-8 h-10 mx-2"><img class="hidden" src="@/assets/go.png"/></div>
  </div>
</template>
  
<script>
  export default {
    name: 'PromptDetail',
    props: {
      prompts: Array,
      chats: Array
    },
    data() {
      return {

      }
    },
    methods: {  
      async handlePromptsClick(chats) {
        console.log('handlePromptsClick', chats)
        await this.$store.dispatch('handleChatLog')
  
        // throw new Error('handlePromptsClick not implemented')
  
        this.$store.commit('initChat')
        const chatId = chats.gpt[0].chatId

        console.log('chatId', chatId)
        chats.gpt.forEach((gptChat) => {
          const chat = {
            'question': gptChat.input,
            'answer': gptChat.output
          }
          this.$store.commit('addChatWithGPT', chat)
        })
  
        chats.bard.forEach((bardChat) => {
          const chat = {
            'question': bardChat.input,
            'answer': bardChat.output
          }
          this.$store.commit('addChatWithBard', chat)
        })
        this.$store.commit('setUserPrompt', chatId)
        
        this.$store.commit('setPage', 1)
      }
    },
    mounted() {
      console.log('PromptDetail mounted', this.chats)
    }
  }
</script>

<style scoped>

.chathub-title {
  color: #27279C;
}
.chathub-title:hover {
  background-color: #DCDCFF;
}

.chathub-title:hover img {
  display: block;
}
</style>