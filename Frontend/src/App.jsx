import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Ragister';
import UserDashboard from './pages/UserDashboard';
import JobDetails from "./pages/JobDetails";
import Companies from "./pages/Companies";
import FirstPage from "./pages/FirstPage";
import Header from './components/Header';
import Footer from './components/Footer';
import ResumePage from './pages/ResumePage';
import ATS from './pages/Ats';
import Templet01 from "./pages/Templets_01";
import Template02 from './pages/Templets_02';
import Template03 from './pages/Templets_03';

function App() {
  const location = useLocation(); // Get current route

  // Pages that should not have Header & Footer
  const hideHeaderFooter = ["/", "/login", "/register"].includes(location.pathname);

  return (
    <div className="min-h-screen bg-white">
      {/* Show Navbar & Footer only on Home and other main pages */}
      {!hideHeaderFooter && <Header />}

      <Routes>
        {/* Landing Page (First Page) */}
        <Route path="/" element={<FirstPage />} />

        {/* Authentication Pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Main Website After Login */}
        <Route path="/home" element={<Home />} />
        <Route path="/companies" element={<Companies />} />
        <Route path="/userdashboard" element={<UserDashboard />} />
        <Route path="/jobs/:id" element={<JobDetails />} />
        <Route path="/resume" element={<ResumePage />} />
        <Route path="/resume/template01" element={<Templet01 />} />
        <Route path='/resume/template02' element={<Template02 />} />
        <Route path='/resume/template03'element={<Template03 />} />
        <Route path='/ats-cheking' element={<ATS/>}/>

        {/* Redirect any unknown route to FirstPage */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      {/* Show Footer only on Home and other main pages */}
,      {!hideHeaderFooter && <Footer />}
    </div>
  );
}

export default App;
