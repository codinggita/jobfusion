import { useState, useEffect } from "react";
import { Menu, X, Database, User, FileText, Upload, Download, Trash2 } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BookmarkButton from "../components/SaveBtn";

const JobCard = ({ job, onToggle }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer relative">
      <div className="absolute top-4 right-4">
        <BookmarkButton job={job} onToggle={onToggle} />
      </div>
      <div onClick={() => navigate(`/jobs/${job.id}`, { state: { job } })} className="flex flex-col">
        <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
          <Database className="text-white" />
        </div>
        <h3 className="font-semibold text-lg mb-2">{job.title}</h3>
        <p className="text-sm text-gray-600 mb-2">{job.company.display_name}</p>
        <p className="text-sm text-gray-500">{job.location.display_name}</p>
      </div>
    </div>
  );
};

const ResumeCard = ({ resume }) => (
  <div className="bg-white p-4 rounded-lg shadow-md mb-4 flex justify-between items-center hover:shadow-lg transition-shadow">
    <div className="flex items-center space-x-3 min-w-0 flex-1">
      <div className="flex-shrink-0 w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
        <FileText className="text-blue-500" size={24} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="font-medium text-gray-800 truncate" title={resume.name}>
          {resume.name}
        </p>
        <p className="text-sm text-gray-500">{resume.date}</p>
      </div>
    </div>
    <div className="flex space-x-2 flex-shrink-0 ml-4">
      <button className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors">
        <Download size={18} />
      </button>
      <button className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
        <Trash2 size={18} />
      </button>
    </div>
  </div>
);

const UserDashboard = () => {
  const [userData, setUserData] = useState(null);
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mock resume data
  const resumes = [
    { id: 1, name: "Software_Developer_Resume_With_Very_Long_Name_2024_Updated_Version_Final.pdf", date: "Mar 15, 2024" },
    { id: 2, name: "Frontend_Developer_Resume_Portfolio_Projects_Experience_2024.pdf", date: "Mar 10, 2024" },
    { id: 3, name: "Technical_CV_Full_Stack_Developer_Position.pdf", date: "Mar 5, 2024" },
  ];

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedEmail = localStorage.getItem("userEmail");
        if (!storedEmail) {
          setError("No email found in local storage.");
          setLoading(false);
          return;
        }
        const response = await axios.get(`https://jobfusion.onrender.com/api/users/profile/${storedEmail}`);
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

  const loadSavedJobs = async () => {
    try {
      const storedEmail = localStorage.getItem("userEmail");
      if (!storedEmail) {
        setError("No email found in local storage.");
        return;
      }
      const response = await axios.get(`https://jobfusion.onrender.com/api/jobs/saved/${storedEmail}`);
      if (response.data.success) {
        setSavedJobs(response.data.data.map((item) => item.jobData));
      } else {
        setError("Failed to fetch saved jobs.");
      }
    } catch (err) {
      setError("Error fetching saved job details.");
    }
  };

  useEffect(() => {
    loadSavedJobs();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with User Profile */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-white rounded-full p-1">
              <div className="w-full h-full bg-blue-100 rounded-full flex items-center justify-center">
                <User size={32} className="text-blue-600" />
              </div>
            </div>
            <div>
              <h2 className="text-xl font-bold">{userData?.username || "User"}</h2>
              <p className="text-blue-100 text-sm">{userData?.email || "email@example.com"}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Saved Jobs Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h1 className="text-2xl font-bold text-gray-800 mb-6">Saved Jobs</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {savedJobs.length > 0 ? (
                  savedJobs.map((job) => (
                    <JobCard key={job.id} job={job} onToggle={loadSavedJobs} />
                  ))
                ) : (
                  <p className="text-gray-500">No saved jobs yet.</p>
                )}
              </div>
            </div>
          </div>

          {/* Resume Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Resume</h2>
                <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  <Upload size={18} />
                  <span>Upload</span>
                </button>
              </div>
              <div className="space-y-4">
                {resumes.map(resume => (
                  <ResumeCard key={resume.id} resume={resume} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;