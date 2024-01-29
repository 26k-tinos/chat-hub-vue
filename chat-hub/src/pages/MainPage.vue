<template>
  <div class="flex justify-between grow overflow-auto">
    <!-- Chat boc 1 -->
    <div class="flex flex-col w-1/2 h-full">
      <div class="flex h-40 pl-20 pt-28 pb-4 items-center">
        <label class="text-2xl mr-8 chathub-chat-head">
          <input type="checkbox" checked class="bg-gray-100 w-6 h-6 mr-2"/>
          Model</label>
        <label class="text-3xl font-bold mr-6 chathub-chat-type">
          <select>
            <option value="chatgpt" checked>Chat GPT</option>
            <option value="bard">Bard</option>
          </select>
        </label>
      </div>

      <div class="overflow-auto">
        <div v-for="item, index in 2" :key="index" class="flex flex-col mt-10 mx-28 gap-4">
          <div class="flex gap-4 items-center">
            <div class="h-7 w-7"><img src="@/assets/user.png"/></div>
            <div class="flex flex-col gap-1">
              <div class="text-2xl text-black font-bold chathub-chat-head">user</div>
            </div>
          </div>

          <div class="pl-12 text-xl chathub-chat-text">
            As an AI developed by OpenAI, I am based on the GPT-4 architecture, which is a large language model (LLM). The strengths of this model include:
            Language Understanding and Generation: GPT-4 has the capability to understand and generate text in various languages. This is particularly useful when users ask questions or engage in conversations in different languages. For example, if you ask a question in Korean, I can respond in Korean.
            Programming Knowledge: I possess in-depth knowledge of programming languages like Python and JavaScript. This allows me to assist with writing code, debugging, designing algorithms, and more.
            Expertise in Specialized Fields: I offer a high level of knowledge in specific areas such as chemical molecular simulation. This can be useful in academic research, data analysis, and solving complex problems.
            Versatility: I am capable of performing various tasks such as text generation, summarization, translation, problem-solving, and providing educational materials.
            These strengths enable me to provide substantial support across a wide range of fields and to meet the diverse needs of users.
          </div>

          <div class="flex gap-4 items-center">
            <div class="h-7 w-7"><img src="@/assets/gpt.png"/></div>
            <div class="flex flex-col gap-1">
              <div class="text-2xl text-white font-bold chathub-chat-head">CHAT GPT</div>
            </div>
          </div>

          <div class="pl-12 text-xl chathub-chat-text">
            As an AI developed by OpenAI, I am based on the GPT-4 architecture, which is a large language model (LLM). The strengths of this model include:
            Language Understanding and Generation: GPT-4 has the capability to understand and generate text in various languages. This is particularly useful when users ask questions or engage in conversations in different languages. For example, if you ask a question in Korean, I can respond in Korean.
            Programming Knowledge: I possess in-depth knowledge of programming languages like Python and JavaScript. This allows me to assist with writing code, debugging, designing algorithms, and more.
            Expertise in Specialized Fields: I offer a high level of knowledge in specific areas such as chemical molecular simulation. This can be useful in academic research, data analysis, and solving complex problems.
            Versatility: I am capable of performing various tasks such as text generation, summarization, translation, problem-solving, and providing educational materials.
            These strengths enable me to provide substantial support across a wide range of fields and to meet the diverse needs of users.
          </div>
        </div>
      </div>
    </div>

    <!-- Chat boc 2 -->
    <div class="flex flex-col w-1/2 h-full">
      <div class="flex h-40 pl-20 pt-28 pb-4 items-center">
        <div class="bg-gray-100 w-6 h-6 mr-2"></div>
        <div class="text-2xl mr-8 chathub-chat-head">Model</div>
        <div class="text-3xl font-bold mr-6 chathub-chat-type">Bard</div>
        <div class="bg-gray-200 w-6 h-6"></div>
      </div>


      <div class="overflow-auto">
        <div v-for="item, index in 2" :key="index" class="flex flex-col mt-10 mx-28 gap-4">
          <div class="flex gap-4 items-center">
            <div class="h-7 w-7"><img src="@/assets/user.png"/></div>
            <div class="flex flex-col gap-1">
              <div class="text-2xl text-white font-bold chathub-chat-head">user</div>
            </div>
          </div>

          <div class="pl-12 text-xl chathub-chat-text">
            As an AI developed by OpenAI, I am based on the GPT-4 architecture, which is a large language model (LLM). The strengths of this model include:
            Language Understanding and Generation: GPT-4 has the capability to understand and generate text in various languages. This is particularly useful when users ask questions or engage in conversations in different languages. For example, if you ask a question in Korean, I can respond in Korean.
            Programming Knowledge: I possess in-depth knowledge of programming languages like Python and JavaScript. This allows me to assist with writing code, debugging, designing algorithms, and more.
            Expertise in Specialized Fields: I offer a high level of knowledge in specific areas such as chemical molecular simulation. This can be useful in academic research, data analysis, and solving complex problems.
            Versatility: I am capable of performing various tasks such as text generation, summarization, translation, problem-solving, and providing educational materials.
            These strengths enable me to provide substantial support across a wide range of fields and to meet the diverse needs of users.
          </div>

          <div class="flex gap-4 items-center">
            <div class="h-7 w-7"><img src="@/assets/bard.png"/></div>
            <div class="flex flex-col gap-1">
              <div class="text-2xl text-white font-bold chathub-chat-head">Bard</div>
            </div>
          </div>

          <div class="pl-12 text-xl chathub-chat-text">
            As an AI developed by OpenAI, I am based on the GPT-4 architecture, which is a large language model (LLM). The strengths of this model include:
            Language Understanding and Generation: GPT-4 has the capability to understand and generate text in various languages. This is particularly useful when users ask questions or engage in conversations in different languages. For example, if you ask a question in Korean, I can respond in Korean.
            Programming Knowledge: I possess in-depth knowledge of programming languages like Python and JavaScript. This allows me to assist with writing code, debugging, designing algorithms, and more.
            Expertise in Specialized Fields: I offer a high level of knowledge in specific areas such as chemical molecular simulation. This can be useful in academic research, data analysis, and solving complex problems.
            Versatility: I am capable of performing various tasks such as text generation, summarization, translation, problem-solving, and providing educational materials.
            These strengths enable me to provide substantial support across a wide range of fields and to meet the diverse needs of users.
          </div>
        </div>
      </div>
    </div>
  </div>
  <ChatBox></ChatBox>
</template>

<script>
import ChatBox from '@/components/ChatBox.vue'

export default {
  name: 'MainPage',
  components:{
    ChatBox
  },
  data() {
    return {
      
    }
  },
  methods: {
    
  },
  mounted () {
    
  },
}
</script>

<style scoped>

</style>