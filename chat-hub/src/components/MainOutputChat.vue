<template>
  <div class="pl-12 text-xl chathub-chat-text">
    {{ answer }} 
  </div>
</template>

<script>
export default {
  name: 'MainOutputChat',
  props: {
    answer: String
  }
}
</script>

<style lang="scss" scoped>

</style>