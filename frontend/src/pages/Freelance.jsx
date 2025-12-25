import React from 'react';
import JobCard from '../components/JobCard';
import { jobPostings } from '../data/mockData';

const Marketplace = () => {
  return (
    <div className="min-h-screen bg-gray-50/50 py-12">
      <div className="max-w-5xl mx-auto px-6">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h1 className="text-4xl font-black text-[#0A3D62] mb-2">Freelance Marketplace</h1>
            <p className="text-gray-400 font-medium italic">Find specialized media experts for your next story.</p>
          </div>
          
          {/* Simple Tab Filters */}
          <div className="flex bg-white p-1 rounded-xl shadow-sm border border-gray-100">
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold shadow-md">All Jobs</button>
            <button className="px-6 py-2 text-gray-500 hover:text-blue-600 text-sm font-bold">My Bids</button>
          </div>
        </div>

        {/* Jobs List */}
        <div className="space-y-4">
          {jobPostings.map(job => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>

        {/* Load More Button */}
        <div className="mt-12 text-center">
          <button className="px-10 py-4 border-2 border-gray-200 text-gray-400 font-black rounded-2xl hover:border-blue-600 hover:text-blue-600 transition-all uppercase tracking-widest text-xs">
            Load more opportunities
          </button>
        </div>

      </div>
    </div>
  );
};

export default Marketplace;