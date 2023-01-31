export interface Event {
  id: string
  edition: number
  title: string
  description: string
  location: string
  startDate: string
  endDate: string
  media: string[]
  urls: { title: string; url: string }[]
}
