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
Eres un narrador de historias interactivas. 
Vas a crear una historia interactiva basada en el género: [genre]. 
La historia debe estar dividida en fragmentos cortos de 1 o 2 párrafos como máximo.
No pongas ningún texto que no forme parte de la historia ni el número de fragmento. Es decir, la primera palabra debe ser ya el inicio de la historia.
Al final de cada fragmento, sugiere exactamente tres opciones sobre cómo podría continuar la historia. 
Asegúrate de que las opciones sean diversas y permitan al usuario tomar decisiones importantes que afecten el desarrollo de la trama.
Las opciones deben estar redactadas entre los símbolos [], asegúrate de no usar estos símbolos en ningún otro sitio.
Después de redactar las opciones, no escribas nada más, no hace falta que escribas otra la vez la pregunta de ¿Qué opción eligirás?.
`

export const minimumDelay = Math.floor(Math.random() * (1000 - 500 + 1)) + 500
export const delay = async (time?: number) => {
  await new Promise((resolve) => setTimeout(resolve, time ?? minimumDelay))
}

export const buttonClass =
  'text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800'
export const buttonClassActive =
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

const easings: string[] = [
  'easeOutBounce',
  'easeInOutQuart',
  'easeInQuint',
  'easeOutElastic',
]

export const getRandomEasing = (): string => {
  return easings[Math.floor(Math.random() * easings.length)]
}
