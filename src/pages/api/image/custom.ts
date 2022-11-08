import { withOGImage } from 'next-api-og-image'
import { GetCacheControl } from 'utils/constants'
import { GetHtmlTemplate } from 'utils/generator'

const sessions = [
    {
        id: 'workshop_1_pse',
        title: 'Privacy & Scaling Explorations: What We Do and How to Get Involved',
        "track": "ZKPs: Privacy, Identity, Infrastructure, & More",
        type: 'Workshop',
        "start": 1665532800000,
        speakers: [{
            "name": "Thore Hildebrandt",

        }]
    },
    {
        id: 'workshop_1_dreamdao',
        title: 'What Can DAOs Learn From',
        "track": "Governance & Coordination",
        type: 'Workshop',
        "start": 1665532800000,
        speakers: [
            {
                "name": "Madison Adams",
            },
            {
                "name": "Safder Raza",
                "avatar": "https://speak.devcon.org/media/avatars/Safder_Twit_2_RxJ1xUp.jpg",
            },
            {
                "name": "Dream DAO",
            },
        ]
    },
    {
        id: 'workshop_1_esp',
        title: 'Ecosystem Support Program',
        "track": "Opportunity & Global Impact",
        type: 'Workshop',
        "start": 1665532800000,
        speakers: [
            {
                "name": "Luc Lamarche",
                "avatar": "https://speak.devcon.org/media/avatars/Luc_Lamarche_HRMS_95112_0PtqjHt.jpg",
            },
        ]
    },
]

export default withOGImage<'query', {}>({
    cacheControl: GetCacheControl(),
    dev: {
        inspectHtml: false,
    },
    width: 1920,
    height: 1080,
    template: {
        html: async () => {
            console.log('Custom generator..')

            let session = {}

            session = sessions[0]

            session = {
                title: 'Live Coding Performance',
                "track": "Music",
                type: 'Music',
                "start": 1665684000000,
                speakers: [{
                    "name": "IX Shells",
                    "avatar": "https://pbs.twimg.com/profile_images/1585299186983047168/Q9oIrWR0_400x400.jpg"
                }]
            }


            return GetHtmlTemplate(session, 'video')
        }
    }
})