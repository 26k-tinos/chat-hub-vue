import { createStore } from 'vuex'

// Create a new store instance.
const store = createStore({
  state () {
    return {
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
    handleRequestChat(context) {
      console.log('[Action] handleRequestChat', context.state.page)
      // 서버로부터 데이터를 받는 로직...
      // axios.post('url', header, {
      //  text: context.state.chatBoxText
      // }).then((res) => )

      
      if (context.state.page == 0) {
        context.commit('setPage', 1)
      }
    }
  }
})

export default store