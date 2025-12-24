import React from 'react';
import ListCard from '../components/ListCard';
import { newsList } from '../data/mockData';

const SectionHeader = ({ icon, title, color }) => (
  <div className="flex items-center gap-2 mb-8">
    <span className="text-xl">{icon}</span>
    <h2 className={`text-2xl font-bold ${color}`}>{title}</h2>
  </div>
);

const NewsList = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-extrabold text-[#0A3D62] text-center mb-16">News List</h1>

      {/* Fake News Section */}
      <section className="mb-20">
        <SectionHeader icon="⚠️" title="Fake News" color="text-red-500" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {newsList.fake.map(item => (
            <ListCard key={item.id} item={item} colorClass="bg-red-50 text-red-500" />
          ))}
        </div>
      </section>

      {/* Trendy News Section */}
      <section className="mb-20">
        <SectionHeader icon="📈" title="Trendy" color="text-orange-500" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {newsList.trendy.map(item => (
            <ListCard key={item.id} item={item} colorClass="bg-orange-50 text-orange-500" />
          ))}
        </div>
      </section>

      {/* Recommended News Section */}
      <section>
        <SectionHeader icon="✅" title="Recommended" color="text-emerald-500" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 opacity-50">
          {/* Reusing trendy data for placeholder */}
          {newsList.trendy.map(item => (
            <ListCard key={item.id + 100} item={{...item, tag: 'RECOMMENDED'}} colorClass="bg-emerald-50 text-emerald-500" />
          ))}
        </div>
      </section>
    </div>
  );
};

export default NewsList;