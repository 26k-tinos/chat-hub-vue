<template>
  <MainUserDetail></MainUserDetail>

  <MainInputChat :question="$store.state.chatWithBard[index].question"></MainInputChat>

  <MainBardDetail></MainBardDetail>

  <MainOutputChat :answer="$store.state.chatWithBard[index].answer"></MainOutputChat>
</template>

<script>
import MainBardDetail from './MainBardDetail.vue';
import MainInputChat from './MainInputChat.vue';
import MainOutputChat from './MainOutputChat.vue';
import MainUserDetail from './MainUserDetail.vue';

export default {
    name: 'MainBard',
    components: { MainUserDetail, MainBardDetail, MainInputChat, MainOutputChat },
    props: {
      index: Number,
    }
}
</script>

<style lang="scss" scoped>

</style>