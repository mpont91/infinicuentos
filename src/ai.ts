import { createOpenAI } from '@ai-sdk/openai'
import { generateText, type CoreMessage } from 'ai'

const groq = createOpenAI({
  baseURL: 'https://api.groq.com/openai/v1',
  apiKey: import.meta.env.GROQ_API_KEY,
})

export async function generate(messages: CoreMessage[]) {
  const { text } = await generateText({
    model: groq('llama3-8b-8192'),
    messages: messages,
  })

  return text
}
