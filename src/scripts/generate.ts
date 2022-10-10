import fetch from 'cross-fetch'
import { APP_URL, GetBaseUri } from 'utils/constants'
import { GenerateAssets } from './generate-images'

Run()

async function Run() {
    const sessionId = process.argv[2]
    const baseUri = GetBaseUri()
    console.log('RUN Image processor..')
    console.log('on', baseUri)
    console.log('SESSION', sessionId)

    if (!sessionId) return console.warn('No session ID')

    const response = await fetch(`${APP_URL}api/schedule`)
    const body = await response.json()
    const session = body.data.find((i: any) => i.id === sessionId)
    if (!session) return console.warn('Session not found')

    await GenerateAssets(session)

    console.log('Done')
}
