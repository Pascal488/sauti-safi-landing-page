import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { StrapiProvider } from './contexts/StrapiContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <StrapiProvider>
        <App />
      </StrapiProvider>
    </BrowserRouter>
  </StrictMode>,
)
