import { getDefaultProvider } from '@ethersproject/providers'
import moment from "moment"
import makeBlockie from "ethereum-blockies-base64"
import { GetBaseUri } from "./constants"


export async function GetHtmlUserTemplate(agenda: any) {
    const baseUri = GetBaseUri()

    let avatar = ''
    if (agenda.username.endsWith('.eth')) {
        try {
            const provider = getDefaultProvider()
            const resolver = await provider.getResolver(agenda.username)
            const ensAvatar = await resolver?.getAvatar()
            avatar = ensAvatar?.url ?? makeBlockie(agenda.username)
        }
        catch (e) {
            console.warn('Unable to resolve ENS avatar')
        }
    }

    if (!avatar) {
        avatar = makeBlockie(agenda.username)
    }

    return `<html>
    <head>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Inter&display=swap" rel="stylesheet"> 
        ${getStyle(false, true)}
    </head>
    <body>
    <div class="container ${getRandomStyle()} og">
        <svg class="icon" width="1294" height="2068" viewBox="0 0 1294 2068" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M579.256 1471.07L579.278 1471.03L645.583 1356.01L647.04 1353.48L648.495 1356.01L714.82 1471.18C714.821 1471.18 714.823 1471.18 714.825 1471.18L714.826 1471.19L713.37 1472.03L579.256 1471.07ZM579.256 1471.07L579.255 1471.07M579.256 1471.07L579.255 1471.07M579.255 1471.07L579.255 1471.07M579.255 1471.07L579.255 1471.07M579.255 1471.07L579.253 1471.07M579.255 1471.07L579.253 1471.07M579.253 1471.07L579.252 1471.08M579.253 1471.07L579.252 1471.08M579.252 1471.08L579.25 1471.08M579.252 1471.08L579.25 1471.08M579.25 1471.08L579.241 1471.1M579.25 1471.08L579.241 1471.1M579.241 1471.1C579.233 1471.11 579.216 1471.14 579.199 1471.17C579.191 1471.18 579.181 1471.2 579.168 1471.22C579.166 1471.23 579.164 1471.23 579.162 1471.23L579.241 1471.1ZM1268.11 1081.25L1268.11 1081.25L1292.02 1122.68L1264.99 1162.14L709.781 1972.87L647.013 2064.5L584.245 1972.87L29.0072 1162.14L1.98411 1122.68L25.8637 1081.25L24.4078 1080.41L25.8638 1081.25L581.076 117.728L646.987 3.36544L712.898 117.728L1268.11 1081.25ZM648.443 154.823L646.987 152.296L645.531 154.823L509.215 391.371L507.763 393.891H510.671H783.303H786.211L784.759 391.371L648.443 154.823ZM814.608 443.172L811.471 437.729V442.357H480.848H479.877L479.392 443.198L329.37 703.523L328.887 704.362L329.37 705.202L531.058 1055.22L532.514 1057.75L533.97 1055.22L618.568 908.416L619.052 907.577L618.568 906.738L537.287 765.659L537.28 765.647C525.714 745.926 519.581 723.763 519.581 701.721C519.581 631.475 576.738 574.339 647.013 574.339C717.288 574.339 774.445 631.475 774.445 701.721C774.445 723.788 768.312 745.952 756.693 765.777L756.687 765.788L675.458 906.738L674.974 907.577L675.458 908.417L695.357 942.942L760.03 1055.17L761.486 1057.69L762.942 1055.17L964.63 705.176L965.113 704.337L964.63 703.497L814.608 443.172ZM645.531 1253.88L646.991 1256.41L648.445 1253.87L653.314 1245.38L653.316 1245.38L733.015 1107.07L733.499 1106.23L733.015 1105.39L648.443 958.643L646.987 956.116L645.531 958.643L640.634 967.138L642.09 967.977L640.634 967.138L560.959 1105.42L560.475 1106.26L560.959 1107.1L640.634 1245.38L642.09 1244.54L640.634 1245.38L645.531 1253.88ZM714.722 741.488L714.747 741.445L714.748 741.442L714.75 741.437L714.759 741.423L714.779 741.391C714.785 741.379 714.793 741.366 714.801 741.353C714.81 741.337 714.823 741.315 714.837 741.288C722.195 728.754 725.959 715.419 725.959 701.721C725.959 658.186 690.537 622.779 646.987 622.779C603.437 622.779 568.015 658.186 568.015 701.721C568.015 715.404 571.784 728.72 579.175 741.335C579.177 741.338 579.179 741.341 579.18 741.343L645.505 856.511L646.96 859.039L648.417 856.512L714.722 741.488ZM302.382 755.402L300.926 752.875L299.469 755.402L90.2933 1118.37L89.7653 1119.29L90.3628 1120.16L309.437 1440.03L310.946 1442.23L312.279 1439.92L504.069 1107.1L504.553 1106.26L504.069 1105.42L302.382 755.402ZM645.6 1930.9L646.987 1932.92L648.374 1930.9L952.097 1487.43L952.695 1486.56L952.167 1485.64L762.968 1157.3L761.512 1154.77L760.056 1157.3L675.458 1304.1L674.974 1304.94L675.458 1305.78L756.739 1446.83L756.746 1446.85C768.467 1466.83 774.445 1488.39 774.445 1510.77C774.445 1581.02 717.288 1638.15 647.013 1638.15C576.738 1638.15 519.581 1581.02 519.581 1510.77C519.581 1488.37 525.533 1466.83 537.332 1446.72L537.339 1446.71L618.568 1305.76L619.052 1304.92L618.568 1304.08L598.669 1269.55L533.97 1157.3L532.514 1154.77L531.058 1157.3L341.833 1485.64L341.305 1486.56L341.903 1487.43L645.6 1930.9ZM981.695 1439.92L983.028 1442.23L984.537 1440.03L1203.59 1120.16L1204.18 1119.29L1203.65 1118.37L994.505 755.428L993.049 752.901L991.593 755.428L789.905 1105.45L789.421 1106.29L789.905 1107.12L981.695 1439.92Z"/>
        </svg>

        <header>
            <img src="${baseUri}assets/dcvibogota.svg" alt="Devcon Bogota" class="logo">
            <p><b>Personalized Agenda</b></p>
        </header>

        <main>
            <div>
                <p class="title">${agenda.username}</p>
                <p class="date">@ Devcon, Bogotá — Oct, 2022</p>
            </div>
            <img src="${avatar}" alt="${agenda.username}" class="user-icon">
        </main>

        <footer class="multiple">
            <p>Check out my Agenda for Devcon Bogotá <br/>
            and join me in person or virtually for all the best Devcon content I am attending!</p>
        </footer>
    </div>
    </body>
</html>`
}

export function GetHtmlTemplate(session: any, type: string = 'og') {
    // Render custom sessions
    // session = {
    //     title: 'Live Coding Performance',
    //     "track": "Music",
    //     type: 'Music',
    //     "start": 1665684000000,
    //     speakers: [{
    //         "name": "IX Shells",
    //         "avatar": "https://pbs.twimg.com/profile_images/1585299186983047168/Q9oIrWR0_400x400.jpg"
    //     }]
    // }

    const baseUri = GetBaseUri()
    const reduzeTitleSize = session.title.length > 100
    const reduceSpeakerSize = session.speakers.map((i: any) => i.name).join(', ').length > 60

    return `
<html>
    <head>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Inter&display=swap" rel="stylesheet"> 
        ${getStyle(reduzeTitleSize, reduceSpeakerSize, type)}
    </head>
    <body>
    <div class="container ${getTrackId(session.track)} ${type}">
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

        ${getSpeakers(session.speakers.sort((a: any, b: any) => {
        return a.name.localeCompare(b.name)
    }))}
    </div>
    </body>
</html>`
}

function getRandomStyle() {
    const styles = ['cryptoeconomics', 'developer-infrastructure', 'governance',
        'layer-1', 'layer-2', 'global-impact', 'security', 'staking', 'ux-design', 'zkps']
    return styles[Math.floor(Math.random() * styles.length)]
}

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

    if (track === 'Music') return 'cryptoeconomics'
    return ''
}

function getTrackImage(track: string) {
    const baseUri = GetBaseUri()
    if (track === 'Cryptoeconomics') return `${baseUri}assets/tracks/Cryptoeconomics.svg`
    if (track === 'Developer Infrastructure') return `${baseUri}assets/tracks/Developer Infrastructure.svg`
    if (track === 'Governance & Coordination') return `${baseUri}assets/tracks/Governance & Coordination.svg`
    if (track === 'Layer 1 Protocol') return `${baseUri}assets/tracks/Layer 1 Protocol.svg`
    if (track === 'Layer 2s') return `${baseUri}assets/tracks/Layer 2s.svg`
    if (track === 'Opportunity & Global Impact') return `${baseUri}assets/tracks/Opportunity & Global Impact.svg`
    if (track === 'Security') return `${baseUri}assets/tracks/Security.svg`
    if (track === 'Staking & Validator Experience') return `${baseUri}assets/tracks/Staking & Validator Experience.svg`
    if (track === 'UX & Design') return `${baseUri}assets/tracks/UX & Design.svg`
    if (track === 'ZKPs: Privacy, Identity, Infrastructure, & More') return `${baseUri}assets/tracks/ZKPs and Privacy.svg`

    if (track === 'Music') return `${baseUri}/assets/tracks/Activities.png`
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

export function getAvatar(url: string) {
    return url || `${GetBaseUri()}assets/avatar.png`
}

export function getDay(date: number) {
    if (moment(date).format('DD') === '11') return 'Day 1'
    if (moment(date).format('DD') === '12') return 'Day 2'
    if (moment(date).format('DD') === '13') return 'Day 3'
    if (moment(date).format('DD') === '14') return 'Day 4'
}

export function getStyle(reduceTitleSize: boolean = false, reduceSpeakerSize: boolean = false, type: string = 'og') {
    return `
<style>
*,
*::before,
*::after {
font-family: 'Inter', sans-serif;
margin: 0;
padding: 0;
box-sizing: border-box;
color: #000;
font-size: ${type === 'video' ? '1.8' : '1.4'}rem;
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

.video {
padding: 3rem;
}
.video .icon {
top: -220;
left: 1040;
transform: scale(1.5);
}
.video .logo {
width: 500px;
}
.video .avatar {
width: 120px;
height: 120px;
}
.video .track-icon {
width: 440px;
}
.video main {
gap: 48px;
}
.video .session-type {
margin-right: 32px;
}
.video .date {
margin-top: 32px;
}
.video footer,
.video .avatars { 
gap: 32px;
}

.icon {
position: absolute;
top: -580;
left: 400;
z-index: 1;
}
.icon path {
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
font-size: ${reduceTitleSize ? 'smaller' : 'larger'};
font-weight: bold;
}
.date {
margin-top: 16px;
color: #666;
font-size: ${reduceTitleSize ? 'smaller' : 'inherit'};
}
.track-icon {
transform: scale(1.0);
flex-shrink: 0;
}
.user-icon {
flex-shrink: 0;
border-radius: 50%;
width: 255px;
height: 255px;
object-fit: cover;
}

footer {
z-index: 10;
display: flex;
gap: 16px;
}
footer p {
font-size: ${reduceSpeakerSize ? 'smaller' : 'inherit'};
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
