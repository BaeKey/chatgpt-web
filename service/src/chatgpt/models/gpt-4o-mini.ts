import type { ChatGPTAPI, ChatGPTUnofficialProxyAPI } from 'chatgpt'
import { initModel } from './gpt'

let api: ChatGPTAPI | ChatGPTUnofficialProxyAPI

const model = 'gpt-4o-mini'

export function getGPT4omini() {
  return api
}

(async () => {
  api = await initModel(model)
})()
