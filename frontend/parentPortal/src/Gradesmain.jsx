import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './Grades.css'
import Grades from './Grades.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Grades />
  </StrictMode>,
)
