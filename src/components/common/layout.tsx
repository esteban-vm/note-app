import type { FC, ReactNode } from '@/types'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useTheme } from '@/hooks'

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  const { pathname } = useLocation()
  const { theme } = useTheme()

  useEffect(() => scrollTo(0, 0), [pathname])

  return (
    <div className={`layout ${theme}`}>
      <main>
        <header>
          <h1>Note App</h1>
        </header>
        {children}
      </main>
    </div>
  )
}

export default Layout
