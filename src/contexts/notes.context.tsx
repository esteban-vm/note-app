import type { FC, ReactNode, Note } from '@/types'
import { createContext } from 'react'
import useLocalStorage from 'use-local-storage'
import uniqid from 'uniqid'

interface INoteContext {
  /** Saved notes */
  notes: Note[]
  /** Retrieves -or not- a saved note based on an id */
  get: (id: string) => Note | undefined
  /** Creates a new note with title and content */
  create: (title: string, content: string) => void
  /** Updates an existing note based on its id */
  update: (id: string, title: string, content: string) => void
  /** Removes an existing note according to its id */
  remove: (id: string) => void
}

export const NoteContext = createContext<INoteContext | null>(null)

export const NoteProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [notes, setNotes] = useLocalStorage<Note[]>('notes', [])
  const { Provider } = NoteContext

  const get = (id: string) => {
    const note = notes.find((note) => note.id === id)
    return note
  }

  const create = (title: string, content: string) => {
    const created = new Date().toISOString()
    const note: Note = { id: uniqid('note-'), title, content, created, updated: created }
    setNotes(notes.concat(note))
  }

  const update = (id: string, title: string, content: string) => {
    const updated = new Date().toISOString()
    setNotes(notes.map((note) => (note.id === id ? { ...note, title, content, updated } : note)))
  }

  const remove = (id: string) => {
    setNotes(notes.filter((note) => note.id !== id))
  }

  return <Provider value={{ notes, get, create, update, remove }}>{children}</Provider>
}
