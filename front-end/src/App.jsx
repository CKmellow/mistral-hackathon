import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import PamojaHubOnboarding from './landing-page'
import PamojaDashboard from './HomeDashboard'
import ChatPage from './ChatPage.jsx'
import CommunityPage from './Community'
import AdminPage from './AdminPage'
import ResourceSkillPage from './Resourceskill'
import Navbar from './Navbar'
import './App.css'

function App() {
  return (
    <Router>
      <Navbar />
      <div className="pt-16"> {/* To prevent navbar from overlapping content */}
        <Routes>
          <Route path="/" element={<PamojaHubOnboarding />} />
          <Route path="/home" element={<PamojaDashboard />} />
          <Route path="/Community" element={<CommunityPage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/AdminPage" element={<AdminPage />} />
          <Route path="/ResourceSkillPage" element={<ResourceSkillPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App

