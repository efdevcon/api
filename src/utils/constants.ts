export const SITE_URL = 'https://efdevcon-api.vercel.app/'
export const APP_URL = 'https://app.devcon.org/'

require('dotenv').config()

export function GetBaseUri() {
    return process.env.NODE_ENV === "development" ? 'http://localhost:3000/' : SITE_URL
}

export function GetCacheControl() {
    return process.env.NODE_ENV === "development" ? '' : 'public, max-age=0, s-maxage=86400, stale-while-revalidate=60'
}