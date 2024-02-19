<template>
  <div 
    class="flex items-center justify-center h-12 w-28 ml-6 text-2xl text-white rounded-lg button-submit"
    style="cursor: pointer;"
    @click="handleSubmitClick()"
    >
    Submit
  </div>
</template>

<script>
  export default{
    name:'SignedSubmit',
    data() {
      return {
      }
    },
    methods: {
      handleSubmitClick() {
        // 1. -> 데이터가 잘 저장돼었는지 확인....
        if (this.$store.state.userGptApiKey == '' || this.$store.state.userBardApiKey == '') {
          alert('API Key를 입력해주세요.')
          return
        }
  
        // 2. -> 잘 저장되었다면, 그 데이터를 쿠키에 저장..
        this.$store.commit('setSaveKeyInCookie')
  
        // 3. -> 모달 닫기...
        this.$store.commit('modelClose')
      },
    },
    mounted() {
    }
  }
</script>

<style scoped>
  .button-submit {
    border-width: 1px; 
    border-color: #6666FF; 
    background-color: #6666FF;
    color: white;
  }
</style>