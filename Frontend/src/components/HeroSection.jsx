import React from 'react';
import { Search, MapPin } from 'lucide-react';

const HeroSection = () => {
  return (
    <div className="bg-blue-50 px-6 py-16">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Find a <span className="text-blue-600">Job</span> That Suits<br />
            Your Intrest & Skills
          </h1>
          <p className="text-gray-600 mb-8">
            Great platform for the job seeker that searching for<br />
            new career heights and passionate about startups
          </p>
          
          <div className="flex flex-col md:flex-row gap-4 p-2 bg-white rounded-lg shadow-lg">
            <div className="flex-1 flex items-center gap-2 px-4">
              <Search className="text-gray-400" />
              <input
                type="text"
                placeholder="Job title or keyword"
                className="w-full p-2 outline-none"
              />
            </div>
            <div className="flex-1 flex items-center gap-2 px-4 border-t md:border-t-0 md:border-l border-gray-200">
              <MapPin className="text-gray-400" />
              <input
                type="text"
                placeholder="Location"
                className="w-full p-2 outline-none"
              />
            </div>
            <button className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700">
              Search my job
            </button>
          </div>
        </div>
        
        <div className="hidden md:block">
          <img
            src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80"
            alt="Professional looking for job"
            className="w-full h-[500px] object-cover rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;