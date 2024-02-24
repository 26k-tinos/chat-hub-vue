import { createStore } from 'vuex'
import { ChatHubApi, ChatHubLog, ChatHubLogPrompt } from './lib/utils.js'
import { increaseChatTrials, getChatTrials, chatApi } from './lib/user.js'
import { v4 as uuidv4 } from 'uuid';
// Create a new store instance.
const store = createStore({
  state () {
    return {
      userUUID: '',

      userGptApiKey: '',
      userBardApiKey: '',

      isLoading: false,
      isChecked: [true, true],

      userPrompt: '',

      allPrompts: [],
      forSideBar: [],
      currentSelectByPrompt: [],

      selectedModels: ['chatgpt', 'bard'],

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
    setAllPrompts(state, allPrompts) {
      state.allPrompts = allPrompts
    },
    setUserPrompt(state, userPrompt) {
      const filteredPrompt = String(userPrompt).replace(/[^\p{L}\p{N}]/gu, '')
      console.log('[Mutation] setUserPrompt', filteredPrompt)
      state.userPrompt = filteredPrompt
    },

    setSaveKeyInCookie(state) {
      console.log('[Mutation] setSaveKeyInCookie')
      chatApi.setGPTApiKey(state.userGptApiKey)
      chatApi.setBardApiKey(state.userBardApiKey)
    },

    setChecked(state, { index, value }) {
      state.isChecked[index] = value;
    },
    setSelectedModel(state, { index, model }) {
      state.selectedModels[index] = model;
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

    initChat(state) {
      state.chatWithBard = []
      state.chatWithGPT = []
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

    setForSideBar(state, forSideBar) {
      state.forSideBar = forSideBar
    },

    setCurrentSelectByPrompt(state, currentSelectByPrompt) {
      state.currentSelectByPrompt = currentSelectByPrompt
    }

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
        const promptInput = userLog.map((prompt) => {
          return {
            'chatId': prompt,
            'userName': context.state.userUUID,
          }
        }) 

        const chatLogFromPrompts = []

        const createAt = (log) => log?.createAt ?? false
        const checkToday = (log) => {
          console.log('[CheckToday] log: ', log, 'createdAt(log):', createAt(log))
          if (!createAt(log)) return false
          return new Date().toDateString() == new Date(log.createAt).toDateString()
        }
        for (const input of promptInput) {
          const { chatLog, chatSucess } = await ChatHubLogPrompt(input)

          const gpt = chatLog.filter((log) => log.aiName == "CHATGPT").sort((a, b) => new Date(a.createAt) - new Date(b.createAt))
          const bard = chatLog.filter((log) => log.aiName == "BARD").sort((a, b) => new Date(a.createAt) - new Date(b.createAt))

          console.log('[GPT]',gpt[0].createAt)

          const date = checkToday(gpt[0]) ? 'Today' : new Date(gpt[0].createAt).toDateString()
          const prompt = gpt[0].input

          chatLogFromPrompts.push({
            'prompt': prompt,
            'gpt': gpt,
            'bard': bard,
            'chatSucess': chatSucess,
            'date': date,
            'createAt': gpt[0].createAt
          })
        }
        context.commit('setAllPrompts', chatLogFromPrompts)
        
        const uniqueCratedAt = [...new Set(chatLogFromPrompts.map((log) => log.createAt))]

        const dateArray = []

        console.log('[UniqueCreatedAt]', uniqueCratedAt)

        chatLogFromPrompts.forEach((log) => {
          uniqueCratedAt.forEach((createAt) => {
            if (log.createAt == createAt) {
              dateArray.push(log.date)
            }
          })
        })

        console.log(dateArray)

        const dates = [...new Set(dateArray)]


        const forSideBar = dates.map((date) => {
          return {
            'date': date,
            'prompts': chatLogFromPrompts.filter((log) => log.date == date).map((log) => log.prompt),
            'chats': chatLogFromPrompts.filter((log) => log.date == date)
          }
        })
        context.commit('setForSideBar', forSideBar)

        console.log('[Action] forSideBar: ', forSideBar)
      }

      return userLog
    },


    // 비동기적인 작업을 수행 -> ajax를 받거나 등등...
    async handleRequestChat(context) {
      let flag = false
      if (context.state.isLoading) {
        alert('Bard / GPT4 generates the answer. Please wait a moment...')
        return
      }
      // 쿠키에서 정보 가져오는거죠,, -> 유저 정보가 왜 안들올까요?
      context.commit('setUserGptApiKey', chatApi.getGPTApiKey())
      context.commit('setUserBardApiKey', chatApi.getBardApiKey())
      context.commit('setUserUUID', chatApi.getUserUUID())
      
      // console.log('[Action] handleRqeustChat - userUUID', context.state.userUUID)

      const trial = getChatTrials()
      // console.log('[Action] handleRequestChat', trial)

      if (trial > 1 && context.state.userGptApiKey == '' && context.state.userBardApiKey == '') {
        // 모달 띠워줘야겠지??? -> 모달 띄우고나서 사용자가 sumit누르면, 모달 꺼지고
        // -> 다시 ChatHubApi 호출
        // TODO
        // Modal 띄워주는 로직...
        context.commit('modelOpen')
        return 
      }
      context.commit('startLoading')
      // console.log('[Action] handleRequestChat', context.state.page)
      // console.log('[Action] getChatTrials', trial)

      if (context.state.userPrompt == '') {
        flag = true
        context.commit('setUserPrompt', context.state.chatBoxText + uuidv4())
      }

      // 서버로부터 데이터를 받는 로직...
      const bardInput = {
        'type': 'bard',
        'prompt': context.state.userPrompt,
        'text': context.state.chatBoxText,
        'userName': context.state.userUUID,
        'key': trial < 2 ? '' : context.state.userGptApiKey
      }

      const gptInput = {
        'type': 'gpt',
        'prompt': context.state.userPrompt,
        'text': context.state.chatBoxText,
        'userName': context.state.userUUID,
        'key': trial < 2 ? '' : context.state.userBardApiKey
      }

      // 요청 보낼떄, 조건에 맞는 애들만... 요청 보내기... 콜?

      // 체크박스 상태에 따라 해당 모델의 인덱스 매핑
      const gptIndex = context.state.selectedModels.indexOf('chatgpt');
      const bardIndex = context.state.selectedModels.indexOf('bard');

      // 인덱스가 올바르게 설정되었는지 확인
      const gptChecked = context.state.isChecked?.[gptIndex] ?? false
      if (gptChecked) {
        const { gptAnswer, gptSucess } = await ChatHubApi(gptInput)
        if (gptSucess) {
          const gpt = {
            question: context.state.chatBoxText,
            answer: gptAnswer
          }
          context.commit('addChatWithGPT', gpt)
        }
      }

      const bardChecked = context.state.isChecked?.[bardIndex] ?? false
      if (bardChecked) {
        const { bardAnswer, bardSucess } = await ChatHubApi(bardInput)
        if (bardSucess) {
          const bard = {
            question: context.state.chatBoxText,
            answer: bardAnswer
          }
          context.commit('addChatWithBard', bard)
        }
      }

      // 두 조건 모두를 만족할 때 increaseChatTrials() 메서드 호출
      if (gptIndex !== -1 || bardIndex !== -1) increaseChatTrials()
      context.commit('setChatBoxText', '')

      if (context.state.page == 0) context.commit('setPage', 1)
      await context.dispatch('handleChatLog')
      context.commit('endLoading')
    },
  }
})

export default store