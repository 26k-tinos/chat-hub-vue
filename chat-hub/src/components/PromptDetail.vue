<template>
  <div v-for="item, index in prompts" :key="index" 
    class="flex justify-between items-center py-2 chathub-title font-bold"
    style="cursor:pointer;">
    <div class="text-2xl px-4">{{ item }}</div>
    <div class="w-8 h-10 mx-2"><img class="hidden" src="@/assets/go.png"/></div>
  </div>
</template>
  
<script>
  export default {
    name: 'PromptDetail',
    props: {
      prompts: Array
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

.chathub-title {
  color: #27279C;
}
.chathub-title:hover {
  background-color: #DCDCFF;
}

.chathub-title:hover img {
  display: block;
}
</style>