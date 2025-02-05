import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Ragister';
import UserDashboard from './pages/UserDashboard';
import Header from './components/Header';
import Footer from './components/Footer';
import JobDetails from "./pages/JobDetails";

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/userdashboard" element={<UserDashboard />} />
        <Route path="/jobs/:id" element={<JobDetails />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;