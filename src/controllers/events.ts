import { Request, Response, Router } from 'express'
import { GetData } from 'utils/data'
import { Event } from 'types/events'

const basePath = 'events'

export const registerEvents = (router: Router) => {
  router.get(`/${basePath}`, GetEvents)
  router.get(`/${basePath}/:id`, GetEvent)
}

async function GetEvents(req: Request, res: Response) {
  const events = await GetData<Event>(basePath)

  res.status(200).send({ status: 200, message: '', data: events })
}

async function GetEvent(req: Request, res: Response) {
  const events = await GetData<Event>(basePath)
  const event = events.find((e) => e.id === req.params.id)

  if (!event) return res.status(404).send({ status: 404, message: 'Not Found' })

  res.status(200).send({ status: 200, message: '', data: event })
}
