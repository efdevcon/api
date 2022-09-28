import fetch from 'cross-fetch'
import { APP_URL } from 'utils/constants'
import { getDay } from 'utils/generator'
import fs from 'fs'

Run()

async function Run() {
    console.log('RUN Image processor..')

    const response = await fetch(`${APP_URL}api/schedule`)
    const body = await response.json()

    for (let i = 0; i < body.data.length; i++) {
        const session = body.data[i]
        console.log('PROCESSING', session.id)

        setTimeout(async () => {
            await GenerateImage(session, 'og')
            await GenerateImage(session, 'video')
        }, i * 1000)
    }
}

async function GenerateImage(session: any, type: 'og' | 'video') {
    const day = getDay(session.start)
    const room = session.room.name

    const res = await fetch(`https://efdevcon-api.vercel.app/api/image/${type}?id=${session.id}`)
    const buffer = Buffer.from(await res.arrayBuffer())
    const dirName = `./generated/${day}/${room}`
    fs.mkdir(dirName, { recursive: true }, () => '')
    fs.writeFile(`${dirName}/${session.id}_${type === 'og' ? 'social' : '1080'}.png`, buffer, () => '')
}