import { v4 as uuidv4 } from 'uuid';
import Cookies from 'js-cookie';

const ensureUserInfo = () => {
  console.log('[EnsureUserInfo]')
   // 쿠키에서 UUID 가져오기 시도
  let userChatTrials = Cookies.get('userChatTrials')
  let userUUID = Cookies.get('userUUID')
  let userGPTApiKey = Cookies.get('userGPTApiKey')
  let userBardApiKey = Cookies.get('userBardApiKey')

  // 쿠키에 UUID가 없다면 새로 생성 후 저장
  if (!userUUID) {
    userUUID = uuidv4();
    Cookies.set('userUUID', userUUID, { expires: 365 }) // 365일 후 만료되는 쿠키 설정
  }

  if (!userGPTApiKey) {
    userGPTApiKey = ''
    Cookies.set('userGPTApiKey', userGPTApiKey, { expires: 365 }) // 365일 후 만료되는 쿠키 설정
  }
  
  if (!userBardApiKey) {
    userBardApiKey = ''
    Cookies.set('userBardApiKey', userBardApiKey, { expires: 365 }) // 365일 후 만료되는 쿠키 설정
  }

  // 채팅 시도 횟수 증가
  if (!userChatTrials) {
    userChatTrials = 0
    Cookies.set('userChatTrials', userChatTrials, { expires: 365 }) // 365일 후 만료되는 쿠키 설정
  }
  return { userUUID, userChatTrials }
}

const getGPTApiKey = () => {
  console.log('[GetGPTApiKey]')
  let userGPTApiKey = Cookies.get('userGPTApiKey')
  return userGPTApiKey
}

const getUserUUID = () => {
  console.log('[GetUserUUID]')
  let userUUID = Cookies.get('userUUID')
  return userUUID
}

const setGPTApiKey = (key) => {
  console.log('[SetGPTApiKey]', key)
  Cookies.set('userGPTApiKey', key, { expires: 365 }) // 365일 후 만료되는 쿠키 설정
}

const setBardApiKey = (key) => {
  console.log('[SetBardApiKey]', key)
  Cookies.set('userBardApiKey', key, { expires: 365 }) // 365일 후 만료되는 쿠키 설정 
}

const getBardApiKey = () => {
  console.log('[GetBardApiKey]')
  let userBardApiKey = Cookies.get('userBardApiKey')
  return userBardApiKey
}

const getChatTrials = () => {
  console.log('[GetChatTrials]')
  let userChatTrials = Cookies.get('userChatTrials')
  return userChatTrials
}

const increaseChatTrials = () => {
  console.log('[IncreaseChatTrials]')
  let userChatTrials = Cookies.get('userChatTrials')
  userChatTrials = parseInt(userChatTrials) + 1
  Cookies.set('userChatTrials', userChatTrials, { expires: 365 }) // 365일 후 만료되는 쿠키 설정
}

const initChatTrials = (value) => {
  console.log('[InitChatTrials]')
  Cookies.set('userChatTrials', value, { expires: 365 }) // 365일 후 만료되는 쿠키 설정
}

const chatApi = {
  'getGPTApiKey': getGPTApiKey,
  'setGPTApiKey': setGPTApiKey,
  'getBardApiKey': getBardApiKey,
  'setBardApiKey': setBardApiKey,
  'getUserUUID': getUserUUID,
}

export { ensureUserInfo, increaseChatTrials, initChatTrials, getChatTrials, chatApi }
