<template>
  <!-- top logg -->
  <div class="bg-slate-50 min-h-32 custom-background">
    <div
      @click="$store.commit('setPage', 0)"
      class="flex mt-8 mx-4 gap-4 items-center">
      <div class="h-16 w-16"><img src="@/assets/chathub.png"/></div>
      <div class="flex flex-col gap-1">
        <div class="text-2xl chathub-main">CHAT HUB</div>
        <div class="chathub-sub">Try Everything!</div>
      </div>
    </div>
  </div>

  <!-- prompt -->
  <div class="h-full overflow-auto custom-background">
    <!-- component1.. -->
    <div class="side-prompt flex flex-col px-4 gap-2 py-4">
      <Prompt 
        v-for="date in $store.state.dates" :key="date"
        :date="date"
      ></Prompt>
    </div>
  </div>

  <!-- bottom -->
  <div class="flex justify-between items-end min-h-16 pb-4 px-4 custom-background">
    <SideBarBottom></SideBarBottom>
  </div>
</template>
    
<script>
import Prompt from "@/components/Prompt.vue"
import SideBarBottom from "@/components/SideBarBottom.vue"

export default {
    name: 'SideBar',
    components:{
      Prompt,
      SideBarBottom
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