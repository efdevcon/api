import { defaultSlugify } from 'utils/content'
import { CreateBlockie } from 'utils/account'
import { PRETALX_CONFIG } from 'utils/config'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

const cache = new Map()

export async function GetRooms() {
  const rooms = await exhaustResource(`/events/${PRETALX_CONFIG.PRETALX_EVENT_NAME}/rooms`)
  return rooms.map((i: any) => {
    return {
      id: `${PRETALX_CONFIG.PRETALX_EVENT_NAME}_${i.name?.en ? defaultSlugify(i.name?.en) : String(i.id)}`,
      name: i.name?.en ?? '',
      description: i.description?.en ?? '',
      info: i.speaker_info?.en ?? '',
      capacity: i.capacity,
    }
  })
}

export async function GetSpeakers() {
  const speakersData = await exhaustResource(`/events/${PRETALX_CONFIG.PRETALX_EVENT_NAME}/speakers`)
  const speakers = speakersData.map((i: any) => {
    const twitter = i.answers?.find((i: any) => i.question.id === PRETALX_CONFIG.PRETALX_QUESTIONS_TWITTER)?.answer
    const github = i.answers?.find((i: any) => i.question.id === PRETALX_CONFIG.PRETALX_QUESTIONS_GITHUB)?.answer

    let speaker: any = {
      id: defaultSlugify(i.name),
      sourceId: i.code,
      name: i.name,
      avatar: i.avatar ?? CreateBlockie(i.name),
      description: i.biography ?? '',
    }

    if (twitter) speaker.twitter = twitter
    if (github) speaker.github = github

    return speaker
  })

  return speakers
}

export async function GetSessions() {
  const talks = await exhaustResource(`/events/${PRETALX_CONFIG.PRETALX_EVENT_NAME}/talks`)

  const sessions = talks.map((i: any) => {
    const expertise = i.answers?.find((i: any) => i.question.id === PRETALX_CONFIG.PRETALX_QUESTIONS_EXPERTISE)?.answer as string
    const tagsAnswer = i.answers?.find((i: any) => i.question.id === PRETALX_CONFIG.PRETALX_QUESTIONS_TAGS)?.answer as string

    return {
      id: `${PRETALX_CONFIG.PRETALX_EVENT_NAME}_${defaultSlugify(i.title)}`,
      sourceId: i.code,
      title: i.title,
      description: i.description ?? i.abstract,
      track: i.track?.en ?? '',
      type: i.submission_type?.en ?? '',
      expertise: expertise ?? '',
      tags: tagsAnswer
        ? tagsAnswer.includes(',')
          ? tagsAnswer.split(',').map((i) => i.replace(/['"]+/g, '').trim())
          : tagsAnswer.split(' ').map((i) => i.replace(/['"]+/g, '').trim())
        : [],
      language: 'en',
      speakers: i.speakers.map((i: any) => i.code),
      slot_start: dayjs.utc(i.slot.start).toDate(),
      slot_end: dayjs.utc(i.slot.end).toDate(),
      slot_roomId: i.slot?.room ? `${PRETALX_CONFIG.PRETALX_EVENT_NAME}_${defaultSlugify(i.slot.room.en)}` : null,
    }
  })

  return sessions
}

async function exhaustResource(slug: string, limit = PRETALX_CONFIG.DEFAULT_LIMIT, offset = 0, results = [] as any): Promise<any> {
  return get(`${slug}${slug.includes('?') ? '&' : '?'}limit=${limit}&offset=${offset}`).then((data: any) => {
    results.push(data.results)
    if (data.next) {
      console.log('GET', slug, 'TOTAL COUNT', data.count)
      return exhaustResource(slug, limit, offset + limit, results)
    } else {
      console.log('Return results', slug, results.flat().length)
      return results.flat()
    }
  })
}

async function get(slug: string) {
  if (cache.has(slug)) {
    return cache.get(slug)
  }

  const response = await fetch(`${PRETALX_CONFIG.PRETALX_BASE_URI}${slug}`, {
    headers: {
      Authorization: `Token ${PRETALX_CONFIG.PRETALX_API_KEY}`,
    },
  })

  const data = await response.json()
  cache.set(slug, data)
  return data
}
