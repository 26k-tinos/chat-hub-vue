<template>
  <!-- top logg -->
  <div class="min-h-28">
    <SideBarTop @click="handleNewChat()"></SideBarTop>
  </div>

  <button class="px-4 py-4 border-2 border-indigo-600 mx-4 my-4" 
    @click="handleNewChat()"
  >
    new Chat
  </button>
  
  <!-- prompt -->
  <div class="h-full overflow-auto">
    <!-- component1.. -->
    <div class="side-prompt flex flex-col px-4 gap-2 py-4">
      <Prompt 
        v-for="date, index in $store.state.forSideBar" :key="index"
        :date="date"
      ></Prompt>
    </div>
  </div>

  <!-- bottom -->
  <div class="flex justify-between items-end min-h-16 pb-4 px-4">
    <SideBarBottom></SideBarBottom>
  </div>
</template>
    
<script>
import Prompt from "@/components/Prompt.vue"
import SideBarBottom from "@/components/SideBarBottom.vue"
import SideBarTop from "@/components/SideBarTop.vue"

export default {
    name: 'SideBar',
    components:{
      Prompt,
      SideBarBottom,
      SideBarTop
    },
    data() {
      return {

      }
    },
    methods: {  
      handleNewChat(){
        this.$store.commit('setUserPrompt', '')
        this.$store.commit('initChat')
        this.$store.commit('setPage', 0)  
      }
    },
    mounted() {

    }
  }
</script>

<style scoped>
</style>