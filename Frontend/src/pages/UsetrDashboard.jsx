import React from 'react';
import { User, FileText } from 'lucide-react';

const JobCard = ({ title, company, location, tags }) => (
  <div className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
    <div className="flex items-start gap-4">
      <div className="w-12 h-12 bg-coral-500 rounded-lg flex items-center justify-center">
        <div className="w-6 h-6 bg-white/20"></div>
      </div>
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <div className="flex items-center gap-2 text-gray-600 mt-1">
          <span>{company}</span>
          <span>•</span>
          <span>{location}</span>
        </div>
        <div className="flex gap-2 mt-3">
          <span className="px-3 py-1 rounded-full text-sm bg-emerald-100 text-emerald-700">
            {tags.type}
          </span>
          <span className="px-3 py-1 rounded-full text-sm bg-orange-100 text-orange-700">
            {tags.department}
          </span>
          <span className="px-3 py-1 rounded-full text-sm bg-purple-100 text-purple-700">
            {tags.role}
          </span>
        </div>
      </div>
    </div>
  </div>
);

function UsetrDashboard() {
  // Sample job data
  const jobs = [
    {
      title: "HR Manager",
      company: "Packer",
      location: "Lucern, Switzerland",
      tags: {
        type: "Full-Time",
        department: "Marketing",
        role: "Design"
      }
    },
    {
      title: "HR Manager",
      company: "Packer",
      location: "Lucern, Switzerland",
      tags: {
        type: "Full-Time",
        department: "Marketing",
        role: "Design"
      }
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Left Sidebar */}
      <div className="fixed left-0 top-0 w-72 h-screen bg-blue-500 p-8">
        <div className="bg-blue-400/30 rounded-xl p-6">
          <div className="w-24 h-24 bg-blue-300 rounded-full mx-auto mb-4 flex items-center justify-center">
            <User size={40} className="text-blue-600" />
          </div>
          <div className="text-white text-center">
            <h2 className="text-xl font-semibold mb-2">UserName</h2>
            <p className="text-blue-100">Email</p>
          </div>
        </div>

        <div className="mt-8 bg-blue-400/30 rounded-xl p-6">
          <div className="w-24 h-24 bg-blue-300 rounded-full mx-auto mb-4 flex items-center justify-center">
            <FileText size={40} className="text-blue-600" />
          </div>
          <div className="grid grid-cols-3 gap-2 mt-4">
            {[1, 2, 3].map((_, i) => (
              <div key={i} className="aspect-[3/4] bg-blue-300 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-72 p-8">
        {/* Applied Jobs Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6 bg-blue-100 inline-block px-4 py-2 rounded-lg">
            Applied Jobs
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {jobs.map((job, index) => (
              <JobCard key={`applied-${index}`} {...job} />
            ))}
          </div>
        </div>

        {/* Saved Jobs Section */}
        <div>
          <h2 className="text-3xl font-bold mb-6 bg-blue-100 inline-block px-4 py-2 rounded-lg">
            Saved Jobs
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {jobs.map((job, index) => (
              <JobCard key={`saved-${index}`} {...job} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UsetrDashboard;