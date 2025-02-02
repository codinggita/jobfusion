import React from 'react';

const Newsletter = () => {
  return (
    <section className="bg-blue-600 py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-white">
          <h3 className="text-xl font-semibold mb-2">Newsletter</h3>
          <p>Be the first to know about discounts, offers and events</p>
        </div>
        
        <div className="flex w-full md:w-auto gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 md:w-80 px-4 py-3 rounded-md focus:outline-none bg-white text-gray-700 placeholder-gray-500"
          />
          <button className="bg-blue-800 text-white px-8 py-3 rounded-md hover:bg-blue-900 transition-all duration-300">
            Submit
          </button>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
