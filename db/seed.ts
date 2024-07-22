import { db, Choices } from 'astro:db'
import { v4 as uuidv4 } from 'uuid'

// https://astro.build/db/seed
export default async function seed() {
  const uuid = uuidv4()
  await db.insert(Choices).values([
    { id: 1, uuid: uuid, value: 'Comedia' },
    { id: 2, uuid: uuid, value: 'Test select choice' },
  ])
}
