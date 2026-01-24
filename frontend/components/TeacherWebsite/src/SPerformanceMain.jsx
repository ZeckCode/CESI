import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './SPerformance.css'
import SPerformance from './SPerformance.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SPerformance />
  </StrictMode>,
)
