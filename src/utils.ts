export const genres: string[] = [
  'Aventura',
  'Fantasía',
  'Ciencia ficción',
  'Misterio',
  'Terror',
  'Histórico',
  'Romántico',
  'Suspense',
  'Comedia',
]

export const prompt: string = `
You are a creative narrator who invents interactive stories. 
The story must be coherent, creative, and exciting. 
The story should be written in Spanish. 
Each segment of the story should be short, no longer than one paragraph. 

Do not write any text that is not part of the story. 
The first word of your response should be the beginning of the story.

At the end of each story segment, you must provide exactly three continuation options, each encapsulated in brackets, following this format: 
[Option 1][Option 2][Option 3]. The options should be clearly differentiated and related to the story. 
Do not include any text outside the brackets after the options. 
Make sure the options are well-formatted and clearly visible. 
Ensure you do not use brackets anywhere else in the text.

The user will provide their choice to continue the story, and you must continue the narrative based on the user's selection, offering three new continuation options. 
The user can introduce a customized choice that might not be related to the provided options. 
In this case, you must be creative and attempt to continue the story based on the user's customized choice. 
If it is absolutely impossible to continue the story with the customized choice, explain that you couldn't continue the story with that choice and provide three new options.

You will follow this process perpetually.

Your first response will be the beginning of the interactive story based on the literary genre or text following: [genre]."
`

export const reinforcePromptChoices: string = `
The previous response does not include the continuation options formatted correctly. 
Please repeat the response and provide exactly 3 continuation options at the end of the paragraph. 
Ensure each option is encapsulated in brackets, following this format: [Option 1][Option 2][Option 3]. 
The options should be clearly differentiated and related to the story. 
Do not include any text outside the brackets after the options. 
Repeat the previous response including the correct options. 
Remember that the entire story and options must be written in Spanish.
`

export const aiTemperature: number = 1.3
export const aiMaxTokens: number = 2000
export const aiGroqModel: string = 'llama3-70b-8192'
export const aiOpenaiModel: string = 'gpt-4o'
export const aiOpenaiBaseURL: string = 'https://api.openai.com/v1'
export const aiGroqBaseURL: string = 'https://api.groq.com/openai/v1'

export const throttle: number = 3000

export const delay = async (time?: number) => {
  const minimumDelay = 500
  await new Promise((resolve) => setTimeout(resolve, time ?? minimumDelay))
}

export const buttonClass: string =
  'text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800'
export const buttonClassActive: string =
  'text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'

export const scrollToBottom = () => {
  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: 'smooth',
  })
}

export const calculateDistanceBetweenElements = (
  selector1: string,
  selector2: string,
) => {
  const x1: number =
    document?.querySelector(selector1)?.getBoundingClientRect().x ?? 0
  const x2: number =
    document?.querySelector(selector2)?.getBoundingClientRect().x ?? 0

  return x2 - x1
}

export const choicesError: string[] = ['Volver a intentar']
