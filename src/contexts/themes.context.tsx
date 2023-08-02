import type { FC, ReactNode, Theme } from '@/types'
import { createContext } from 'react'
import useLocalStorage from 'use-local-storage'

interface IThemeContext {
  /** Theme saved in local storage */
  theme: Theme
  /** Changes the theme between light and dark */
  toggle: () => void
}

export const ThemeContext = createContext<IThemeContext | null>(null)

export const ThemeProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const isDark = matchMedia('(prefers-color-scheme: dark)').matches
  const [theme, setTheme] = useLocalStorage<Theme>('theme', isDark ? 'dark' : 'light')
  const { Provider } = ThemeContext

  const toggle = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'))
  }

  return <Provider value={{ theme, toggle }}>{children}</Provider>
}
