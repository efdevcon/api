import { PrismaClient } from '@prisma/client'

console.log('Seed db..')

const client = new PrismaClient()

async function main() {
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
}

main()
  .then(async () => {
    await client.$disconnect()
    console.log('Seed completed!')
  })
  .catch(async (e) => {
    console.error(e)
    await client.$disconnect()
    process.exit(1)
  })
