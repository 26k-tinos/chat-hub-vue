<template>
  <MainUserDetail></MainUserDetail>

  <MainInputChat :question="$store.state.chatWithGPT[index].question"></MainInputChat>

  <MainChatGPTDetail></MainChatGPTDetail>

  <MainOutputChat :answer="$store.state.chatWithGPT[index].answer"></MainOutputChat>
</template>

<script>
import MainChatGPTDetail from './MainChatGPTDetail.vue';
import MainInputChat from './MainInputChat.vue';
import MainUserDetail from './MainUserDetail.vue';
import MainOutputChat from './MainOutputChat.vue';



  export default {
    name: 'MainChatGPT',
    props: {
      index: Number
    },
    components: { MainUserDetail, MainChatGPTDetail, MainInputChat, MainOutputChat }
}
</script>

<style lang="scss" scoped>

</style>