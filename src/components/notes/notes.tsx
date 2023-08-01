import type { FC } from '@/types'
import { useRoutes } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useNotes } from '@/hooks'
import NoteList from './note-list'
import NoteDetail from './note-detail'

const Notes: FC = () => {
  const { notes } = useNotes()
  const { t } = useTranslation()

  const routes = useRoutes([
    {
      path: '/',
      children: [
        { index: true, element: <NoteList /> },
        { path: 'new', element: <NoteDetail isNew /> },
        { path: ':id', element: <NoteDetail /> },
      ],
    },
  ])

  return (
    <section className='notes' aria-labelledby='app_title'>
      <header>
        <h2 id='app_title'>&#9782; {t('heading')}</h2>
        <p>{notes.length}</p>
      </header>
      {routes}
    </section>
  )
}

export default Notes
