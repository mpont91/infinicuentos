export interface FragmentType {
  message: string
  choices: string[]
}

export interface AIConfig {
  model: string
  temperature: number
  maxTokens: number
}
