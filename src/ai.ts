import { createOpenAI } from '@ai-sdk/openai'
import { generateText, type CoreMessage } from 'ai'
import type { FragmentType } from './types.ts'
import { ai, reinforcePromptChoices } from './utils.ts'
import { ChoicesError } from './errors/ChoicesError.ts'
import { insert } from './server/choices-repository.ts'

const regex = /\[(.*?)\]/g

export async function generate(
  messages: CoreMessage[],
  uuid: string,
  apikey: string = '',
) {
  const groq = createOpenAI({
    baseURL: 'https://api.groq.com/openai/v1',
    apiKey: apikey ? apikey : import.meta.env.GROQ_API_KEY,
  })

  try {
    await storeUserChoices(messages, uuid)
  } catch (error: unknown) {
    // Ignore the error. Not useful for the user.
  }

  const limitTries: number = 5
  let isChoicesValid: boolean = false
  let currentTry: number = 0
  let text: string = ''

  while (!isChoicesValid && currentTry < limitTries) {
    const result = await generateText({
      model: groq(ai.model),
      messages: messages,
      temperature: ai.temperature,
      maxTokens: ai.maxTokens,
    })

    text = result.text
    isChoicesValid = validateChoices(text)
    if (!isChoicesValid) {
      messages.push({
        role: 'system',
        content: reinforcePromptChoices,
      })
    }
    currentTry++
  }

  if (!isChoicesValid) {
    throw new ChoicesError()
  }

  return createFragment(text)
}

function validateChoices(text: string): boolean {
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
    isError: false,
  }
}

async function storeUserChoices(messages: CoreMessage[], uuid: string) {
  await insert(uuid, messages[messages.length - 1].content.toString())
}
