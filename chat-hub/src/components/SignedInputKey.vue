<template>
<div class="flex justify-between mt-4 grow-1 bg-white items-center chathub-chat">
  <input :value="setInputValue(index)" @input="handleAPIKeyInput($event, index)" id="chat-box" type="text" class="text-l py-1 px-4 w-full" placeholder="Input API Key" />
  <div class="w-4 h-4 mx-4">
    <img class="hidden" src="@/assets/chat-send.png" style="cursor:pointer;"/>
  </div>
</div>
</template>

<script>
  export default {
    name:'SignedInputKey',
    props: {
      index: Number
    },
    data() {
      return {
      }
    },
    methods: {
      setInputValue(index) {
        if (index == 0) {
          return this.$store.state.userGptApiKey
        } else {
          return this.$store.state.userBardApiKey
        }
      },
      handleAPIKeyInput(event, index) {
        if (index == 0) {
          this.$store.commit('setUserGptApiKey', event.target.value)
        } else {
          this.$store.commit('setUserBardApiKey', event.target.value)
        }
      }
    },
    mounted() {
    }
  }
</script>

<style scoped>
.chathub-chat{
    outline: 2px solid #9E9E9E;
  }
</style>