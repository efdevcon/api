import { Speaker } from './speakers'
import { Room } from './venue'

export interface Session {
  id: string // sluggified title
  sourceId: string // same as id if no source is available
  eventId: string
  title: string
  description: string
  track: string
  type: string
  expertise: string
  tags: string[]
  speakers: Speaker[]
  resources?: {
    [key in ResourceTypes]: string
  }
  slot?: Slot
  media?: Media
}

export type SourceTypes = 'youtube' | 'ipfs' | 'swarm'
export type ResourceTypes = 'slides'

export interface Media {
  duration: number
  language: string
  sources: {
    [key in SourceTypes]: {
      id: string
      quality: number
      size: number
    }
  }
}

export interface Slot {
  start: number
  end: number
  length: number
  room: Room // TODO: move to event / room / edition ?!
}
