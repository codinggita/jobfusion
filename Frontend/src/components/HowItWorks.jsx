import React from 'react';
import { UserPlus, FileText, Search, Send } from 'lucide-react';

const Step = ({ icon: Icon, title, description }) => (
  <div className="text-center">
    <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
      <Icon className="text-white h-8 w-8" />
    </div>
    <h3 className="font-semibold text-lg mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const HowItWorks = () => {
  const steps = [
    {
      icon: UserPlus,
      title: 'Create account',
      description: 'Register to access our platform and start your job search journey.'
    },
    {
      icon: FileText,
      title: 'Make And Upload CV/Resume',
      description: 'Create or upload your professional resume to showcase your skills.'
    },
    {
      icon: Search,
      title: 'Find suitable job',
      description: 'Browse through thousands of relevant job opportunities.'
    },
    {
      icon: Send,
      title: 'Apply job',
      description: 'Submit your application with just a few clicks.'
    }
  ];

  return (
    <section className="bg-gray-50 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">How JobFusion Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <Step key={index} {...step} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
