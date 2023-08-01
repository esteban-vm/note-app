import { useContext } from 'react'
import { NoteContext, ThemeContext } from '@/contexts'

export const useNotes = () => useContext(NoteContext)!
export const useTheme = () => useContext(ThemeContext)!
