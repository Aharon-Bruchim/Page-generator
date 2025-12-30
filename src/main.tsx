import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.tsx'
import { DocumentView } from './pages/DocumentView.tsx'
import { DocumentProvider } from './context/DocumentContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <DocumentProvider>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/document/:id" element={<DocumentView />} />
        </Routes>
      </DocumentProvider>
    </BrowserRouter>
  </StrictMode>,
)
