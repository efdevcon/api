export interface Venue {
  id: string
  name: string
  description: string
  address: string
  website: string
  directions: string
  rooms: Room[]
}

export interface Room {
  id: string
  name: string
  description: string
  info: string
  capacity?: number
  // TODO: Add livestreaming info
}
