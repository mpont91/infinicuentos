import { defineDb, defineTable, column, NOW } from 'astro:db'

// https://astro.build/db/config

const Choices = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    uuid: column.text(),
    value: column.text(),
    created: column.date({ default: NOW }),
  },
})

export default defineDb({
  tables: { Choices },
})
