import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PamojaHubOnboarding from './landing page';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PamojaHubOnboarding />} />
      </Routes>
    </Router>
  );
}

export default App;
