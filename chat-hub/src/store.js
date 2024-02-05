import { createStore } from 'vuex'
import axios from 'axios'
const baseUrl = 'http://13.231.237.186:8080'

const URL = {
  'log': {
    'list': '',
    'chat': '',
  },
  'ask': {
    'gpt': (q, key='') => key == '' ? `${baseUrl}/ask/chatgpt?q=${q}` : `${baseUrl}/ask/chatgpt?q=${q}?uerKey=${key}`,
    'bard': (q, key='') => key == '' ? `${baseUrl}/ask/bard?q=${q}` : `${baseUrl}/ask/bard?q=${q}?uerKey=${key}`,
  },
}
// Create a new store instance.
const store = createStore({
  state () {
    return {
      chatWithBard: [],
      chatWithGPT: [],

      chatBoxText: '',
      chatPrompts: [
        'What is your favorite color?',
        'What is your favorite food?',
        'What is your favorite animal?',
        'What is your favorite gender?',
      ],
      page: 0,
      dates: [{
        'date': 'Today',
        'prompts': [
          'What is your favorite color?',
          'What is your favorite food?',
          'What is your favorite animal?'
        ]
      },{
        'date': 'Dec 12',
        'prompts': [
          'What is your favorite color?',
          'What is your favorite food?',
          'What is your favorite animal?'
        ]
      },{
        'date': 'Dec 11',
        'prompts': [
          'What is your favorite color?',
          'What is your favorite food?',
          'What is your favorite animal?'
        ]
      }
    ]
    }
  },
  mutations: {
    // 동기적인 작업을 수행 -> state를 변경하는 작업.
    // state를 변경하는 로직은 mutation에 작성.
    addChatWithGPT(state, {question, answer}) {
      state.chatWithGPT.push({
        'question': question,
        'answer': answer
      })
      console.log('[Commit] addChatWithGpt', state.chatWithGPT)
    },
    addChatWithBard(state, {question, answer}) {
      state.chatWithBard.push({
        'question': question,
        'answer': answer
      })
      console.log('[Commit] addChatWithBard', state.chatWithBard)
    },
    setPage(state, page) {
      state.page = page
      if (state.page == 0) {
        state.chatBoxText = ''
      }
    },
    setChatBoxText(state, text) {
      console.log('[Mutation] setChatBoxText', text)
      state.chatBoxText = text
    }
  },
  actions: {
    handleClickChatPrompt(context, text) {
      console.log('[Action] handleClickChatPrompt', text)
      context.commit('setChatBoxText', text)
      context.dispatch('handleRequestChat')
    },

    // 비동기적인 작업을 수행 -> ajax를 받거나 등등...
    async handleRequestChat(context) {
      console.log('[Action] handleRequestChat', context.state.page)

      // 서버로부터 데이터를 받는 로직...
      const gptResponse = await axios.get(URL.ask.gpt(context.state.chatBoxText, ''))
      const gptAnswer = gptResponse.data

      console.log('[Action] GPT Answer: ', gptAnswer)

      const bardResponse = await axios.get(URL.ask.bard(context.state.chatBoxText, ''))
      const bardAnswer = bardResponse.data

      console.log('[Action] Bard Answer: ', bardAnswer)
      
      const gpt = {
        question: context.state.chatBoxText,
        answer: gptAnswer
      }

      const bard = {
        question: context.state.chatBoxText,
        answer: bardAnswer
      }

      context.commit('addChatWithGPT', gpt)
      context.commit('addChatWithBard', bard)
      
      if (context.state.page == 0) {
        context.commit('setPage', 1)
      }
    }
  }
})

export default store