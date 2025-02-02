import React from 'react';
import { Database } from 'lucide-react';

const JobCard = ({ title, openings }) => (
  <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
    <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
      <Database className="text-white" />
    </div>
    <h3 className="font-semibold text-lg mb-2">{title}</h3>
    <p className="text-gray-600">{openings} Open position{openings > 1 ? 's' : ''}</p>
  </div>
);

const TrendingJobs = () => {
  const jobs = [
    { title: 'Data & Science', openings: 12 },
    { title: 'Software Engineering', openings: 15 },
    { title: 'Cybersecurity', openings: 8 },
    { title: 'Cloud Computing', openings: 10 },
    { title: 'AI & Machine Learning', openings: 14 },
    { title: 'Blockchain Development', openings: 9 },
    { title: 'UI/UX Design', openings: 11 },
    { title: 'DevOps Engineering', openings: 13 },
  ];

  return (
    <section className="py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Trending Job Roles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {jobs.map((job, index) => (
            <JobCard key={index} {...job} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingJobs;
