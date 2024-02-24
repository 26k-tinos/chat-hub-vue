<template>
  <div class="flex flex-col justify-between items-center w-full h-full">
    
    <!-- 메인화면 -->
    <InitMain></InitMain>

    <!-- Prompt -->
    <InitPrompt></InitPrompt>

    <!-- Chat Box -->
    <ChatBox></ChatBox>
  </div> 
</template>

<script>
import ChatBox from '@/components/ChatBox.vue'
import InitMain from '@/components/InitMain.vue';
import InitPrompt from '@/components/InitPrompt.vue';

export default {
  name: 'InitPage',
  components:{
    ChatBox,
    InitMain,
    InitPrompt
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