export interface Playlist {
  id: string
  title: string
  description: string
  imageUrl?: string
  categories: Array<string>
  curators: Array<string>
  sessions: []
}
