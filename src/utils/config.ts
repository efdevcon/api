import fs from 'fs'
import { join } from 'path'
import dotenv from 'dotenv'
dotenv.config()

const packageFile = fs.readFileSync(join(process.cwd(), 'package.json'), 'utf-8')
const packageData = JSON.parse(packageFile)

export const DEVCON_INFO = {
  title: 'Devcon',
  description: 'Devcon is the Ethereum conference for developers, researchers, thinkers, and makers.',
  website: 'https://devcon.org/',
}

export const API_INFO = {
  title: `${DEVCON_INFO.title} API`,
  description: packageData.description,
  website: packageData.homepage,
  email: packageData.author,
  documentation: `${packageData.homepage}/docs`,
  repository: packageData.repository.url,
  host: packageData.homepage.replace('https://', ''),
  version: packageData.version,
  license: packageData.license,
}

export const API_DEFAULTS = {
  SIZE: 20,
  ORDER: 'desc',
}

export const SERVER_CONFIG = {
  NODE_ENV: process.env.RENDER ? 'production' : process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 3000,

  DB_CONNECTION_STRING: process.env.DB_CONNECTION_STRING || '',
  GITHUB_TOKEN: process.env.GITHUB_TOKEN,

  SMTP_DEFAULT_FROM_NAME: process.env.SMTP_DEFAULT_FROM_NAME || DEVCON_INFO.title,
  SMTP_DEFAULT_FROM: process.env.SMTP_DEFAULT_FROM || API_INFO.email,
  SMTP_SERVICE: process.env.SMTP_SERVICE,
  SMTP_USERNAME: process.env.SMTP_USERNAME,
  SMTP_PASSWORD: process.env.SMTP_PASSWORD,
}

export const SESSION_CONFIG = {
  cookieName: API_INFO.title,
  password: process.env.SESSION_SECRET || 'default-test-session-secret-for-iron-session',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
}
