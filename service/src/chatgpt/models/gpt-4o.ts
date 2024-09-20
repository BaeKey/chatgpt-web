import type { ChatGPTAPI, ChatGPTUnofficialProxyAPI } from 'chatgpt'
import { initModel } from './gpt'

let api: ChatGPTAPI | ChatGPTUnofficialProxyAPI

const model = 'gpt-4o'

export function getGPT4o() {
  return api
}

(async () => {
  api = await initModel(model)
})()
