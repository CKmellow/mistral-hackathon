import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import PamojaHubOnboarding from './landing-page'
import PamojaDashboard from './HomeDashboard'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PamojaHubOnboarding />} />
        <Route path="/home" element={<PamojaDashboard />} />
        {/* Add more routes for /circle, /map, /emergency as you build them */}
      </Routes>
    </Router>
  )
}

export default App
