export interface Event {
  id: string
  number: number
  title: string
  description: string
  location: string
  startDate: string
  endDate: string
  media: string[]
  urls: { title: string; url: string }[]
}
