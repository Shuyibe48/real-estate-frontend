import React from 'react';

const Services = () => {
  return (
    <div className="container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
      {/* Free Home Valuation */}
      <div className="flex flex-col items-center bg-white p-6 rounded-lg text-center">
        <div className="flex items-center justify-center w-16 h-16 mb-4 bg-teal-100 rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 13l-4-4m0 0l4-4m-4 4h12M9 12H3M9 12l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
        <h3 className="text-lg font-bold text-gray-800 mb-2">Free home valuation</h3>
        <p className="text-gray-600 mb-4">Find out how much your home's worth from an expert</p>
        <a href="#" className="text-teal-600 font-semibold hover:underline">Get a free agent valuation</a>
      </div>

      {/* Commercial Property */}
      <div className="flex flex-col items-center bg-gray-100 p-6 rounded-lg text-center">
        <div className="flex items-center justify-center w-16 h-16 mb-4 bg-teal-100 rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v18h14V3H5zM3 9h18M9 3v6m6-6v6" />
          </svg>
        </div>
        <h3 className="text-lg font-bold text-gray-800 mb-2">Commercial property</h3>
        <p className="text-gray-600 mb-4">Search freehold and leasehold commercial properties in the UK</p>
        <a href="#" className="text-teal-600 font-semibold hover:shadow transition duration-500 bg-gray-200 px-4 py-2 rounded-lg">Search now</a>
      </div>

      {/* Energy Efficiency */}
      <div className="flex flex-col items-center bg-white p-6 rounded-lg text-center">
        <div className="flex items-center justify-center w-16 h-16 mb-4 bg-teal-100 rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 1v4m0 14v4m7-7h4m-14 0H1m16.95-6.95l2.83 2.83M4.22 19.78l2.83-2.83M4.22 4.22l2.83 2.83M16.95 19.78l2.83-2.83" />
          </svg>
        </div>
        <h3 className="text-lg font-bold text-gray-800 mb-2">Energy efficiency</h3>
        <p className="text-gray-600 mb-4">Learn about going greener at home, and tips for reducing your energy bill</p>
        <a href="#" className="text-teal-600 font-semibold hover:underline">Find out more</a>
      </div>
    </div>
  );
};

export default Services;
