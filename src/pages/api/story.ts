import { generate } from '../../ai.ts'
import type { FragmentType } from '../../types.ts'
import { ChoicesError } from '../../errors/ChoicesError.ts'
import { MaxRetriesError } from '../../errors/MaxRetriesError.ts'
import { choicesError } from '../../utils.ts'
import { DefaultError } from '../../errors/DefaultError.ts'

const headers = {
  'Content-Type': 'application/json',
}

export async function POST({ request }: { request: Request }) {
  try {
    const params = await request.json()
    const generation: FragmentType = await generate(
      params.messages,
      params.uuid,
    )
    const result: string = JSON.stringify(generation)

    return new Response(result, {
      status: 200,
      headers: headers,
    })
  } catch (error: unknown) {
    const fragmentError: FragmentType = createFragmentError(error)
    return new Response(JSON.stringify(fragmentError), {
      status: 500,
      headers: headers,
    })
  }
}

function createFragmentError(error: unknown) {
  const defaultError = new DefaultError()
  let message: string = defaultError.message

  if (error instanceof ChoicesError) {
    message = error.message
  }

  if (error instanceof Error && 'reason' in error) {
    const errorWithReason = error as { reason: string }
    if (errorWithReason.reason === 'maxRetriesExceeded') {
      const maxRetriesError = new MaxRetriesError()
      message = maxRetriesError.message
    }
  }

  return {
    message: message,
    choices: choicesError,
    isError: true,
  } as FragmentType
}
