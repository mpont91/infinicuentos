import { createOpenAI } from '@ai-sdk/openai'
import { generateText } from 'ai'

export async function generate() {
  const groq = createOpenAI({
    baseURL: 'https://api.groq.com/openai/v1',
    apiKey: import.meta.env.GROQ_API_KEY,
  })

  const { text } = await generateText({
    model: groq('llama3-8b-8192'),
    prompt: 'Tell me something, but only 5 words.',
  })

  return text
}
