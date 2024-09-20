import type { ChatGPTAPIOptions } from 'chatgpt'
import { ChatGPTAPI, ChatGPTUnofficialProxyAPI } from 'chatgpt'
import { setupProxy } from '../index'
import { isNotEmptyString } from '../../utils/is'
import type { ChatGPTUnofficialProxyAPIOptions } from '../../types'

let api: ChatGPTAPI | ChatGPTUnofficialProxyAPI

const disableDebug: boolean = process.env.OPENAI_API_DISABLE_DEBUG === 'true'

export async function initModel(model: string) {
  if (isNotEmptyString(process.env.OPENAI_API_KEY)) {
    const OPENAI_API_BASE_URL = process.env.OPENAI_API_BASE_URL

    const options: ChatGPTAPIOptions = {
      apiKey: process.env.OPENAI_API_KEY,
      completionParams: { model },
      debug: !disableDebug,
    }

    // increase max token limit if use gpt-4
    if (model.toLowerCase().includes('gpt-4')) {
      // if use 32k model
      if (model.toLowerCase().includes('32k')) {
        options.maxModelTokens = 32768
        options.maxResponseTokens = 8192
      }
      else if (/-4o-mini/.test(model.toLowerCase())) {
        options.maxModelTokens = 128000
        options.maxResponseTokens = 16384
      }
      // if use GPT-4 Turbo or GPT-4o
      else if (/-preview|-turbo|o/.test(model.toLowerCase())) {
        options.maxModelTokens = 128000
        options.maxResponseTokens = 4096
      }
      else {
        options.maxModelTokens = 8192
        options.maxResponseTokens = 2048
      }
    }
    else if (model.toLowerCase().includes('gpt-3.5')) {
      if (/16k|1106|0125/.test(model.toLowerCase())) {
        options.maxModelTokens = 16384
        options.maxResponseTokens = 4096
      }
    }

    if (isNotEmptyString(OPENAI_API_BASE_URL)) {
      // if find /v1 in OPENAI_API_BASE_URL then use it
      if (OPENAI_API_BASE_URL.includes('/v1'))
        options.apiBaseUrl = `${OPENAI_API_BASE_URL}`
      else
        options.apiBaseUrl = `${OPENAI_API_BASE_URL}/v1`
    }

    setupProxy(options)

    api = new ChatGPTAPI({ ...options })
  }
  else {
    const options: ChatGPTUnofficialProxyAPIOptions = {
      accessToken: process.env.OPENAI_ACCESS_TOKEN,
      apiReverseProxyUrl: isNotEmptyString(process.env.API_REVERSE_PROXY) ? process.env.API_REVERSE_PROXY : 'https://ai.fakeopen.com/api/conversation',
      model,
      debug: !disableDebug,
    }

    setupProxy(options)

    api = new ChatGPTUnofficialProxyAPI({ ...options })
  }

  return api
}
