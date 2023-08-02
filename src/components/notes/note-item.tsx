import type { FC, Note } from '@/types'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { formatDate } from '@/utils'

const NoteItem: FC<Note> = ({ id, title, content, created, updated }) => {
  const {
    t,
    i18n: { resolvedLanguage },
  } = useTranslation('note-item')

  const createdAt = formatDate(created, resolvedLanguage)
  const updatedAt = formatDate(updated, resolvedLanguage, false)
  let info = `${title.toUpperCase()}\n${t('created')} ${createdAt}`

  if (created !== updated) {
    const updatedAt = formatDate(updated, resolvedLanguage)
    info += `\n${t('updated')} ${updatedAt}`
  }

  return (
    <Link to={id} className='note_item' title={info}>
      <h3>{title}</h3>
      <p>
        <span>{updatedAt}</span>
        {content}
      </p>
    </Link>
  )
}

export default NoteItem
