import fetch from 'cross-fetch'
import { APP_URL, GetBaseUri } from 'utils/constants'
import { getDay } from 'utils/generator'
import fs from 'fs'

Run()

const baseUri = GetBaseUri()

async function Run() {
    console.log('RUN Image processor..')
    console.log('on', baseUri)

    const response = await fetch(`${APP_URL}api/schedule`)
    const body = await response.json()
    console.log(body.data.length, 'sessions')

    for (let i = 0; i < body.data.length; i++) {
        const session = body.data[i]

        setTimeout(async () => {
            console.log('PROCESSING', session.id, 'social')
            await GenerateImage(session, 'og')
        }, i * 2000)

        setTimeout(async () => {
            console.log('PROCESSING', session.id, 'video')
            await GenerateImage(session, 'video')
        }, i * 2000)
    }
}

async function GenerateImage(session: any, type: 'og' | 'video') {
    const day = getDay(session.start)
    const room = session.room.name

    const res = await fetch(`${baseUri}api/image/${type}?id=${session.id}`)
    if (res.status === 200) {
        const arr = await res.arrayBuffer()
        const png = isPng(new Uint8Array(arr))
        const buffer = Buffer.from(arr)
        if (png) {
            const dirName = `./generated/${day}/${room}`
            fs.mkdir(dirName, { recursive: true }, () => '')
            fs.writeFile(`${dirName}/${session.id}_${type === 'og' ? 'social' : '1080'}.png`, buffer, () => '')
        }
        else {
            console.warn('Invalid image file.', session.id, type)
        }
    }
    else {
        console.warn('Unable to fetch image.', session.id, type)
        console.log(res)
    }
}

export function isPng(buffer: Uint8Array): boolean {
    if (!buffer || buffer.length < 8) {
        return false
    }

    return buffer[0] === 0x89
        && buffer[1] === 0x50
        && buffer[2] === 0x4E
        && buffer[3] === 0x47
        && buffer[4] === 0x0D
        && buffer[5] === 0x0A
        && buffer[6] === 0x1A
        && buffer[7] === 0x0A;
}