import { createStore } from 'vuex'
import { ChatHubApi, ChatHubLog } from './lib/utils.js'
import { increaseChatTrials, getChatTrials, chatApi } from './lib/user.js'
// Create a new store instance.
const store = createStore({
  state () {
    return {
      userUUID: '',

      userGptApiKey: '',
      userBardApiKey: '',

      isLoading: false,

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
      modelOpen: false,

      modelStatus: '',

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
    setSaveKeyInCookie(state) {
      console.log('[Mutation] setSaveKeyInCookie')
      chatApi.setGPTApiKey(state.userGptApiKey)
      chatApi.setBardApiKey(state.userBardApiKey)
    },

    // 동기적인 작업을 수행 -> state를 변경하는 작업.
    // state를 변경하는 로직은 mutation에 작성.
    setUserBardApiKey(state, userBardApiKey) {
      state.userBardApiKey = userBardApiKey
    },

    setUserGptApiKey(state, userGptApiKey) {
      state.userGptApiKey = userGptApiKey
    },

    setUserApiKey(state, userApiKey) {
      state.userApiKey = userApiKey
    },

    setUserUUID(state, userUUID) {
      state.userUUID = userUUID
    },

    setModelStatus(state, status) {
      state.modelStatus = status
    },

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
    },
    startLoading(state) {
      state.isLoading = true
    },
    endLoading(state) {
      state.isLoading = false
    },

    modelOpen(state) {
      state.modelOpen = true
    },
    modelClose(state) {
      state.modelOpen = false
    },

  },
  actions: {
    handleClickChatPrompt(context, text) {
      console.log('[Action] handleClickChatPrompt', text)
      context.commit('setChatBoxText', text)
      context.dispatch('handleRequestChat')
    },

    async handleChatList(context) {
      const response = await axios.get(URL.log.list)
      const chatList = response.data
      console.log('[Action] Chat List: ', chatList)

      return chatList
    },

    async handleChatLog(context) {
      const logInput = { 'type': 'user', 'userName': context.state.userUUID }
      const { userLog, userSucess } = await ChatHubLog(logInput)
      console.log('[Action] Chat Log: ', userLog, userSucess)

      if (userLog.length == 0) {
        // 새로운.. 유저..
      } else {
        // 기존 유저...
        const sortedLogs = userLog.sort((a, b) => new Date(a.createAt) - new Date(b.createAt))
        console.log(sortedLogs)

        // 날짜들을 각각 알 수 있짢아요? 
        const checkToday = (log) => new Date().toDateString() == new Date(log.createAt).toDateString()
        const setDate = (log) => checkToday() ? 'Today' : new Date(log.createAt).toDateString() // Dec 11
        const dateArrays = new Array(new Set(sortedLogs.map((log) => new Date(log.createAt).toDateString())))
        const result = []

        dateArrays.forEach((date) => {
          const test = []
          userLog.forEach((log) => {
            const logDate = new Date(log.createAt).toDateString()
            if (date == logDate) {
              test.push(log)
            }
          })
          result.push({
            'date': `${setDate(sortedLogs[0])}`,
            'prompts': test
          })
        })

        // v-for item, key in result -> 
        // v-for prompt in prompts -> (uuidv4)-prompt.chatId

        console.log(result)

      }

      return userLog
    },


    // 비동기적인 작업을 수행 -> ajax를 받거나 등등...
    async handleRequestChat(context) {
      if (context.state.isLoading) {
        alert('Bard / GPT4 generates the answer. Please wait a moment...')
        return
      }
      context.commit('setUserGptApiKey', chatApi.getGPTApiKey())
      context.commit('setUserBardApiKey', chatApi.getBardApiKey())
      const trial = getChatTrials()
      console.log('[Action] handleRequestChat', trial)

      if (trial > 1 && context.state.userGptApiKey == '' && context.state.userBardApiKey == '') {
        // 모달 띠워줘야겠지??? -> 모달 띄우고나서 사용자가 sumit누르면, 모달 꺼지고
        // -> 다시 ChatHubApi 호출
        // TODO
        // Modal 띄워주는 로직...
        context.commit('modelOpen')
        return 
      }
      context.commit('startLoading')
      console.log('[Action] handleRequestChat', context.state.page)
      console.log('[Action] getChatTrials', trial)

      // 서버로부터 데이터를 받는 로직...
      const bardInput = {
        'type': 'bard',
        'prompt': 'testPrompt',
        'text': context.state.chatBoxText,
        'userName': context.state.userUUID,
        'key': trial < 2 ? '' : context.state.userGptApiKey
      }

      const gptInput = {
        'type': 'gpt',
        'prompt': 'testPrompt',
        'text': context.state.chatBoxText,
        'userName': context.state.userUUID,
        'key': trial < 2 ? '' : context.state.userBardApiKey
      }

      // 요청 보낼떄, 조건에 맞는 애들만... 요청 보내기... 콜?
      const { gptAnswer, gptSucess } = await ChatHubApi(gptInput)
      const { bardAnswer, bardSucess } = await ChatHubApi(bardInput)

      if (bardSucess && gptSucess) increaseChatTrials()
      
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
      context.commit('setChatBoxText', '')
      
      if (context.state.page == 0) {
        context.commit('setPage', 1)
      }
      context.commit('endLoading')
    },
  }
})

export default store