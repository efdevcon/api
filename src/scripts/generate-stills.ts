import fetch from 'cross-fetch'
import { APP_URL } from 'utils/constants'
import fs from 'fs'

Run()

async function Run() {
    console.log('RUN')

    const response = await fetch(`${APP_URL}api/schedule`)
    const body = await response.json()

    for (let i = 1; i < body.data.length; i++) {
        const session = body.data[i]

        setTimeout(async () => {
            const res = await fetch(`https://efdevcon-api.vercel.app/api/og?id=${session.id}`)
            const buffer = Buffer.from(await res.arrayBuffer())
            fs.writeFile(`./out/image_${i}.png`, buffer, () => console.log('finished downloading!'))

        }, i * 100)
    }
}