import React from 'react';

const ListCard = ({ item, colorClass }) => (
  <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex flex-col h-full">
    <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />
    <div className="p-5 flex flex-col flex-grow">
      <span className={`text-[10px] font-bold px-3 py-1 rounded-full w-fit mb-3 ${colorClass}`}>
        {item.tag}
      </span>
      <h3 className="text-[#0A3D62] font-bold text-lg leading-tight mb-2 line-clamp-2">
        {item.title}
      </h3>
      <p className="text-gray-400 text-xs leading-relaxed line-clamp-3">
        {item.desc}
      </p>
    </div>
  </div>
);

export default ListCard;