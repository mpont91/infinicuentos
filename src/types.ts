export interface FragmentType {
  message: string
  choices: string[]
  isError: boolean
}

export interface AIConfig {
  model: string
  temperature: number
  maxTokens: number
}
