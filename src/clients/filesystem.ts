import fs from 'fs'
import { join } from 'path'
import { CreateBlockie } from '../utils/account'

export function GetData(folder: string) {
  const files: any[] = []
  const dir = join(process.cwd(), 'data', folder)
  const items = fs.readdirSync(dir, { withFileTypes: true })

  for (const i of items) {
    if (i.isDirectory()) {
      const subFiles = GetData(join(folder, i.name))
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

export function GetSpeakerData(): Array<any> {
  const speakers = GetData('speakers')
  return speakers.map((i) => {
    const avatar = i.avatar || CreateBlockie(i.name)

    return {
      ...i,
      avatar,
    }
  })
}
