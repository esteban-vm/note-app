import Filter from 'bad-words-es'

const filter = new Filter()
export const isClean = (value: string) => !filter.isProfane(value)

const options: Intl.DateTimeFormatOptions = { dateStyle: 'full', timeStyle: 'medium' }
export const formatDate = (date: string, locale?: string, withOptions = true) => {
  return new Date(date).toLocaleString(locale, withOptions ? options : undefined)
}
