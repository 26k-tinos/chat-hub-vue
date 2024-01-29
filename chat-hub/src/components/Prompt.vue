<template>
  <div class="text-xl chathub-day">{{ date.date }}</div>
  <PromptDetail :prompts="date.prompts" ></PromptDetail>
</template>

<script>
import PromptDetail from "@/components/PromptDetail.vue"

  export default {
    name: 'Prompt',
    components:{
      PromptDetail
    },
    props: {
      date: String,
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