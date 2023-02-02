import fs from 'fs'
import { join } from 'path'
import { Session } from 'types/sessions'
import { Speaker } from 'types/speakers'
import { CreateBlockie } from '../utils/account'

export function GetData<T>(folder: string): Array<T> {
  const files: T[] = []
  const dir = join(process.cwd(), 'data', folder)
  const items = fs.readdirSync(dir, { withFileTypes: true })

  for (const i of items) {
    if (i.isDirectory()) {
      const subFiles = GetData<T>(join(folder, i.name))
      files.push(...subFiles)
    }

    if (i.isFile() && i.name.endsWith('.json')) {
      const fullPath = join(dir, i.name)
      const content = fs.readFileSync(fullPath, 'utf-8')
      files.push({
        id: i.name.replace('.json', ''),
        ...JSON.parse(content),
      })
    }
  }

  return files
}

export function GetSpeakerData() {
  const speakers = GetData<Speaker>('speakers')
  return speakers.map((i) => {
    const avatar = i.avatar || CreateBlockie(i.name)

    return {
      ...i,
      avatar,
    }
  })
}

export function GetSessionData() {
  const sessions = GetData<Session>('sessions')
  const speakers = GetSpeakerData()

  return sessions.map((session) => {
    return {
      ...session,
      speakers: (session.speakers as unknown as string[]).map((s) => speakers.find((sp) => sp.id === s)),
    }
  })
}
