import { createOpenAI } from '@ai-sdk/openai'
import { generateText, type CoreMessage } from 'ai'
import type { FragmentType } from './types.ts'
import { ai, reinforcePromptChoices } from './utils.ts'

const groq = createOpenAI({
  baseURL: 'https://api.groq.com/openai/v1',
  apiKey: import.meta.env.GROQ_API_KEY,
})

const regex = /\[(.*?)\]/g

export async function generate(messages: CoreMessage[]) {
  const limitTries: number = 5
  let isValid: boolean = false
  let currentTry: number = 0
  let text: string = ''

  while (!isValid && currentTry < limitTries) {
    const result = await generateText({
      model: groq(ai.model),
      messages: messages,
      temperature: ai.temperature,
      maxTokens: ai.maxTokens,
    })

    text = result.text
    isValid = validateGeneratedText(text)
    if (!isValid) {
      messages.push({
        role: 'system',
        content: reinforcePromptChoices,
      })
    }
    currentTry++
  }

  if (isValid) {
    return createFragment(text)
  }

  throw new Error('IA is not working properly...')
}

function validateGeneratedText(text: string): boolean {
  return (text.match(regex) || []).length === 3
}

function createFragment(text: string): FragmentType {
  const choices: string[] = []
  let message: string = text
  let match
  while ((match = regex.exec(text)) !== null) {
    choices.push(match[1])
    message = message.replace(match[0], '')
  }

  return {
    message: message,
    choices: choices,
  }
}
