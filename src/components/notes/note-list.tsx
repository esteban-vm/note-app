import type { FC } from '@/types'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { FaPlus, FaGlobe, FaSun, FaMoon } from 'react-icons/fa6'
import { useNotes, useTheme } from '@/hooks'
import NoteItem from './note-item'

const NoteList: FC = () => {
  const { notes } = useNotes()
  const { theme, toggle: toggleTheme } = useTheme()

  const {
    t,
    i18n: { changeLanguage, resolvedLanguage },
  } = useTranslation('note-list')

  const toggleLanguage = async () => {
    await changeLanguage(resolvedLanguage === 'en' ? 'es' : 'en')
  }

  return (
    <div className='note_list'>
      {notes.map((note) => (
        <NoteItem key={note.id} {...note} />
      ))}
      <button
        type='button'
        className='floating_button'
        title={t('buttons.theme')}
        data-key='theme'
        onClick={toggleTheme}
      >
        {theme === 'dark' ? <FaSun /> : <FaMoon />}
      </button>
      <button
        type='button'
        className='floating_button'
        title={t('buttons.language')}
        data-key='language'
        onClick={toggleLanguage}
      >
        <FaGlobe />
      </button>
      <Link to='/new' className='floating_button' title={t('buttons.add')} data-key='new_note'>
        <FaPlus />
      </Link>
    </div>
  )
}

export default NoteList
