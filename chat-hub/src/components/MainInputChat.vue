<template>
  <div class="pl-12 pb-4 text-xl chathub-chat-text">
    {{ question }}
  </div>
</template>

<script>
export default {
  name: 'MainInputChat',
  props:{
    question: String
  }
}
</script>

<style lang="scss" scoped>

</style>