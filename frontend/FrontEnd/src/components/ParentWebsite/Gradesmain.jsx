import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
<<<<<<< Updated upstream:frontend/main.jsx
import './index.css'
import App from './App.jsx'
=======
import './Grades.css'
import Grades from './Grades.jsx'
>>>>>>> Stashed changes:frontend/FrontEnd/src/components/ParentWebsite/Gradesmain.jsx

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Grades />
  </StrictMode>,
)
