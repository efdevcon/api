import { Request, Response, Router } from 'express'
import { GetData } from 'utils/data'
import { Speaker } from 'types/speakers'

export const speakersRouter = Router()
speakersRouter.get(`/speakers`, GetSpeakers)
speakersRouter.get(`/speakers/:id`, GetSpeaker)

async function GetSpeakers(req: Request, res: Response) {
  // #swagger.tags = ['Speakers']
  const data = await GetData<Speaker>('speakers')

  res.status(200).send({ status: 200, message: '', data })
}

async function GetSpeaker(req: Request, res: Response) {
  // #swagger.tags = ['Speakers']
  const data = await GetData<Speaker>('speakers')
  const item = data.find((e) => e.id === req.params.id)

  if (!item) return res.status(404).send({ status: 404, message: 'Not Found' })

  res.status(200).send({ status: 200, message: '', data: item })
}
