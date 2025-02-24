// Avoided unnecessary API calls : I used useRef

// Optimized state management --> The companiesCache.current check ensures the API call only happens once.

// Reduced state updates --> The setCompanies function only gets called when data is actually fetched.


import React, { useState, useEffect, useRef } from 'react';
const CompanyCard = ({ canonical_name, count, description, average_salary }) => {
  const jobType = (average_salary !== undefined && average_salary !== null && average_salary > 15000)
    ? "Full Time"
    : "Part Time";
  const subJobRole = canonical_name ? canonical_name.split(" ")[0] : "General";

  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 bg-red-100 rounded-lg"></div>
        <span className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-sm">
          {jobType}
        </span>
      </div>
      <h3 className="font-semibold text-lg mb-2">
        {canonical_name || "Unknown Company"}
      </h3>
      <p className="text-gray-600">
        {description || `Leading ${canonical_name || "this company"} in the industry.`}
      </p>
      <div className="mt-4">
        <p className="text-gray-600">Vacancies: {count || "N/A"}</p>
      </div>
    </div>
  );
};

const TopCompanies = () => {
  const [companies, setCompanies] = useState([]);
  const companiesCache = useRef(null);

  const fetchTopCompanies = async () => {
    if (companiesCache.current) return;

    try {
      const ADZUNA_API_ID = import.meta.env.VITE_ADZUNA_API_ID;
      const ADZUNA_API_KEY = import.meta.env.VITE_ADZUNA_API_KEY;

      const response = await fetch(
        `https://api.adzuna.com/v1/api/jobs/in/top_companies?app_id=${ADZUNA_API_ID}&app_key=${ADZUNA_API_KEY}&content-type=application/json`
      );
      const data = await response.json();
      console.log("Top Companies Data:", data);

      if (data && data.leaderboard) {
        const customizedCompanies = data.leaderboard.map((company) => ({
          ...company,
          description: company.description || `Leading ${company.canonical_name} in the industry.`
        }));
        companiesCache.current = customizedCompanies;
        setCompanies(customizedCompanies);
      } else {
        console.error("No leaderboard data found in API response.");
      }
    } catch (error) {
      console.error('Error fetching top companies:', error);
    }
  };

  useEffect(() => {
    if (!companiesCache.current) {
      fetchTopCompanies();
    } else {
      setCompanies(companiesCache.current);
    }
  }, []);

  return (
    <section className="py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Top Companies</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {companies.length > 0 ? (
            companies.map((company, index) => (
              <CompanyCard key={index} {...company} />
            ))
          ) : (
            <p className="text-center w-full">Loading top companies...</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default TopCompanies;