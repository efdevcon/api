import dayjs from 'dayjs'

export function GetEventDay(date: Date) {
  const days = ['Day 1', 'Day 2', 'Day 3', 'Day 4']
  const diff = dayjs(date).diff(1665489600000, 'day')
  return days[diff]
}

export function GetRandomStyle() {
  const styles = [
    'cryptoeconomics',
    'developer-infrastructure',
    'governance',
    'layer-1',
    'layer-2',
    'global-impact',
    'security',
    'staking',
    'ux-design',
    'zkps',
  ]

  return styles[Math.floor(Math.random() * styles.length)]
}

export function GetTrackId(track: string) {
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

export function GetTrackImage(baseUri: string, track: string) {
  if (track === 'Cryptoeconomics') return `${baseUri}/static/dc6/tracks/Cryptoeconomics.svg`
  if (track === 'Developer Infrastructure') return `${baseUri}/static/dc6/tracks/Developer Infrastructure.svg`
  if (track === 'Governance & Coordination') return `${baseUri}/static/dc6/tracks/Governance & Coordination.svg`
  if (track === 'Layer 1 Protocol') return `${baseUri}/static/dc6/tracks/Layer 1 Protocol.svg`
  if (track === 'Layer 2s') return `${baseUri}/static/dc6/tracks/Layer 2s.svg`
  if (track === 'Opportunity & Global Impact') return `${baseUri}/static/dc6/tracks/Opportunity & Global Impact.svg`
  if (track === 'Security') return `${baseUri}/static/dc6/tracks/Security.svg`
  if (track === 'Staking & Validator Experience') return `${baseUri}/static/dc6/tracks/Staking & Validator Experience.svg`
  if (track === 'UX & Design') return `${baseUri}/static/dc6/tracks/UX & Design.svg`
  if (track === 'ZKPs: Privacy, Identity, Infrastructure, & More') return `${baseUri}/static/dc6/tracks/ZKPs and Privacy.svg`

  if (track === 'Music') return `${baseUri}/static/dc6/tracks/Activities.png`
  return null
}
