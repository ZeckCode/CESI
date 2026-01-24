import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './TeacherClassSchedule.css'
import TeacherClassSchedule from './TeacherClassSchedule.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TeacherClassSchedule />
  </StrictMode>,
)
