import dayjs from 'dayjs'
import { Request, Response, Router } from 'express'
import Handlebars from 'handlebars'
import puppeteer from 'puppeteer'
import { ogImageTemplate } from 'templates/og'
import { templateStyles } from 'templates/styles'
import { Session } from 'types/sessions'
import { GetData, GetSessionData } from 'clients/filesystem'
import { GetEventDay, GetTrackId, GetTrackImage } from 'utils/templates'

export const sessionsRouter = Router()
sessionsRouter.get(`/sessions`, GetSessions)
sessionsRouter.get(`/sessions/:id`, GetSession)
sessionsRouter.get(`/sessions/:id/image`, GetSessionImage)

async function GetSessions(req: Request, res: Response) {
  // #swagger.tags = ['Sessions']
  const data = GetData<Session>('sessions')

  res.status(200).send({ status: 200, message: '', data })
}

async function GetSession(req: Request, res: Response) {
  // #swagger.tags = ['Sessions']
  const data = GetData<Session>('sessions')
  const item = data.find((e) => e.id.toLowerCase() === req.params.id.toLowerCase() || e.sourceId.toLowerCase() === req.params.id.toLowerCase())

  if (!item) return res.status(404).send({ status: 404, message: 'Not Found' })

  res.status(200).send({ status: 200, message: '', data })
}

async function GetSessionImage(req: Request, res: Response) {
  // #swagger.tags = ['Sessions']
  const data = GetSessionData()
  const item = data.find((e) => e.id.toLowerCase() === req.params.id.toLowerCase() || e.sourceId.toLowerCase() === req.params.id.toLowerCase())

  if (!item) return res.status(404).send({ status: 404, message: 'Not Found' })

  const imageType: string = 'og' // og | video
  const styles = Handlebars.compile(templateStyles)({
    fontSize: imageType === 'video' ? '1.8rem' : '1.4rem',
    scaledFontSize: item.title.length > 100 ? 'smaller' : item.title.length < 50 ? 'larger' : 'inherit',
  })

  const baseUri = `${req.protocol}://${req.headers.host}`
  const html = Handlebars.compile(ogImageTemplate)({
    cssStyle: styles,
    logoUrl: `${baseUri}/static/dc6/dcvibogota.svg`,
    imageType: imageType,
    track: GetTrackId(item.track),
    trackImage: GetTrackImage(baseUri, item.track),
    type: item.type,
    title: item.title,
    eventDay: GetEventDay(item.slot?.start || 0),
    eventDate: dayjs(item.slot?.start).format('MMM DD, YYYY'),
    speaker: item.speakers.length === 1 ? item.speakers[0] : null,
    speakers: item.speakers.length > 1 ? item.speakers : [],
  })

  const browser = await puppeteer.launch({ args: ['--no-sandbox'] })
  const page = await browser.newPage()

  if (imageType === 'video') {
    await page.setViewport({ width: 1920, height: 1080 })
  } else {
    await page.setViewport({ width: 1200, height: 630 })
  }

  await page.setContent(html, { waitUntil: 'domcontentloaded' })
  const image = await page.screenshot({ type: 'png', omitBackground: true })

  await page.close()
  await browser.close()

  res.statusCode = 200
  res.setHeader('Content-Type', 'image/png')
  res.setHeader('Cache-Control', `immutable, no-transform, s-max-age=2592000, max-age=2592000`)
  res.end(image)
}
