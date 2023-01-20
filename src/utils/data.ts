import fs from 'fs'
import { join } from 'path'

export async function GetData<T>(folder: string): Promise<Array<T>> {
  const dir = join(process.cwd(), 'data', folder)

  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((i) => i.isFile() && i.name.endsWith('.json'))
    .map((i) => {
      const fullPath = join(dir, i.name)
      const content = fs.readFileSync(fullPath, 'utf-8')

      return {
        id: i.name.replace('.json', ''),
        ...JSON.parse(content),
      } as T
    })
}
