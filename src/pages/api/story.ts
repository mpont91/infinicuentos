import { generate } from '../../ai.ts'
import type { FragmentType } from '../../types.ts'
import { ChoicesError } from '../../errors/ChoicesError.ts'

const headers = {
  'Content-Type': 'application/json',
}

export async function POST({ request }: { request: Request }) {
  try {
    const params = await request.json()
    const generation: FragmentType = await generate(params.messages)
    const result: string = JSON.stringify(generation)

    return new Response(result, {
      status: 200,
      headers: headers,
    })
  } catch (error: unknown) {
    let message: string = 'Algo inesperado ha ido mal al generar la historia...'

    if (error instanceof ChoicesError) {
      message = error.message
    }

    const fragmentError: FragmentType = {
      message: message,
      choices: ['Volver a intentar'],
      isError: true,
    }
    return new Response(JSON.stringify(fragmentError), {
      status: 500,
      headers: headers,
    })
  }
}
