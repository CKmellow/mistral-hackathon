import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import PamojaHubOnboarding from './landing-page.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PamojaHubOnboarding />
  </StrictMode>,
)
