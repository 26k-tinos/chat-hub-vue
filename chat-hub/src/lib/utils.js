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
    'gpt': (prompt='', q='', userName='unknown', key='') => key == '' ? `${baseUrl}/ask/chatgpt?q=${q}` : `${baseUrl}/ask/chatgpt?q=${q}&userKey=${key}&userName=${userName}`,
    'bard': (prompt='', q='', userName='unknown', key='') => key == '' ? `${baseUrl}/ask/bard?q=${q}` : `${baseUrl}/ask/bard?q=${q}&userKey=${key}&userName=${userName}`,
  },
}

const checkSucess = (response) => {
  if (response?.data == null || response?.data == undefined) {
    return false
  }
  return true
}

const ChatHubApi = async ({ 'type': type, 'prompt': prompt, 'text':text, 'userName': userName, 'key': key}) => {
  try {
    const url = type == 'gpt' ? URL.ask.gpt(prompt, text, userName, key) : URL.ask.bard(prompt, text, userName, key)
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
    const response = await axios.get(url)
    return {
      [`${type}Log`]: response?.data ?? HANDLE_MESSAGE,
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

export { ChatHubApi, ChatHubLog }