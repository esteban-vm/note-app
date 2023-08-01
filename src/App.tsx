import type { FC } from '@/types'
import { Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Layout, Loader, Notes } from '@/components'
import { NoteProvider, ThemeProvider } from '@/contexts'
import '@/styles/index.css'

const App: FC = () => {
  return (
    <Router>
      <ThemeProvider>
        <NoteProvider>
          <Layout>
            <Suspense fallback={<Loader />}>
              <Routes>
                <Route path='/*' element={<Notes />} />
                <Route path='*' element={<Navigate to='/' />} />
              </Routes>
            </Suspense>
          </Layout>
        </NoteProvider>
      </ThemeProvider>
    </Router>
  )
}

export default App
