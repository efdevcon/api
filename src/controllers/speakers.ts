import { Request, Response, Router } from 'express'
import { PrismaClient } from '@prisma/client'

const client = new PrismaClient()

export const speakersRouter = Router()
speakersRouter.get(`/speakers`, GetSpeakers)
speakersRouter.get(`/speakers/:id`, GetSpeaker)

async function GetSpeakers(req: Request, res: Response) {
  // #swagger.tags = ['Speakers']
  const data = await client.speaker.findMany()

  res.status(200).send({ status: 200, message: '', data })
}

async function GetSpeaker(req: Request, res: Response) {
  // #swagger.tags = ['Speakers']
  const data = await client.speaker.findFirst({
    where: {
      OR: [{ id: req.params.id }, { sourceId: req.params.id }],
    },
  })

  if (!data) return res.status(404).send({ status: 404, message: 'Not Found' })

  res.status(200).send({ status: 200, message: '', data: data })
}
