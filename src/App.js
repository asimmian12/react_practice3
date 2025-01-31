import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import Map from './pages/Map';
import Dashboard from './pages/dashboard/Dashboard';
import Account from './pages/dashboard/Account';
import Games from './pages/dashboard/Games';
import Rotate from './pages/interactive/Rotate';
import Drawing from './pages/interactive/Drawing';
import SlackIntro from './animata/SlackIntro';
import Appointment from './pages/Appointment';

function App() {

  // State to manage the logged-in status
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // On first load, check for token in localStorage
  useEffect(() => {
    // Check if there's a valid token in localStorage
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true); // If token exists, user is logged in
    }
  }, []); // Only run once on component mount

  const handleLogout = () => {
    // Remove token and user data from localStorage on logout
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false); // Update state to reflect logout
  };

  return (
    <>
      <div className="App">
        <Router>
          <main className={`${isLoggedIn ? "flex" : ""}`} >
          <Navigation isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
          
          <Routes>
            <Route path="/" element={<Home />} />
            {/* Redirect to Dashboard if already logged in */}
            <Route path="/login" element={isLoggedIn ? <Navigate to="/dashboard" /> : <Login setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/register" element={isLoggedIn ? <Navigate to="/dashboard" /> : <Register />} />
            {/* Protected routes */}
            <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />} />
            <Route path="/account" element={isLoggedIn ? <Account /> : <Navigate to="/login" />} />
            <Route path="/games" element={isLoggedIn ? <Games /> : <Navigate to="/login" />} />
            <Route path="/map" element={<Map />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/appointment" element={<Appointment />} />
            <Route path="/rotate" element={<Rotate />} />
            <Route path="/drawing" element={<Drawing />} />
            <Route path="/intro" element={<SlackIntro />} />

          </Routes>
          </main>
        </Router>
      </div>
    </>
  );
}

export default App;
