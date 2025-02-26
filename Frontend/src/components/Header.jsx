import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BriefcaseIcon, Menu, X, UserIcon } from "lucide-react";

const Header = () => {
  const [userEmail, setUserEmail] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail");
    if (storedEmail) {
      setUserEmail(storedEmail);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    setUserEmail(null);
    setIsProfileOpen(false);
  };

  return (
    <header className="bg-blue-50 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/home" className="flex items-center gap-2">
          <BriefcaseIcon className="h-8 w-8 text-blue-600" />
          <span className="text-xl font-bold">JOB FUSION</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-12.5">
          <Link to="/home" className="text-gray-700 hover:text-blue-600">
            Home
          </Link>
          <Link to="/Companies" className="text-gray-700 hover:text-blue-600">
            Companies
          </Link>
          <Link to="/resume" className="text-gray-700 hover:text-blue-600">
            Resume
          </Link>
          <Link to="/ats-cheking" className="text-gray-700 hover:text-blue-600">
            ATS_Cheking
          </Link>
        </nav>

        {/* User Profile & Mobile Menu Button */}
        <div className="flex items-center gap-4">
          {userEmail ? (
            <div className="relative">
              {/* User Profile Icon */}
              <button onClick={() => setIsProfileOpen(!isProfileOpen)}>
                <UserIcon className="w-8 h-8 text-blue-600 cursor-pointer" />
              </button>
              
              {/* Profile Dropdown (Dashboard & Logout) */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white shadow-md rounded-md">
                  <Link
                    to="/userdashboard"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="hidden md:block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">
              Sign In
            </Link>
          )}

          {/* Mobile Menu Button */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden">
            {isMenuOpen ? <X className="w-7 h-7 text-blue-600" /> : <Menu className="w-7 h-7 text-blue-600" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden flex flex-col bg-white shadow-md absolute top-16 left-0 w-full p-4 space-y-4">
          <Link to="/home" className="text-gray-700 hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>
            Home
          </Link>
          <Link to="/Companies" className="text-gray-700 hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>
            Companies
          </Link>
          <Link to="/resume" className="text-gray-700 hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>
            Resume
          </Link>
          <Link to="/ats-cheking" className="text-gray-700 hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>
          ATS_Cheking
          </Link>

          {/* Sign In button in Mobile (only for guests) */}
          {!userEmail && (
            <Link to="/login" className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">
              Sign In
            </Link>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
