export const SITE_URL = 'https://efdevcon-api.vercel.app/'
export const APP_URL = 'https://app--efdevcon.netlify.app/'

export function GetBaseUri() {
    return process.env.NODE_ENV === "production" ? SITE_URL : 'http://localhost:3000/'
}

export function GetCacheControl() {
    return process.env.NODE_ENV === "production" ? 'public, max-age=0, s-maxage=86400, stale-while-revalidate=60' : ''
}