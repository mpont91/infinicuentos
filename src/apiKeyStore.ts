import { atom } from 'nanostores'
import type { Provider } from './types.ts'

export const apiKey: string = atom('')
export const provider: Provider = atom('openai')
