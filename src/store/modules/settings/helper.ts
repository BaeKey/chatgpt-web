import { ss } from '@/utils/storage'

const LOCAL_NAME = 'settingsStorage'

export interface SettingsState {
  systemMessage: string
  temperature: number
  top_p: number
  model: string
}

export function defaultSetting(): SettingsState {
  return {
    systemMessage: 'You are Jarvis,an advanced artificial intelligence.Follow the user\'s instructions carefully. Respond using markdown.',
    temperature: 0.8,
    top_p: 1,
    model: 'gpt-3.5-turbo',
  }
}

export function getLocalState(): SettingsState {
  const localSetting: SettingsState | undefined = ss.get(LOCAL_NAME)
  return { ...defaultSetting(), ...localSetting }
}

export function setLocalState(setting: SettingsState): void {
  ss.set(LOCAL_NAME, setting)
}

export function removeLocalState() {
  ss.remove(LOCAL_NAME)
}
