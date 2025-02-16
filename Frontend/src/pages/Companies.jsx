import React, { useState, useEffect } from "react";
import { Database } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BookmarkButton from "../components/SaveBtn";
import axios from "axios";

const JobCard = ({ job, onToggle }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer relative">
      <div className="absolute top-4 right-4">
        <BookmarkButton job={job} onToggle={onToggle} />
      </div>
      <div
        onClick={() => navigate(`/jobs/${job.id}`, { state: { job } })}
        className="flex flex-col"
      >
        <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
          <Database className="text-white" />
        </div>
        <h3 className="font-semibold text-lg mb-2">{job.title}</h3>
        {job.company && (
          <p className="text-gray-600 text-sm mb-2">{job.company.display_name}</p>
        )}
        {job.location && (
          <p className="text-gray-600 text-sm mb-2">📍 {job.location.display_name}</p>
        )}
        {job.salary_min && (
          <p className="text-green-600 text-sm font-medium">
            💰 ₹{Math.floor(job.salary_min).toLocaleString()} - ₹
            {Math.floor(job.salary_max).toLocaleString()}
          </p>
        )}
      </div>
    </div>
  );
};

const SearchBar = ({ onSearch }) => {
  const [filters, setFilters] = useState({
    what: "",
    what_exclude: "",
    where: "",
    salary_min: "",
    full_time: false,
    permanent: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(filters);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8 space-y-4 bg-white p-6 rounded-lg shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Job title or keywords"
          value={filters.what}
          onChange={(e) => setFilters({ ...filters, what: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <input
          type="text"
          placeholder="Location"
          value={filters.where}
          onChange={(e) => setFilters({ ...filters, where: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          type="number"
          placeholder="Minimum salary"
          value={filters.salary_min}
          onChange={(e) => setFilters({ ...filters, salary_min: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <div className="flex items-center space-x-4">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={filters.full_time}
              onChange={(e) => setFilters({ ...filters, full_time: e.target.checked })}
              className="rounded text-blue-600"
            />
            <span>Full Time</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={filters.permanent}
              onChange={(e) => setFilters({ ...filters, permanent: e.target.checked })}
              className="rounded text-blue-600"
            />
            <span>Permanent</span>
          </label>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Search Jobs
        </button>
      </div>
    </form>
  );
};

const TrendingJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchJobs = async (filters = {}) => {
    try {
      setLoading(true);
      const ADZUNA_API_ID = import.meta.env.VITE_ADZUNA_API_ID;
      const ADZUNA_API_KEY = import.meta.env.VITE_ADZUNA_API_KEY;

      const params = {
        app_id: ADZUNA_API_ID,
        app_key: ADZUNA_API_KEY,
        results_per_page: 20,
        ...filters,
        full_time: filters.full_time ? 1 : 0,
        permanent: filters.permanent ? 1 : 0,
        sort_by: "salary"
      };

      const response = await axios.get(
        `https://api.adzuna.com/v1/api/jobs/in/search/1`,
        { params }
      );

      setJobs(response.data.results);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [refresh]);

  return (
    <section className="py-16 px-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">
        Explore Jobs That Fit You
        </h2>
        
        <SearchBar onSearch={fetchJobs} />

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {jobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                onToggle={() => setRefresh((prev) => !prev)}
              />
            ))}
          </div>
        )}

        {!loading && jobs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">No jobs found. Try adjusting your search criteria.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default TrendingJobs;