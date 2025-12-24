import React from "react";
import MainLayout from "../layout/MainLayout";
import NewsCard from "../components/NewsCard";
import { newsCards } from "../data/mockData";
import { Icons } from "../assets/Asset";

const Home = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center py-20 px-4 text-center">
        <div className="relative mb-8">
          <img src={Icons.Logo} />
          {/* Subtle Gear/Icon Detail */}
        </div>

        <div className="w-24 h-[2px] bg-gray-300 mb-6"></div>
        <h2 className="text-3xl font-bold text-[#2C3E50]">
          News you can trust, intelligence you can feel
        </h2>
      </section>

      {/* Main Grid Section */}
      <section className="container mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {newsCards.map((card) => (
            <NewsCard key={card.id} data={card} />
          ))}
        </div>
      </section>

      {/* Analytics Placeholder Section (Bottom Row) */}
      <section className="container mx-auto px-6 pb-20 grid grid-cols-1 md:grid-cols-3 gap-8 opacity-60">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm h-64 flex flex-col justify-between"
          >
            <div className="flex items-center gap-2 text-xs font-semibold text-gray-400 uppercase">
              <span>📊</span> Analytics Preview
            </div>
            <div className="w-full h-32 bg-gray-50 rounded-lg border-b-2 border-l-2 flex items-end p-2">
              <div className="w-full h-full bg-gradient-to-t from-blue-50 to-transparent rounded-t-lg"></div>
            </div>
          </div>
        ))}
      </section>
    </>
  );
};

export default Home;
