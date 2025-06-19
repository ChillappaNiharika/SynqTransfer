// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Upload from './pages/Upload';
import Privacy from './pages/Privacy';
import logo from './assets/Logo without text.png';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#0F0F0F] text-white font-sans">
        <nav className="flex justify-between items-center px-6 py-4 bg-[#1A1A1A] shadow-md">
          <NavLink to="/" className="flex items-center gap-2 hover:opacity-90">
            <img src={logo} alt="logo" className="h-8 w-8" />
            <h1 className="text-xl font-bold text-white">SynqTransfer</h1>
          </NavLink>
          <div className="flex gap-4">
            <NavLink to="/" className={({isActive}) => isActive ? 'text-[#FFC93C]' : 'text-white hover:text-[#FFC93C]'}>Dashboard</NavLink>
            <NavLink to="/upload" className={({isActive}) => isActive ? 'text-[#FFC93C]' : 'text-white hover:text-[#FFC93C]'}>Upload</NavLink>
            <NavLink to="/privacy" className={({isActive}) => isActive ? 'text-[#FFC93C]' : 'text-white hover:text-[#FFC93C]'}>Privacy Policy</NavLink>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/privacy" element={<Privacy />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
