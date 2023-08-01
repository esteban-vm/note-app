import type { FC, ReactNode, Theme } from '@/types'
import { createContext } from 'react'
import useLocalStorage from 'use-local-storage'

interface ThemeContextValue {
  theme: Theme
  toggle: () => void
}

export const ThemeContext = createContext<ThemeContextValue | null>(null)

export const ThemeProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const isDark = matchMedia('(prefers-color-scheme: dark)').matches
  const [theme, setTheme] = useLocalStorage<Theme>('theme', isDark ? 'dark' : 'light')
  const { Provider } = ThemeContext

  const toggle = () => {
    setTheme((previous) => (previous === 'dark' ? 'light' : 'dark'))
  }

  return <Provider value={{ theme, toggle }}>{children}</Provider>
}
