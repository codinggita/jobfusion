import { useState , useEffect} from "react"
import { User, FileText, Menu, X } from "lucide-react"
import axios from "axios";
// JobCard component
const JobCard = ({ title, company, location, tags }) => (
  <div className="bg-gray-50 p-4 sm:p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
    <div className="flex items-start gap-3 sm:gap-4">
      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-coral-500 rounded-lg flex items-center justify-center shrink-0">
        <div className="w-5 h-5 sm:w-6 sm:h-6 bg-white/20"></div>
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 truncate">{title}</h3>
        <div className="flex items-center gap-2 text-sm sm:text-base text-gray-600 mt-1 flex-wrap">
          <span className="truncate">{company}</span>
          <span className="hidden sm:inline">•</span>
          <span className="truncate">{location}</span>
        </div>
        <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-2 sm:mt-3">
          <span className="px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm bg-emerald-100 text-emerald-700 whitespace-nowrap">
            {tags.type}
          </span>
          <span className="px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm bg-orange-100 text-orange-700 whitespace-nowrap">
            {tags.department}
          </span>
          <span className="px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm bg-purple-100 text-purple-700 whitespace-nowrap">
            {tags.role}
          </span>
        </div>
      </div>
    </div>
  </div>
)
// Sample job data
const jobs = [
  {
    title: "HR Manager",
    company: "Packer",
    location: "Lucern, Switzerland",
    tags: {
      type: "Full-Time",
      department: "Marketing",
      role: "Design",
    },
  },
  {
    title: "HR Manager",
    company: "Packer",
    location: "Lucern, Switzerland",
    tags: {
      type: "Full-Time",
      department: "Marketing",
      role: "Design",
    },
  },
]
const UserDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedEmail = localStorage.getItem("userEmail"); // Get email from localStorage
        if (!storedEmail) {
          setError("No email found in local storage.");
          setLoading(false);
          return;
        }

        const response = await axios.get(`http://localhost:3000/api/users/profile/${storedEmail}`);

        if (response.data.success) {
          setUserData(response.data.data); // Store the user data
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

      {/* Desktop Left Sidebar */}
      <div className="hidden md:block w-64 sm:w-72 bg-blue-500 p-4 sm:p-6 md:p-8 overflow-y-auto scrollbar-hide">
        {/* Profile Box */}
        {loading && <p className="text-gray-600">Loading...</p>}
      {/* {error && <p className="text-red-500">{error}</p>} */}

      {userData && (
        <div className="bg-blue-400/30 rounded-xl p-4 sm:p-6 h-[35vh] flex flex-col justify-center">
          {/* Profile Picture */}
          <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 bg-blue-300 rounded-full mx-auto mb-4 sm:mb-6 flex items-center justify-center">
            <User size={40} className="text-blue-600" />
          </div>
          {/* User Info */}
          <div className="text-white text-center">
            <h2 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-3">
              {userData.username}
            </h2>
            <p className="text-blue-100 text-base sm:text-lg ">{userData.email}</p>
            <p className="text-blue-100 text-base sm:text-lg">{userData.experienceLevel}</p>
          </div>
        </div>
      )}

        {/* Resume Box */}
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

      {/* Mobile Right Sidebar */}
      <div
        className={`fixed right-0 top-16 w-64 sm:w-72 h-[calc(100vh-4rem)] bg-blue-500 p-4 sm:p-6 transform transition-transform duration-300 ease-in-out z-40 md:hidden overflow-y-auto scrollbar-hide
          ${isSidebarOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Profile Box */}
        <div className="bg-blue-400/30 rounded-xl p-4 sm:p-6 h-[35vh] flex flex-col justify-center mt-8 sm:mt-10">
          <div className="w-24 h-24 sm:w-28 sm:h-28 bg-blue-300 rounded-full mx-auto mb-4 sm:mb-6 flex items-center justify-center">
            <User size={40} className="text-blue-600" />
          </div>
          <div className="text-white text-center">
            <h2 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-3">UserName</h2>
            <p className="text-blue-100 text-base sm:text-lg">Email</p>
          </div>
        </div>

        {/* Resume Box */}
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

      {/* Main Content */}
      <div className="flex-1 p-3 sm:p-4 md:p-6 lg:p-8 overflow-y-auto scrollbar-hide">
        {/* Applied Jobs Section */}
        <div className="mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 bg-blue-100 inline-block px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg">
            Applied Jobs
          </h2>
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
            {jobs.map((job, index) => (
              <JobCard key={`applied-${index}`} {...job} />
            ))}
          </div>
        </div>

        {/* Saved Jobs Section */}
        <div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 bg-blue-100 inline-block px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg">
            Saved Jobs
          </h2>
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
            {jobs.map((job, index) => (
              <JobCard key={`saved-${index}`} {...job} />
            ))}
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

export default UserDashboard;

