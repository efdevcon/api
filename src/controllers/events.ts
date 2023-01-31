import { Request, Response, Router } from 'express'
import { GetData } from 'utils/data'
import { Event } from 'types/events'

export const eventsRouter = Router()
eventsRouter.get(`/events`, GetEvents)
eventsRouter.get(`/events/:id`, GetEvent)
eventsRouter.get(`/events/:id/sessions`, GetSessions)
eventsRouter.get(`/events/:id/speakers`, GetSpeakers)
eventsRouter.get(`/events/:id/venue`, GetVenue)

async function GetEvents(req: Request, res: Response) {
  // #swagger.tags = ['Events']
  const data = await GetData<Event>('events')

  res.status(200).send({ status: 200, message: '', data })
}

async function GetEvent(req: Request, res: Response) {
  // #swagger.tags = ['Events']
  const data = await GetData<Event>('events')
  const item = data.find((e) => e.id === req.params.id)

  if (!item) return res.status(404).send({ status: 404, message: 'Not Found' })

  res.status(200).send({ status: 200, message: '', data: item })
}

async function GetSpeakers(req: Request, res: Response) {
  // #swagger.tags = ['Events']

  res.status(200).send({ status: 200, message: '', data: [] })
}

async function GetSessions(req: Request, res: Response) {
  // #swagger.tags = ['Events']

  res.status(200).send({ status: 200, message: '', data: [] })
}

async function GetVenue(req: Request, res: Response) {
  // #swagger.tags = ['Events']

  res.status(200).send({ status: 200, message: '', data: [] })
}
