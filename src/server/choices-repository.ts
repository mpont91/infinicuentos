import { db, Choices } from 'astro:db'

export async function insert(uuid: string, value: string) {
  try {
    await db.insert(Choices).values({
      uuid: uuid,
      value: value,
    })
  } catch (error) {
    throw new Error('Something went wrong while inserting the choice.')
  }
}
