import { generate } from '../../server/ai.ts'

export async function GET() {
  try {
    const generation = await generate()
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
        message: 'Something went wrong while interacting with AI',
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
