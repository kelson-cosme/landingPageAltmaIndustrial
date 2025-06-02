import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { NavbarDemo } from './components/Navbar'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <NavbarDemo/>
    <App />
  </StrictMode>,
)
