import type { FC, Note } from '@/types'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const NoteItem: FC<Note> = ({ id, title, content, created, updated }) => {
  const {
    t,
    i18n: { resolvedLanguage },
  } = useTranslation('note-item')

  const formatOptions: Intl.DateTimeFormatOptions = { dateStyle: 'full', timeStyle: 'medium' }
  const createdAt = new Date(created).toLocaleString(resolvedLanguage, formatOptions)
  const updatedDate = new Date(updated)
  let noteInfo = `${title.toUpperCase()}\n${t('created')} ${createdAt}`

  if (created !== updated) {
    const updatedAt = updatedDate.toLocaleString(resolvedLanguage, formatOptions)
    noteInfo += `\n${t('updated')} ${updatedAt}`
  }

  return (
    <Link to={id} className='note_item' title={noteInfo}>
      <h3>{title}</h3>
      <p>
        <span>{updatedDate.toLocaleString(resolvedLanguage)}</span>
        {content}
      </p>
    </Link>
  )
}

export default NoteItem
