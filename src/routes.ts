import { eventsRouter } from 'controllers/events'
import { Router } from 'express'
import { API_VERSION, TITLE } from 'utils/config'

export const router = Router()

router.get('/', (req, res) => {
  const data = {
    name: TITLE,
    version: API_VERSION(),
  }

  res.status(200).send({ status: 200, message: '', data: data })
})

router.use(eventsRouter)
