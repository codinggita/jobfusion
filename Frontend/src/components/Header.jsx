import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BriefcaseIcon } from 'lucide-react';

const Header = () => {
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    const storedEmail = localStorage.getItem('userEmail');
    if (storedEmail) {
      setUserEmail(storedEmail);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token
    localStorage.removeItem('userEmail'); // Remove email
    setUserEmail(null);
  };

  return (
    <header className="bg-blue-50 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <BriefcaseIcon className="h-8 w-8 text-blue-600" />
          <span className="text-xl font-bold">JOB FUSION</span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-gray-700 hover:text-blue-600">Companies</Link>
          <Link to="/" className="text-gray-700 hover:text-blue-600">Resume</Link>
          <Link to="/" className="text-gray-700 hover:text-blue-600">Trending Jobs</Link>
        </nav>

        {userEmail ? (
          <div className="flex items-center gap-4">
            <Link 
              to="/userdashboard" 
              className="text-gray-700 font-medium hover:text-blue-600"
            >
              {userEmail}
            </Link>
            <button 
              onClick={handleLogout} 
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link 
            to="/login" 
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
          >
            Sign In
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
