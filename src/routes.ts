import { eventsRouter } from 'controllers/events'
import { Router } from 'express'

export const router = Router()

router.get('/', (req, res) => {
  res.send('Devcon API')
})

router.use(eventsRouter)
