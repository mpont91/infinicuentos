export interface FragmentType {
  message: string
  choices: string[]
  isError: boolean
}

export type Provider = 'openai' | 'groq'
