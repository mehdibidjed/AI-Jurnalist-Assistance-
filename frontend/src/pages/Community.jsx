import React from 'react';
import CommunityCard from '../components/CommunityCard';
import { communityProfiles } from '../data/mockData';

const Community = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Page Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-extrabold text-[#0A3D62] mb-4">
          Journalist Community
        </h1>
        <p className="text-gray-500 font-medium max-w-2xl mx-auto">
          Connect, collaborate, and share resources with verified press members across the globe.
        </p>
      </div>

      {/* The Grid Layout: 1 col on mobile, 2 on tablet, 3 on desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {communityProfiles.map((profile) => (
          <CommunityCard key={profile.id} profile={profile} />
        ))}
        
        {/* Duplicating data just to show the grid effect if you only have 3 items */}
        {communityProfiles.map((profile) => (
          <CommunityCard key={profile.id + 99} profile={profile} />
        ))}
      </div>
    </div>
  );
};

export default Community;