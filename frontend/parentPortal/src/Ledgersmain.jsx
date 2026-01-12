import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './Ledgers.css'
import Ledgers from './Ledgers.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Ledgers />
  </StrictMode>,
)
