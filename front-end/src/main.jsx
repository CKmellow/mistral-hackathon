import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import PamojaHubOnboarding from './landing-page.jsx'
import CommunityPage from './Community.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CommunityPage />
  </StrictMode>,
)
