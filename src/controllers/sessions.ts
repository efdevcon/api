import dayjs from 'dayjs'
import { Request, Response, Router } from 'express'
import Handlebars from 'handlebars'
import puppeteer from 'puppeteer'
import { ogImageTemplate } from 'templates/og'
import { templateStyles } from 'templates/styles'
import { GetAvatar, GetEventDay, GetTrackId, GetTrackImage } from 'utils/templates'

export const sessionsRouter = Router()
sessionsRouter.get(`/sessions`, GetSessions)
sessionsRouter.get(`/sessions/:id`, GetSession)
sessionsRouter.get(`/sessions/:id/image`, GetSessionImage)

async function GetSessions(req: Request, res: Response) {
  // #swagger.tags = ['Sessions']
  const data = ['']

  res.status(200).send({ status: 200, message: '', data })
}

async function GetSession(req: Request, res: Response) {
  // #swagger.tags = ['Sessions']
  const data = {}

  res.status(200).send({ status: 200, message: '', data })
}

async function GetSessionImage(req: Request, res: Response) {
  // #swagger.tags = ['Sessions']

  // TODO: Get Session
  const imageType: string = 'og' // og | video
  const session = {
    title: 'Test OG Session',
    track: 'Security',
    type: 'Workshop',
    start: 1665684000000,
    speakers: [
      {
        name: 'IX Shells',
        avatar: await GetAvatar('ixshells'),
      },
    ],
  }

  const styles = Handlebars.compile(templateStyles)({
    fontSize: imageType === 'video' ? '1.8rem' : '1.4rem',
    scaledFontSize: session.title.length > 100 ? 'smaller' : session.title.length < 50 ? 'larger' : 'inherit',
  })

  const baseUri = `${req.protocol}://${req.headers.host}`
  const html = Handlebars.compile(ogImageTemplate)({
    cssStyle: styles,
    logoUrl: `${baseUri}/static/dc6/dcvibogota.svg`,
    imageType: imageType,
    track: GetTrackId(session.track),
    trackImage: GetTrackImage(baseUri, session.track),
    type: session.type,
    title: session.title,
    eventDay: GetEventDay(session.start),
    eventDate: dayjs(session.start).format('MMM DD, YYYY'),
    speaker: session.speakers.length === 1 ? session.speakers[0] : null,
    speakers: session.speakers.length > 1 ? session.speakers : [],
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
