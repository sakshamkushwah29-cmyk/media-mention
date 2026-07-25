import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import CaseStudy from './CaseStudy';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/royal-empire" element={<CaseStudy />} />
        <Route path="/shabana-bakery" element={<CaseStudy />} />
        <Route path="/diet" element={<CaseStudy />} />
        <Route path="/double-decker" element={<CaseStudy />} />
        <Route path="/ohno" element={<CaseStudy />} />
        <Route path="/jagsons" element={<CaseStudy />} />
      </Routes>
    </Router>
  );
}
