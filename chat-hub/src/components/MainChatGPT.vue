<template>
  <MainUserDetail></MainUserDetail>

  <MainInputChat></MainInputChat>

  <MainChatGPTDetail></MainChatGPTDetail>

  <MainOutputChat></MainOutputChat>
</template>

<script>
import MainChatGPTDetail from './MainChatGPTDetail.vue';
import MainInputChat from './MainInputChat.vue';
import MainUserDetail from './MainUserDetail.vue';
import MainOutputChat from './MainOutputChat.vue';



  export default {
    name: 'MainChatGPT',
    components: { MainUserDetail, MainChatGPTDetail, MainInputChat, MainOutputChat }
}
</script>

<style lang="scss" scoped>

</style>