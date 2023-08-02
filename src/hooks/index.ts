import { useContext } from 'react'
import { NoteContext, ThemeContext } from '@/contexts'

/** Utilities for note management */
export const useNotes = () => useContext(NoteContext)!
/** Utilities for theme management */
export const useTheme = () => useContext(ThemeContext)!
