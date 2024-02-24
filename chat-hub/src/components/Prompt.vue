<template>
  <div class="text-xl chathub-day">{{ date.date }}</div>
  <PromptDetail 
    :prompts="date.prompts"
    :chats="date.chats"  
  ></PromptDetail>
</template>

<script>
import PromptDetail from "@/components/PromptDetail.vue"

  export default {
    name: 'Prompt',
    components:{
      PromptDetail
    },
    props: {
      date: Object,
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