<template>
  <MainUserDetail></MainUserDetail>

  <MainInputChat></MainInputChat>

  <MainBardDetail></MainBardDetail>

  <MainOutputChat></MainOutputChat>
</template>

<script>
import MainBardDetail from './MainBardDetail.vue';
import MainInputChat from './MainInputChat.vue';
import MainOutputChat from './MainOutputChat.vue';
import MainUserDetail from './MainUserDetail.vue';

export default {
    name: 'MainBard',
    components: { MainUserDetail, MainBardDetail, MainInputChat, MainOutputChat }
}
</script>

<style lang="scss" scoped>

</style>