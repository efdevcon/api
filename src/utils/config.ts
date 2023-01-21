import fs from 'fs'
import { join } from 'path'
import dotenv from 'dotenv'
dotenv.config()

export const DEFAULT_HOST = 'https://devcon-api.herokuapp.com'
export const TITLE = 'Devcon API'
export const API_VERSION = () => {
  const packageJson = fs.readFileSync(join(process.cwd(), 'package.json'), 'utf-8')

  return JSON.parse(packageJson).version
}

export const SERVER_CONFIG = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 3000,
}
