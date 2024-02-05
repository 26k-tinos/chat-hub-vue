<template>
  <div class="flex justify-between grow overflow-auto">
    <!-- Chat boc -->
    <div v-for="item, index in 2" :key="index" class="flex flex-col w-1/2 h-full">

      <!-- Model -->
      <MainModelSelector
        :isChecked="isChecked[index]"
        :selectedModel="selectedModels[index]"
        @update:checked="updateChecked(index, $event)"
        @update:selectedModel="updateSelectedModel(index, $event)"
      ></MainModelSelector>

      <!-- Chat -->
      <div class="overflow-auto">

        <!-- Chat GPT -->
        <div v-if="selectedModels[index] === 'chatgpt'">
          <div v-for="item, index in $store.state.chatWithGPT" :key="index" class="flex flex-col mt-10 mx-28 gap-4">
            <MainChatGPT :index="index"></MainChatGPT>
          </div>
        </div>

        <!-- Bard -->
        <div v-if="selectedModels[index] === 'bard'">
          <div v-for="item, index in $store.state.chatWithBard" :key="index" class="flex flex-col mt-10 mx-28 gap-4">
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
  data() {
    return {
      isChecked: [true, true],
      selectedModels: ['chatgpt', 'bard'],
    }
  },
  methods: {
    // 수정된 부분: isChecked 데이터 업데이트
    updateChecked(index, value) {
      this.isChecked[index] = value
    },
    // 수정된 부분: selectedModel 데이터 업데이트
    updateSelectedModel(index, value) {
      this.selectedModels[index] = value
    },
  },
  mounted () {
    
  },
}
</script>

<style scoped>

</style>