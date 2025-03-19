import React, { useState } from 'react';
import { X } from 'lucide-react';

const ExperienceCard = ({ experience }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="group relative bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
        <div className="aspect-[4/3] w-full overflow-hidden">
          <img
            src={experience.image_url}
            alt={experience.name}
            className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-300"
          />
        </div>
        
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-gray-900">{experience.name}</h3>
            <span className="px-3 py-1 text-sm font-medium text-emerald-700 bg-emerald-50 rounded-full">
              Salary: {experience.salary_range}
            </span>
          </div>
          
          <div className="space-y-2 mb-4">
            <p className="text-gray-600 font-medium">Job Title: {experience.job_title}</p>
            <p className="text-gray-500">Company: {experience.company_name}</p>
          </div>
          
          <div className="mb-4">
            <p className="text-gray-600">Journey Description: {experience.journey_description}</p>
          </div>
          
          <button
            onClick={() => setIsModalOpen(true)}
            className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
          >
            Read More
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/5 backdrop-blur-2xl bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white p-6 border-b flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-gray-900">{experience.name}'s Journey</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 items-center border-b border-gray-200 pb-4">
                  <div className="flex flex-col justify-center">
                    <h3 className="text-2xl font-semibold text-gray-900">
                      <span className="text-emerald-600">{experience.job_title}</span> at {experience.company_name}
                    </h3>
                    <p className="text-gray-600 text-sm mt-2">
                      {experience.company_name} is a leading company in the {experience.industry} industry.
                    </p>
                  </div>
                  <div className="flex items-center justify-center md:justify-end">
                    <div className="bg-emerald-100 p-4 rounded-lg">
                      <h4 className="text-emerald-600 font-semibold text-2xl">
                        {experience.salary_range}
                      </h4>
                      <p className="text-gray-600 text-sm mt-1">Salary Range</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Journey Description</h4>
                  <p className="text-gray-600 whitespace-pre-line">{experience.journey_description}</p>
                  <img
                    src={experience.image_url}
                    alt={experience.name}
                    className="w-full h-auto object-cover object-center mt-6"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ExperienceCard;