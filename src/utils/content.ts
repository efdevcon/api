import createMD from 'markdown-it'
const md = createMD({ html: true })

export function toHtml(markdown: string, slice?: number) {
  let raw = markdown
  if (!raw) return ''

  if (slice && raw.length > 255) raw = `${raw.slice(0, slice)}...`

  return md.render(markdown)
}
