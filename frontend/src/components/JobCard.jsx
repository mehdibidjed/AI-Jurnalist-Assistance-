import React from "react";
import { Video, Camera, Music, DollarSign, Clock, Star } from "lucide-react";

const typeConfig = {
  video: {
    icon: <Video size={18} />,
    color: "text-purple-500",
    bg: "bg-purple-50",
  },
  photo: {
    icon: <Camera size={18} />,
    color: "text-cyan-500",
    bg: "bg-cyan-50",
  },
  audio: {
    icon: <Music size={18} />,
    color: "text-amber-500",
    bg: "bg-amber-50",
  },
};

const JobCard = ({ job }) => {
  const config = typeConfig[job.type] || typeConfig.video;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-4 hover:shadow-xl hover:border-blue-200 transition-all group cursor-pointer shadow-sm">
      <div className="flex items-start gap-5">
        {/* Category Icon */}
        <div
          className={`p-4 rounded-xl ${config.bg} ${config.color} transition-transform group-hover:scale-110`}
        >
          {config.icon}
        </div>

        {/* Content */}
        <div className="flex-grow">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-bold text-[#0A3D62] group-hover:text-blue-600 transition-colors">
              {job.title}
            </h3>
            <span
              className={`text-[10px] font-black uppercase px-3 py-1 rounded-lg ${config.bg} ${config.color} tracking-widest`}
            >
              {job.type}
            </span>
          </div>

          <p className="text-sm text-gray-400 mb-6 leading-relaxed max-w-2xl">
            {job.desc}
          </p>

          {/* Metadata Footer */}
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-1.5 text-emerald-500 font-black text-sm">
              <DollarSign size={16} /> ${job.price}
            </div>
            <div className="flex items-center gap-1.5 text-blue-500 font-bold text-sm">
              <Clock size={16} /> {job.duration}
            </div>
            <div className="flex items-center gap-1.5 text-orange-400 font-bold text-sm">
              <Star size={16} className="fill-orange-400" />
              <span className="text-gray-400 font-medium">Context:</span>{" "}
              {job.rating}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
