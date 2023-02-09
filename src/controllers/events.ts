import { Request, Response, Router } from 'express'
import { PrismaClient } from '@prisma/client'

const client = new PrismaClient()

export const eventsRouter = Router()
eventsRouter.get(`/events`, GetEvents)
eventsRouter.get(`/events/:id`, GetEvent)
eventsRouter.get(`/events/:id/sessions`, GetSessions)
eventsRouter.get(`/events/:id/speakers`, GetSpeakers)
eventsRouter.get(`/events/:id/rooms`, GetRooms)

async function GetEvents(req: Request, res: Response) {
  // #swagger.tags = ['Events']
  const data = await client.event.findMany()

  res.status(200).send({ status: 200, message: '', data: data })
}

async function GetEvent(req: Request, res: Response) {
  // #swagger.tags = ['Events']
  const data = await client.event.findFirst({
    where: { id: req.params.id },
  })

  if (!data) return res.status(404).send({ status: 404, message: 'Not Found' })

  res.status(200).send({ status: 200, message: '', data: data })
}

async function GetSessions(req: Request, res: Response) {
  // #swagger.tags = ['Events']
  const data = await client.session.findMany({
    where: { eventId: req.params.id },
  })

  res.status(200).send({ status: 200, message: '', data })
}

async function GetSpeakers(req: Request, res: Response) {
  // #swagger.tags = ['Events']
  const data = await client.speaker.findMany({
    where: {
      sessions: {
        some: { eventId: req.params.id },
      },
    },
  })

  res.status(200).send({ status: 200, message: '', data })
}

async function GetRooms(req: Request, res: Response) {
  // #swagger.tags = ['Events']
  const data = await client.event.findFirst({
    where: { id: req.params.id },
    include: {
      rooms: true,
    },
  })

  if (!data) return res.status(404).send({ status: 404, message: 'Not Found' })

  res.status(200).send({ status: 200, message: '', data: data.rooms })
}
