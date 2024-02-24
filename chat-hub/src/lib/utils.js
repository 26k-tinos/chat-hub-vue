import axios from "axios"

const baseUrl = 'http://13.231.237.186:8080'

const HANDLE_MESSAGE = 'Cannot Load Conversation...'

const URL = {
  'log': {
    'list': `${baseUrl}/log`,
    'chat': (chatId, userName) => `${baseUrl}/log/${chatId}/user/${userName}`,
    'user': (userName) => `${baseUrl}/log/user/${userName}`,
  },
  'ask': {
    'gpt': (prompt='', q='', userName='', key='') => key == '' ? `${baseUrl}/ask/chatgpt?userName=${userName}&chatId=${prompt}&q=${q}` : `${baseUrl}/ask/chatgpt?userKey=${key}&userName=${userName}&chatId=${prompt}&q=${q}`,
    'bard': (prompt='', q='', userName='', key='') => key == '' ? `${baseUrl}/ask/bard?userName=${userName}&chatId=${prompt}&q=${q}` : `${baseUrl}/ask/bard?userKey=${key}&userName=${userName}&chatId=${prompt}&q=${q}`,
  },
}

const checkSucess = (response) => {
  if (response?.data == null || response?.data == undefined) {
    return false
  }
  return true
}

const ChatHubApi = async ({ 'type': type, 'prompt': prompt, 'text':text, 'userName': userName, 'key': key}) => {
  console.log('[ChatHubApi] type:', type, 'prompt:', prompt, 'text:', text, 'userName:', userName, 'key:', key)
  try {
    const url = type == 'gpt' ? URL.ask.gpt(prompt, text, userName, key) : URL.ask.bard(prompt, text, userName, key)
    console.log('[ChatHubApi] url:', url)
    // TODO
    // axios의 헤더 설정도 미리 해두기....
    const response = await axios.get(url)
    return {
      [`${type}Answer`]: response?.data ?? HANDLE_MESSAGE,
      [`${type}Sucess`]: checkSucess(response),
    }
    
  } catch (error) {
    // 개발자가 보기위한 에러 로그..
    // 에러가 떴을때, 서디파티에서 에러 로그를 관리함..
    console.error(error) 

    return {
      [`${type}Answer`]: HANDLE_MESSAGE,
      [`${type}Sucess`]: false
    }
  }
}

const ChatHubLog = async ({ 'type': type, 'userName': userName }) => {
  try {
    const url = type == 'list' ? URL.log.list : URL.log.user(userName)
    const response = await axios.get(encodeURI(url))
    return {
      [`${type}Log`]: response?.data.filter((item) => item != '') ?? HANDLE_MESSAGE,
      [`${type}Sucess`]: checkSucess(response),
    }
  } catch (error) {
    console.error(error)
    return {
      [`${type}Log`]: HANDLE_MESSAGE,
      [`${type}Sucess`]: false
    }
  }
}

const ChatHubLogPrompt = async ({ 'chatId': chatId, 'userName': userName }) => {
  try {
    const url = URL.log.chat(chatId, userName)
    const response = await axios.get(encodeURI(url))
    return {
      'chatLog': response?.data ?? HANDLE_MESSAGE,
      'chatSucess': checkSucess(response),
    }
  } catch (error) {
    console.error(error)
    return {
      'chatLog': HANDLE_MESSAGE,
      'chatSucess': false
    }
  }
}

export { ChatHubApi, ChatHubLog, ChatHubLogPrompt }