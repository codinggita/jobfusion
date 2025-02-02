import React from 'react';

const CompanyCard = () => (
  <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
    <div className="flex items-start justify-between mb-4">
      <div className="w-12 h-12 bg-red-100 rounded-lg"></div>
      <div className="flex gap-2">
        <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm">Full Time</span>
        <span className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-sm">Marketing</span>
        <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">Design</span>
      </div>
    </div>
    <h3 className="font-semibold text-lg mb-2">HR Manager</h3>
    <p className="text-gray-600">Packer • Lucern, Switzerland</p>
  </div>
);

const TopCompanies = () => {
  return (
    <section className="py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Top Companies</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <CompanyCard key={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopCompanies;