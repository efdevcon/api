import { withOGImage } from 'next-api-og-image'
import { APP_URL, GetCacheControl } from 'utils/constants'
import { GetHtmlTemplate } from 'utils/generator'

interface QueryParams {
    id: string
}

export default withOGImage<'query', QueryParams>({
    cacheControl: GetCacheControl(),
    dev: {
        inspectHtml: false,
    },
    template: {
        html: async ({ id }) => {
            console.log('GET session', id)
            const response = await fetch(`${APP_URL}api/schedule/${id}`)
            const body = await response.json()
            const session = body.data

            if (!session) {
                console.warn('Session not found')
                return '' // Default OG image 
            }

            return GetHtmlTemplate(session)
        }
    }
})