import { withOGImage } from 'next-api-og-image'
import { APP_URL, GetCacheControl } from 'utils/constants'
import { GetHtmlUserTemplate } from 'utils/generator'

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
            const response = await fetch(`${APP_URL}api/schedule/u/${id}`)
            const body = await response.json()
            const agenda = body.data

            if (!agenda) {
                console.warn('Agenda not found')
                return '' // Default OG image 
            }

            return GetHtmlUserTemplate(agenda)
        }
    }
})