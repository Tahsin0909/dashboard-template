import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Toaster } from 'sonner'
import ReduxStoreProvider from './Redux/ReduxProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ReduxStoreProvider>

      <Toaster expand={true} richColors position="top-right" />
      <App />
    </ReduxStoreProvider>
  </StrictMode>,
)
