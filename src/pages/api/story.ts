import { generate } from '../../ai.ts'
import type { FragmentType } from '../../types.ts'

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
    const errorMessage = error instanceof Error ? error.message : ''
    return new Response(
      JSON.stringify({
        message: `Something went wrong generating the story. ${errorMessage}`,
      }),
      {
        status: 500,
        headers: headers,
      },
    )
  }
}
