import { eventsRouter } from 'controllers/events'
import { sessionsRouter } from 'controllers/sessions'
import { speakersRouter } from 'controllers/speakers'
import { Router } from 'express'
import { API_VERSION, TITLE } from 'utils/config'

export const router = Router()

router.get('/', (req, res) => {
  // #swagger.tags = ['Default']
  const data = {
    name: TITLE,
    version: API_VERSION(),
  }

  res.status(200).send({ status: 200, message: '', data: data })
})

router.use(eventsRouter)
router.use(speakersRouter)
router.use(sessionsRouter)
