import dotenv from 'dotenv'
dotenv.config()

export const SERVER_CONFIG = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 3000,
}
