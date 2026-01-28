import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './Message.css'
import Message from './Message.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Message />
  </StrictMode>,
)
