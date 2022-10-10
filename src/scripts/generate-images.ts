import fetch from 'cross-fetch'
import { APP_URL, GetBaseUri } from 'utils/constants'
import { getDay } from 'utils/generator'
import fs from 'fs'
import slugify from'slugify'

Run()

async function Run() {
    const baseUri = GetBaseUri()
    console.log('RUN Image processor..')
    console.log('on', baseUri)

    const response = await fetch(`${APP_URL}api/schedule`)
    const body = await response.json()
    console.log(body.data.length, 'sessions')

    for (let i = 0; i < body.data.length; i++) {
        await GenerateAssets(body.data[i])
        await GenerateCopy(body.data[i])
    }

    console.log('Done')
}

export async function GenerateCopy(session: any) {
    const day = getDay(session.start)
    const room = session.room.name
    const text = `Visit the https://archive.devcon.org/ to gain access to the entire library of Devcon talks with the ease of filtering, playlists, personalized suggestions, decentralized access on IPFS and more.
https://archive.devcon.org/archive/watch/6/${slugify(session.title.toLowerCase(), { strict: true })}/index

${session.description}

Speaker(s): ${session.speakers.map((i: any) => i.name).join(', ')}
${session.expertise ? `Skill level: ${session.expertise}\n` : ''}Track: ${session.track}
Keywords: ${session.tags}

Follow us: https://twitter.com/efdevcon, https://twitter.com/ethereum
Learn more about devcon: https://www.devcon.org/
Learn more about ethereum: https://ethereum.org/ 

Devcon is the Ethereum conference for developers, researchers, thinkers, and makers. 
Devcon 6 was held in Bogotá, Colombia on Oct 11 - 14, 2022.
Devcon is organized and presented by the Ethereum Foundation, with the support of our sponsors. To find out more, please visit https://ethereum.foundation/`

    const dirName = `./generated/${day}/${room}`
    fs.mkdir(dirName, { recursive: true }, () => '')
    fs.writeFile(`${dirName}/${session.id}_youtube.txt`, text, () => '')
}

export async function GenerateAssets(session: any) {
    setTimeout(async () => {
        console.log('PROCESSING', session.id, 'social')
        await GenerateImage(session, 'og')
    }, 2000)

    setTimeout(async () => {
        console.log('PROCESSING', session.id, 'video')
        await GenerateImage(session, 'video')
    }, 2000)
}

export async function GenerateImage(session: any, type: 'og' | 'video') {
    const day = getDay(session.start)
    const room = session.room.name
    const baseUri = GetBaseUri()

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