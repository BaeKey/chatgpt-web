import type { ChatGPTAPI, ChatGPTUnofficialProxyAPI } from 'chatgpt'
import { initModel } from './gpt'

let api: ChatGPTAPI | ChatGPTUnofficialProxyAPI

const model = 'gpt-3.5-turbo'

export function getGPT3() {
  return api
}

(async () => {
  api = await initModel(model)
})()
