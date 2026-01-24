import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './Students.css'
import Students from './Students.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Students />
  </StrictMode>,
)
