import 'i18next'
import type NotesNS from '../../public/locales/en/notes.json'
import type noteDetailNS from '../../public/locales/en/note-detail.json'
import type noteListNS from '../../public/locales/en/note-list.json'
import type noteItemNS from '../../public/locales/en/note-item.json'

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'notes'
    resources: {
      notes: typeof NotesNS
      'note-detail': typeof noteDetailNS
      'note-list': typeof noteListNS
      'note-item': typeof noteItemNS
    }
  }
}
