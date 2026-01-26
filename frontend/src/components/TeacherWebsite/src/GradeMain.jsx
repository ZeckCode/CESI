import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './Grade.css'
import Grade from './Grade.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Grade />
  </StrictMode>,
)
