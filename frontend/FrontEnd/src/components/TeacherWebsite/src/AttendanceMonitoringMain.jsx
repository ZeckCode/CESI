import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './AttendanceMonitoring.css'
import AttendanceMonitoring from './AttendanceMonitoring.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AttendanceMonitoring />
  </StrictMode>,
)
