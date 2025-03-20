import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BriefcaseIcon, Menu, X, UserIcon, Moon, Sun } from "lucide-react";

const Header = ({ darkMode, toggleDarkMode }) => {
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
    <header className={`${darkMode ? 'bg-gray-900' : 'bg-blue-50'} px-6 py-4 transition-all duration-300 shadow-md`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/home" className="flex items-center gap-2">
          <BriefcaseIcon className={`h-8 w-8 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
          <span className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>JOB FUSION</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-12.5">
          <Link to="/home" className={`${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-blue-600'} transition-colors duration-200`}>
            Home
          </Link>
          <Link to="/Companies" className={`${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-blue-600'} transition-colors duration-200`}>
            Companies
          </Link>
          <Link to="/resume" className={`${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-blue-600'} transition-colors duration-200`}>
            Resume
          </Link>
          <Link to="/ats-cheking" className={`${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-blue-600'} transition-colors duration-200`}>
            ATS Checking
          </Link>
          <Link to="/successstories" className={`${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-blue-600'} transition-colors duration-200`}>
            Success Stories
          </Link>
        </nav>

        {/* User Profile, Dark Mode Toggle & Mobile Menu */}
        <div className="flex items-center gap-4">
          {/* Dark Mode Toggle */}
          <button 
            onClick={toggleDarkMode} 
            className={`p-2 rounded-md ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} transition-all duration-300`}
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {darkMode ? (
              <Sun className="w-6 h-6 text-yellow-400" />
            ) : (
              <Moon className="w-6 h-6 text-gray-800" />
            )}
          </button>

          {userEmail ? (
            <div className="relative">
              <button onClick={() => setIsProfileOpen(!isProfileOpen)}>
                <UserIcon className={`w-8 h-8 ${darkMode ? 'text-white' : 'text-blue-600'} cursor-pointer`} />
              </button>
              {isProfileOpen && (
                <div className={`absolute right-0 mt-2 w-40 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md rounded-md z-50`}>
                  <Link to="/userdashboard" className={`block px-4 py-2 ${darkMode ? 'text-white hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`}>
                    Dashboard
                  </Link>
                  <button onClick={handleLogout} className={`w-full text-left px-4 py-2 ${darkMode ? 'text-red-400 hover:bg-gray-700' : 'text-red-500 hover:bg-gray-100'}`}>
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className={`hidden md:block ${darkMode ? 'bg-blue-500 hover:bg-blue-600' : 'bg-blue-600 hover:bg-blue-700'} text-white px-6 py-2 rounded-md transition-colors duration-200`}>
              Sign In
            </Link>
          )}

          {/* Mobile Menu Button */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden">
            {isMenuOpen ? 
              <X className={`w-7 h-7 ${darkMode ? 'text-white' : 'text-blue-600'}`} /> : 
              <Menu className={`w-7 h-7 ${darkMode ? 'text-white' : 'text-blue-600'}`} />
            }
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className={`md:hidden flex flex-col ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md absolute top-16 left-0 w-full p-4 space-y-4 z-50`}>
          <Link 
            to="/home" 
            className={`${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-blue-600'}`} 
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          
          <Link 
            to="/Companies" 
            className={`${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-blue-600'}`} 
            onClick={() => setIsMenuOpen(false)}
          >
            Companies
          </Link>
          <Link 
            to="/resume" 
            className={`${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-blue-600'}`} 
            onClick={() => setIsMenuOpen(false)}
          >
            Resume
          </Link>
          <Link 
            to="/ats-cheking" 
            className={`${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-blue-600'}`} 
            onClick={() => setIsMenuOpen(false)}
          >
            ATS Checking
          </Link>
          <Link 
            to="/successstories" 
            className={`${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-blue-600'}`} 
            onClick={() => setIsMenuOpen(false)}
          >
            Success Stories
          </Link>

          {!userEmail && (
            <Link to="/login" className={`${darkMode ? 'bg-blue-500 hover:bg-blue-600' : 'bg-blue-600 hover:bg-blue-700'} text-white px-6 py-2 rounded-md inline-block w-fit`}>
              Sign In
            </Link>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
