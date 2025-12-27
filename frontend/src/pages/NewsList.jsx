import React, { useState, useEffect } from 'react';
import ListCard from '../components/ListCard';
import { newsList as mockData } from '../data/mockData';
import { getTrends } from '../api/trends';
import { Loader2 } from 'lucide-react';
import { Pictures } from '../assets/Asset';

const SectionHeader = ({ icon, title, color }) => (
  <div className="flex items-center gap-2 mb-8">
    <span className="text-xl">{icon}</span>
    <h2 className={`text-2xl font-bold ${color}`}>{title}</h2>
  </div>
);

const NewsList = () => {
  const [trendyNews, setTrendyNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTrends = async () => {
      try {
        const data = await getTrends();
        // Map API fields (topic, description) to card props (title, desc)
        // and take only the top 3 items
        const formattedTrends = data.slice(0, 3).map((item, index) => ({
          id: `trend-${index}`,
          title: item.topic,
          desc: item.description,
          tag: 'TRENDY',
          // Use a placeholder or a specific trend image from your assets
          image: Pictures.Trend 
        }));
        setTrendyNews(formattedTrends);
      } catch (error) {
        console.error("Failed to fetch trends:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrends();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-extrabold text-[#0A3D62] text-center mb-16">News List</h1>

      {/* Fake News Section - Keeping Mock Data */}
      <section className="mb-20">
        <SectionHeader icon="⚠️" title="Fake News" color="text-red-500" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {mockData.fake.map(item => (
            <ListCard key={item.id} item={item} colorClass="bg-red-50 text-red-500" />
          ))}
        </div>
      </section>

      {/* Trendy News Section - LINKED TO API */}
      <section className="mb-20">
        <SectionHeader icon="📈" title="Top 3 Trends" color="text-orange-500" />
        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-orange-500" size={40} />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-in fade-in duration-700">
            {trendyNews.map(item => (
              <ListCard key={item.id} item={item} colorClass="bg-orange-50 text-orange-500" />
            ))}
          </div>
        )}
      </section>

      {/* Recommended News Section - Keeping Mock Data */}
      <section>
        <SectionHeader icon="✅" title="Recommended" color="text-emerald-500" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {mockData.recommended.map(item => (
            <ListCard key={item.id + 100} item={{...item, tag: 'RECOMMENDED'}} colorClass="bg-emerald-50 text-emerald-500" />
          ))}
        </div>
      </section>
    </div>
  );
};

export default NewsList;