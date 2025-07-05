import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import PamojaHubOnboarding from './landing-page.jsx'
import CommunityPage from './Community.jsx'
import PamojaDashboard from './Dashboard.jsx'
import Signup from './signup.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PamojaHubOnboarding/>
  </StrictMode>,
)
