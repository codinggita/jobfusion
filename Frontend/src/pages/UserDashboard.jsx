import { useState, useEffect } from "react"
import { Menu, X, Database } from "lucide-react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import BookmarkButton from "../components/SaveBtn"

const JobCard = ({ job, onToggle }) => {
  const navigate = useNavigate()

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
  )
}

const UserDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [userData, setUserData] = useState(null)
  const [savedJobs, setSavedJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedEmail = localStorage.getItem("userEmail")
        if (!storedEmail) {
          setError("No email found in local storage.")
          setLoading(false)
          return
        }
        const response = await axios.get(`http://localhost:3000/api/users/profile/${storedEmail}`)
        if (response.data.success) {
          setUserData(response.data.data)
        } else {
          setError("Failed to fetch user data.")
        }
      } catch (err) {
        setError("Error fetching user data.")
      } finally {
        setLoading(false)
      }
    }
    fetchUserData()
  }, [])

  const loadSavedJobs = async () => {
    try {
      const storedEmail = localStorage.getItem("userEmail")
      if (!storedEmail) {
        setError("No email found in local storage.")
        return
      }
      const response = await axios.get(`http://localhost:3000/api/jobs/saved/${storedEmail}`)
      if (response.data.success) {
        setSavedJobs(response.data.data.map((item) => item.jobData))
      } else {
        setError("Failed to fetch saved jobs.")
      }
    } catch (err) {
      setError("Error fetching saved job details.")
    }
  }

  useEffect(() => {
    loadSavedJobs()
  }, [loadSavedJobs]) // Added loadSavedJobs to the dependency array

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
        {/* ... (unchanged sidebar content) ... */}
      </div>

      {/* Mobile Right Sidebar (unchanged) */}
      <div
        className={`fixed right-0 top-16 w-64 sm:w-72 h-[calc(100vh-4rem)] bg-blue-500 p-4 sm:p-6 transform transition-transform duration-300 ease-in-out z-40 md:hidden overflow-y-auto scrollbar-hide
          ${isSidebarOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* ... (unchanged mobile sidebar content) ... */}
      </div>

      {/* Main Content – Saved Jobs Section */}
      <div className="flex-1 p-3 sm:p-4 md:p-6 lg:p-8 overflow-y-auto scrollbar-hide">
        <div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 bg-blue-100 inline-block px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg">
            Saved Jobs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedJobs.length > 0 ? (
              savedJobs.map((job) => <JobCard key={job.id} job={job} onToggle={loadSavedJobs} />)
            ) : (
              <p className="text-gray-500">No saved jobs yet.</p>
            )}
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-30 md:hidden" onClick={() => setIsSidebarOpen(false)} />
      )}
    </div>
  )
}

export default UserDashboard

