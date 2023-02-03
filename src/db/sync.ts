import { PrismaClient } from '@prisma/client'
import { Database } from 'sqlite3'
import { API_INFO, SERVER_CONFIG } from 'utils/config'

console.log('Sync db..')

const db = new Database('./src/db/devcon.db', async (err) => {
  if (err) {
    console.error(err.message)
  }

  console.log('Connected to the API database.')

  console.log('Create test data..')
  const client = new PrismaClient()
  await client.user.create({
    data: {
      email: 'test@email.com',
      name: 'Test user',
      posts: {
        create: [
          { title: 'Test post 1', published: true },
          { title: 'Test post 2', published: false },
        ],
      },
    },
  })

  console.log('All done!')
})
