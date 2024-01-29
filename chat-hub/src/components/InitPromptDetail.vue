<template>
  <div class="flex justify-between h-50 w-1/2 items-center ">
    <div
      @click="$store.dispatch('handleClickChatPrompt', chatPrompt)"
      style="cursor:pointer;"
      class="flex items-center justify-between w-full mx-4 border-gray border-2 my-2 chathub-chat-box">
      <div class="text-xl py-4 px-6 chathub-chat-text">{{ chatPrompt }}</div>
      <div class="w-10 h-10 mx-4"><img class="hidden" src="@/assets/arrow.png"/></div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'InitPromptDetail',
    props: {
      chatPrompt: String,
    },
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