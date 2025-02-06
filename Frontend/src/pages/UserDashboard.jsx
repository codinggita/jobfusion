import { useState, useEffect } from "react";
import { User, FileText, Menu, X, Database } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BookmarkButton from "../components/SaveBtn";

const JobCardSaved = ({ job, onToggle }) => {
  const navigate = useNavigate();
  return (
    <div
      className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer relative"
      onClick={() => navigate(`/jobs/${job.id}`, { state: { job } })}
    >
      <div className="absolute top-4 right-4">
        <BookmarkButton jobId={job.id} onToggle={onToggle} />
      </div>
      <div className="flex flex-col">
        <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
          <Database className="text-white" />
        </div>
        <h3 className="font-semibold text-lg mb-2">{job.title}</h3>
      </div>
    </div>
  );
};

const UserDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user profile data for sidebar (unchanged)
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedEmail = localStorage.getItem("userEmail");
        if (!storedEmail) {
          setError("No email found in local storage.");
          setLoading(false);
          return;
        }
        const response = await axios.get(`http://localhost:3000/api/users/profile/${storedEmail}`);
        if (response.data.success) {
          setUserData(response.data.data);
        } else {
          setError("Failed to fetch user data.");
        }
      } catch (err) {
        setError("Error fetching user data.");
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  // Function to load saved job IDs from localStorage and fetch job details by ID
  const loadSavedJobs = async () => {
    const savedJobIds = JSON.parse(localStorage.getItem("savedJobIds")) || [];
    if (savedJobIds.length === 0) {
      setSavedJobs([]);
      return;
    }
    try {
      // Fetch job details for each saved job ID. Adjust the endpoint as needed.
      const jobsData = await Promise.all(
        savedJobIds.map(async (jobId) => {
          const response = await axios.get(`http://localhost:3000/api/jobs/${jobId}`);
          // Assume the API returns the job details as response.data
          return response.data;
        })
      );
      setSavedJobs(jobsData);
    } catch (err) {
      setError("Error fetching saved job details.");
    }
  };

  // Load saved jobs when the component mounts or when onToggle triggers a refresh
  useEffect(() => {
    loadSavedJobs();
  }, []);

  return (
    <div className="flex-1 flex">
      {/* Mobile Toggle Button */}
      <div className="fixed top-20 right-3 sm:top-20 sm:right-4 z-50 md:hidden">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-1.5 sm:p-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors shadow-lg"
        >
          {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Desktop Left Sidebar (unchanged) */}
      <div className="hidden md:block w-64 sm:w-72 bg-blue-500 p-4 sm:p-6 md:p-8 overflow-y-auto scrollbar-hide">
        {loading && <p className="text-gray-600">Loading...</p>}
        {userData && (
          <div className="bg-blue-400/30 rounded-xl p-4 sm:p-6 h-[35vh] flex flex-col justify-center mt-8 sm:mt-10">
            <div className="w-24 h-24 sm:w-28 sm:h-28 bg-blue-300 rounded-full mx-auto mb-4 sm:mb-6 flex items-center justify-center">
              <User size={40} className="text-blue-600" />
            </div>
            <div className="text-white text-center">
              <h2 className="text-xl sm:text-2xl font-semibold mb-1">{userData.username}</h2>
              <p className="text-base sm:text-lg text-blue-200 mb-1">{userData.experienceLevel}</p>
              <p className="text-sm sm:text-base text-blue-100">{userData.email}</p>
            </div>
          </div>
        )}

        {/* Resume Box (unchanged) */}
        <div className="mt-4 sm:mt-6 md:mt-8 bg-blue-400/30 rounded-xl p-4 sm:p-6 h-[calc(65vh-2rem)]">
          <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 bg-blue-300 rounded-full mx-auto mb-4 sm:mb-6 flex items-center justify-center">
            <FileText size={40} className="text-blue-600" />
          </div>
          <div className="grid grid-cols-3 gap-2 sm:gap-3 mt-4 sm:mt-6">
            {[1, 2, 3].map((_, i) => (
              <div
                key={i}
                className="aspect-[3/4] bg-blue-300 rounded-lg hover:bg-blue-200 transition-colors cursor-pointer"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Right Sidebar (unchanged) */}
      <div
        className={`fixed right-0 top-16 w-64 sm:w-72 h-[calc(100vh-4rem)] bg-blue-500 p-4 sm:p-6 transform transition-transform duration-300 ease-in-out z-40 md:hidden overflow-y-auto scrollbar-hide
          ${isSidebarOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {userData && (
          <div className="bg-blue-400/30 rounded-xl p-4 sm:p-6 h-[35vh] flex flex-col justify-center mt-8 sm:mt-10">
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-blue-300 rounded-full mx-auto mb-3 sm:mb-5 flex items-center justify-center">
              <User size={35} className="text-blue-600" />
            </div>
            <div className="text-white text-center">
              <h2 className="text-lg sm:text-xl font-semibold mb-1">{userData.username}</h2>
              <p className="text-sm sm:text-base text-blue-200 mb-1">{userData.experienceLevel}</p>
              <p className="text-xs sm:text-sm text-blue-100">{userData.email}</p>
            </div>
          </div>
        )}

        <div className="mt-4 sm:mt-6 bg-blue-400/30 rounded-xl p-4 sm:p-6 h-[calc(65vh-6rem)]">
          <div className="w-24 h-24 sm:w-28 sm:h-28 bg-blue-300 rounded-full mx-auto mb-4 sm:mb-6 flex items-center justify-center">
            <FileText size={40} className="text-blue-600" />
          </div>
          <div className="grid grid-cols-3 gap-2 sm:gap-3 mt-4 sm:mt-6">
            {[1, 2, 3].map((_, i) => (
              <div
                key={i}
                className="aspect-[3/4] bg-blue-300 rounded-lg hover:bg-blue-200 transition-colors cursor-pointer"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Main Content – Saved Jobs Section */}
      <div className="flex-1 p-3 sm:p-4 md:p-6 lg:p-8 overflow-y-auto scrollbar-hide">
        <div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 bg-blue-100 inline-block px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg">
            Saved Jobs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedJobs.length > 0 ? (
              savedJobs.map((job) => (
                <JobCardSaved key={job.id} job={job} onToggle={loadSavedJobs} />
              ))
            ) : (
              <p className="text-gray-500">No saved jobs yet.</p>
            )}
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default UserDashboard;
