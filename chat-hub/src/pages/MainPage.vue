<template>
  <div class="flex justify-between grow overflow-auto">
    <!-- Chat box -->
    <div v-for="(item, index) in 2" :key="index" class="flex flex-col w-1/2 h-full">
      <!-- Model -->
      <MainModelSelector
        :isChecked="$store.state.isChecked[index]"
        :selectedModel="$store.state.selectedModels[index]"
        @update:checked="updateChecked(index, $event)"
        @update:selectedModel="updateSelectedModel(index, $event)"
      ></MainModelSelector>

      <!-- Chat -->
      <div class="overflow-auto">
        <!-- Chat GPT -->
        <div v-if="$store.state.selectedModels[index] === 'chatgpt'">
          <div v-for="(item, index) in $store.state.chatWithGPT" :key="index" class="flex flex-col mt-10 mx-28 gap-4">
            <MainChatGPT :index="index"></MainChatGPT>
          </div>
        </div>

        <!-- Bard -->
        <div v-if="$store.state.selectedModels[index] === 'bard'">
          <div v-for="(item, index) in $store.state.chatWithBard" :key="index" class="flex flex-col mt-10 mx-28 gap-4">
            <MainBard :index="index"></MainBard>
          </div>
        </div>
      </div>
    </div>
  </div>
  <ChatBox></ChatBox>
</template>

<script>
import ChatBox from '@/components/ChatBox.vue'
import MainChatGPT from '@/components/MainChatGPT.vue';
import MainBard from '@/components/MainBard.vue';
import MainModelSelector from '@/components/MainModelSelector.vue';

export default {
  name: 'MainPage',
  components:{
    ChatBox,
    MainChatGPT,
    MainBard,
    MainModelSelector
  },
  methods: {
    updateChecked(index, value) {
      this.$store.commit('setChecked', { index, value });
    },
    updateSelectedModel(index, value) {
      this.$store.commit('setSelectedModel', { index, model: value });
    },
  },
  mounted () {
    
  },
}
</script>

<style scoped>

</style>