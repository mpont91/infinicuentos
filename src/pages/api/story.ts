import { generate } from '../../server/ai.ts'

export async function POST({ request }: { request: Request }) {
  try {
    const params = await request.json()
    const generation = await generate(params.messages)
    const result = JSON.stringify({
      message: generation,
    })

    return new Response(result, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: `Something went wrong generating the story. ${error.message}`,
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
  }
}
