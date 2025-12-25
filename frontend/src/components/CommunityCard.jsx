import React from 'react';
import { CheckCircle2, Star, Camera, Mic, Smartphone, Plane, Waves, MessageSquare, Users } from 'lucide-react';

// Helper to map equipment types to Lucide icons
const getEquipIcon = (type) => {
  const icons = {
    camera: <Camera size={14} />,
    mic: <Mic size={14} />,
    phone: <Smartphone size={14} />,
    drone: <Plane size={14} className="rotate-45" />, // Using Plane as a proxy for drone
    water: <Waves size={14} />,
  };
  return icons[type] || <Camera size={14} />;
};

const CommunityCard = ({ profile }) => {
  const isAvailable = profile.status === "Available";
  const statusColor = isAvailable ? "bg-emerald-500" : "bg-orange-500";
  const statusBg = isAvailable ? "bg-emerald-50 text-emerald-700" : "bg-orange-50 text-orange-700";

  // Reusable Tag Component for Skills and Equipment
  const Tag = ({ icon, label, isEquip }) => (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-bold tracking-wide uppercase
      ${isEquip ? 'bg-blue-50 text-blue-700 border border-blue-100' : 'bg-gray-100 text-gray-600 border border-gray-200'}`}>
      {icon} {label}
    </span>
  );

  return (
    <div className="bg-white rounded-[24px] border border-gray-100 p-6 shadow-sm hover:shadow-md transition-all">
      {/* Header: Avatar & Info */}
      <div className="flex items-start gap-4 mb-6">
        <img src={profile.image} alt={profile.name} className="w-16 h-16 rounded-full object-cover border-2 border-gray-50 shadow-sm" />
        <div className="flex-grow">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-lg font-bold text-[#0A3D62]">{profile.name}</h3>
            {profile.verified && (
              <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                <CheckCircle2 size={12} /> Verified Press
              </span>
            )}
          </div>
          <p className="text-sm text-gray-500 font-medium mb-2 flex items-center gap-1">
            📍 {profile.location}
          </p>
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold ${statusBg}`}>
            <span className={`w-2 h-2 rounded-full ${statusColor}`}></span>
            {profile.status}
          </span>
        </div>
      </div>

      {/* Stats Row */}
      <div className="flex items-center py-4 border-t border-b border-gray-50 mb-6">
        <div className="flex-1 text-center border-r border-gray-50">
          <div className="flex items-center justify-center gap-1 text-[#0A3D62] font-black text-xl">
            {profile.rating} <Star size={16} className="fill-yellow-400 text-yellow-400" />
          </div>
          <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Rating</p>
        </div>
        <div className="flex-1 text-center">
          <div className="text-[#0A3D62] font-black text-xl">{profile.stories}</div>
          <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Stories</p>
        </div>
      </div>

      {/* Skills Section */}
      <div className="mb-6">
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Skills</p>
        <div className="flex flex-wrap gap-2">
          {profile.skills.map((skill, idx) => <Tag key={idx} label={skill} />)}
        </div>
      </div>

      {/* Equipment Section */}
      <div className="mb-8">
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Equipment</p>
        <div className="flex flex-wrap gap-2">
          {profile.equipment.map((equip, idx) => (
            <Tag key={idx} isEquip label={equip.label} icon={getEquipIcon(equip.type)} />
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button className="flex-1 flex items-center justify-center gap-2 py-2.5 border-2 border-gray-200 text-gray-600 font-bold rounded-xl hover:border-blue-600 hover:text-blue-600 transition-all text-sm">
          <MessageSquare size={16} /> Secure Message
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-md shadow-blue-100 text-sm">
          <Users size={16} /> Collaborate
        </button>
      </div>
    </div>
  );
};

export default CommunityCard;