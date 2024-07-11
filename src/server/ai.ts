import { createOpenAI } from '@ai-sdk/openai'
import { generateText } from 'ai'
import type { Message } from '../types.ts'

export async function generate(messages: Message[]) {
  const groq = createOpenAI({
    baseURL: 'https://api.groq.com/openai/v1',
    apiKey: import.meta.env.GROQ_API_KEY,
  })

  const { text } = await generateText({
    model: groq('llama3-8b-8192'),
    messages: messages,
  })

  return text
}
