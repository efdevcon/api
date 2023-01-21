import { Request, Response, Router } from 'express'
import { GetData } from 'utils/data'
import { Event } from 'types/events'

export const eventsRouter = Router()
eventsRouter.get(`/events`, GetEvents)
eventsRouter.get(`/events/:id`, GetEvent)

async function GetEvents(req: Request, res: Response) {
  // #swagger.tags = ['Events']
  const events = await GetData<Event>('events')

  res.status(200).send({ status: 200, message: '', data: events })
}

async function GetEvent(req: Request, res: Response) {
  // #swagger.tags = ['Events']
  const events = await GetData<Event>('events')
  const event = events.find((e) => e.id === req.params.id)

  if (!event) return res.status(404).send({ status: 404, message: 'Not Found' })

  res.status(200).send({ status: 200, message: '', data: event })
}
