<template>
  <div class="flex flex-col w-full items-center my-16">
    <div class="flex flex-wrap w-1/2 bg-white">
      <div class="w-full text-xl py-2 px-2 chathub-chat-head">Prompt</div>

      <!-- Prompt Detail -->
      <InitPromptDetail v-for="chatPrompt in $store.state.chatPrompts" :key="chatPrompt" :chatPrompt="chatPrompt"></InitPromptDetail>
    </div>
  </div>
</template>

<script>
import InitPromptDetail from "@/components/InitPromptDetail.vue"

export default {
  name: 'InitPrompt',
  components:{
    InitPromptDetail
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

</style>