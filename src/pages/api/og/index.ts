import { withOGImage } from 'next-api-og-image'
import { SITE_URL } from 'utils/constants'
import moment from 'moment'
import sessions from 'data/session-data.json'

interface QueryParams {
    id: string
}

const baseUri = process.env.NODE_ENV === "production" ? SITE_URL : 'http://localhost:3000/'
// - 9BDUZU (no avatar)
// - PUWLD9 (7 speakers)
// - EWZLCP (single speaker)
// - KNPHBZ (longest title)

export default withOGImage<'query', QueryParams>({
    // cacheControl: 'public, max-age=604800, immutable',
    dev: {
        inspectHtml: false,
    },
    template: {
        html: async ({ id }) => {
            console.log('GET session', id)
            const session = sessions.find(i => i.id === id)
            if (!session) {
                console.warn('Session not found')
                return '' // Default OG image 
            }

            const reduceFontSize = session.title.length > 100 ||
                session.speakers.map(i => i.name).join(', ').length > 60

            return `
        <html>
            <head>
                ${getStyle(reduceFontSize)}
            </head>
            <body>
            <div class="container ${getTrackId(session.track)}">
                <svg class="icon" width="1294" height="2068" viewBox="0 0 1294 2068" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M647.013 3.3654L712.899 117.703L1268.14 1081.05L1269.4 1080.32L1268.14 1081.05L1292.02 1122.44L1264.99 1161.89L709.782 1972.45L647.013 2064.07L584.245 1972.45L29.0073 1161.89L1.98425 1122.44L25.8637 1081.02L581.101 117.703L647.013 3.3654ZM267.242 1373.45H264.053L265.856 1376.08L312.443 1444.05L312.943 1444.78H313.829H563.477H564.454L564.938 1443.93L603.648 1375.96L605.078 1373.45H602.188H267.242ZM645.553 1297.26L647.013 1299.83L648.473 1297.26L802.149 1027.52L802.623 1026.68L802.149 1025.85L648.473 756.155L647.013 753.593L645.553 756.155L491.877 1025.88L491.403 1026.71L491.877 1027.54L645.553 1297.26ZM831.946 1078.18L830.486 1075.62L829.025 1078.18L689.834 1322.5L688.402 1325.02H691.294H969.704H972.595L971.164 1322.5L831.946 1078.18ZM670.929 1444.78H673.821L672.389 1442.27L648.447 1400.27L646.987 1397.7L645.527 1400.27L621.586 1442.27L620.154 1444.78H623.046H670.929ZM602.706 1325.02H605.598L604.166 1322.5L464.948 1078.21L463.488 1075.65L462.028 1078.21L322.837 1322.5L321.405 1325.02H324.297H602.706ZM645.627 1930.49L647.013 1932.51L648.399 1930.49L946.138 1495.84L947.94 1493.21H944.751H760.087H533.965H349.275H346.087L347.888 1495.84L645.627 1930.49ZM980.197 1444.78H981.083L981.584 1444.05L1027.64 1376.81H1027.64L1028.15 1376.07L1030.67 1372.38L1203.61 1119.9L1204.21 1119.02L1203.68 1118.11L648.469 154.79L647.013 152.264L645.557 154.789L90.2416 1118.11L89.7134 1119.02L90.3111 1119.9L248.288 1350.52L249.805 1352.73L251.134 1350.4L435.1 1027.52L435.574 1026.68L435.1 1025.85L376.982 923.851L375.522 921.288L374.062 923.851L186.114 1253.75L155.682 1209.32L375.548 823.41L462.028 975.181L463.488 977.744L464.948 975.181L646.987 655.688L829.026 975.181L830.486 977.744L831.946 975.181L918.401 823.411L1138.27 1209.32L1107.83 1253.75L919.86 923.851L918.4 921.288L916.94 923.851L858.823 1025.85L858.349 1026.68L858.823 1027.52L1042.27 1349.49L1027.88 1370.51L1025.87 1373.45H691.813H688.921L690.352 1375.96L729.089 1443.93L729.572 1444.78H730.549H980.197Z" />
                </svg>

                <header>
                    <img src="${baseUri}assets/dcvibogota.svg" alt="${session.track}" class="logo">
                    <p><span class="session-type">Session</span> ${session.type}</p>
                </header>
                
                <main>
                    <div>
                        <p class="title">${session.title}</p>
                        <p class="date">${getDay(session.start)} — ${moment(session.start).format('MMM DD, YYYY')}</p>
                    </div>
                    <img src="${getTrackImage(session.track)}" alt="${session.track}" class="track-icon">
                </main>

                ${getSpeakers(session.speakers)}
            </div>
            </body>
        </html>`
        }
    }
})

function getTrackId(track: string) {
    if (track === 'Cryptoeconomics') return 'cryptoeconomics'
    if (track === 'Developer Infrastructure') return 'developer-infrastructure'
    if (track === 'Governance & Coordination') return 'governance'
    if (track === 'Layer 1 Protocol') return 'layer-1'
    if (track === 'Layer 2s') return 'layer-2'
    if (track === 'Opportunity & Global Impact') return 'global-impact'
    if (track === 'Security') return 'security'
    if (track === 'Staking & Validator Experience') return 'staking'
    if (track === 'UX & Design') return 'ux-design'
    if (track === 'ZKPs: Privacy, Identity, Infrastructure, & More') return 'zkps'
    return ''
}

function getTrackImage(track: string) {
    if (track === 'Cryptoeconomics') return `${baseUri}assets/tracks/Cryptoeconomics.svg`
    if (track === 'Developer Infrastructure') return `${baseUri}assets/tracks/Developer Infrastructure.svg`
    if (track === 'Governance & Coordination') return `${baseUri}assets/tracks/Governance & Coordination.svg`
    if (track === 'Layer 1 Protocol') return `${baseUri}assets/tracks/Layer 2s.svg`
    if (track === 'Layer 2s') return `${baseUri}assets/tracks/Layer 2s.svg`
    if (track === 'Opportunity & Global Impact') return `${baseUri}assets/tracks/Opportunity & Global Impact.svg`
    if (track === 'Security') return `${baseUri}assets/tracks/Security.svg`
    if (track === 'Staking & Validator Experience') return `${baseUri}assets/tracks/Staking & Validator Experience.svg`
    if (track === 'UX & Design') return `${baseUri}assets/tracks/UX & Design.svg`
    if (track === 'ZKPs: Privacy, Identity, Infrastructure, & More') return `${baseUri}assets/tracks/ZKPs and Privacy.svg`

    return null
}

function getSpeakers(speakers: any[]) {
    if (speakers.length === 1) {
        const speaker = speakers[0]
        return `<footer class="single">
      <img src="${getAvatar(speaker.avatar)}" alt="${speaker.name}" class="avatar" />
      <p>${speaker.name}</p>
    </footer>`
    }

    const footer = `<footer class="multiple">
    <div class="avatars">
      ${speakers.map(i => `<img src="${getAvatar(i.avatar)}" alt="${i.name}" class="avatar" />`).join('')}
    </div>
    <p>
      ${speakers.map(i => i.name).join(', ')}
    </p>
  </footer>`
    return footer
}

function getAvatar(url: string) {
    return url || `${baseUri}assets/avatar.png`
}

function getDay(date: number) {
    if (moment(date).format('DD') === '11') return 'Day 1'
    if (moment(date).format('DD') === '12') return 'Day 2'
    if (moment(date).format('DD') === '13') return 'Day 3'
    if (moment(date).format('DD') === '14') return 'Day 4'
}

function getStyle(reduceSize: boolean) {
    return `
<style>
*,
*::before,
*::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    color: #000;
    font-size: ${reduceSize ? '1.25rem' : '1.5rem'};
}

.container {
    width: 100vw;
    height: 100vh;
    position: relative;
    display: flex;
    flex-direction: column;
    padding: 2rem;
    overflow: hidden;
}
.icon {
    position: absolute;
    top: -580;
    left: 400;
    z-index: 1;
}
.icon path {
    stroke: red;
    stroke-opacity: 0.3;
    stroke-width: 3.36104;
}

header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    z-index: 10;
}
.logo {
    width: 300px;
}
.session-type {
    color: #666;
    margin-right: 16px;
}

main {
    display: flex;
    height: 100%;
    align-items: center;
    z-index: 10;
    gap: 32px;
}
main div { 
    flex-grow: 1;
}
.title {
    font-size: ${reduceSize ? '1.5rem' : '2rem'};
}
.date {
    margin-top: 16px;
    color: #666;
}
.track-icon {
    transform: scale(1.0);
}


footer {
    z-index: 10;
    display: flex;
    gap: 16px;
}
.single {
    align-items: center;
}
.multiple {
    flex-direction: column;
}
.avatars { 
    display: flex;
    gap: 16px;
}
.avatar {
    border-radius: 50%;
    width: 60px;
    height: 60px;
    object-fit: cover;
}

.cryptoeconomics {
    background-color: #FFFEF4;
}
.cryptoeconomics path {
    stroke: #FCCE0D !important;
}
.developer-infrastructure {
    background-color: #F6F2FF;
}
.developer-infrastructure path {
    stroke: #7958A5 !important;
}
.governance {
    background-color: #F9FFDF;
}
.governance path {
    stroke: #88C43F !important;
}
.layer-1 {
    background-color: #E6F0FF;
}
.layer-1 path {
    stroke: #224490 !important;
}
.layer-2 {
    background-color: #E4FAFF;
}
.layer-2 path {
    stroke: #0DAED0 !important;
}
.global-impact {
    background-color: #FFFBF4;
}
.global-impact path {
    stroke: #F69022 !important;
}
.security {
    background-color: #E4FFFD;
}
.security path {
    stroke: #1970AE !important;
}
.staking {
    background-color: #FCF4FF;
}
.staking path {
    stroke: #E55066 !important;
}
.ux-design {
    background-color: #FFF4F4;
}
.ux-design path {
    stroke: #E42327 !important;
}
.zkps {
    background-color: #F2FFFA;
}
.zkps path {
    stroke: #00B3A4 !important;
}
</style>
`
}