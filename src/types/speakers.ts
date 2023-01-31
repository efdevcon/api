export interface Speaker {
  id: string // sluggified name
  sourceId: string // same as id if no source is available
  name: string
  description?: string
  twitter?: string
  avatar?: string
}
