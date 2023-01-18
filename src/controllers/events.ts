import { Request, Response, Router } from 'express'

const basePath = '/events'
const events = [
  { number: 0, name: 'DEV CON 0' },
  { number: 1, name: 'DΞVCON 1' },
  { number: 2, name: 'devcon two' },
  { number: 3, name: 'devcon three' },
  { number: 4, name: 'Devcon iv.' },
  { number: 5, name: 'Devcon V' },
  { number: 6, name: 'Devcon VI' },
]

export const registerEvents = (router: Router) => {
  router.get(`${basePath}`, GetEvents)
  router.get(`${basePath}/:id`, GetEvent)
}

async function GetEvents(req: Request, res: Response) {
  const data = events

  res.status(200).send({ status: 200, message: '', data: data })
}

async function GetEvent(req: Request, res: Response) {
  const id = Number(req.params.id)
  const event = events.find((e) => e.number === id)

  if (!event) return res.status(404).send({ status: 404, message: 'Not Found' })

  res.status(200).send({ status: 200, message: '', data: event })
}
