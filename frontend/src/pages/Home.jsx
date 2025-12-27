import React from "react"; import NewsCard from "../components/NewsCard"; import { newsCards } from "../data/mockData"; import { Pictures } from "../assets/Asset";

const Home = () => { return ( <div className="bg-[#F8FAFC] min-h-screen"> {/* Hero Section */} <section className="flex flex-col items-center justify-center pt-28 pb-20 px-4 text-center overflow-hidden"> <div className="relative mb-10 animate-in fade-in zoom-in duration-1000 ease-out"> <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-cyan-400/20 blur-3xl rounded-full"></div> <img src={Pictures.LogoImage} alt="JournAI Logo" className="relative w-48 md:w-56 drop-shadow-2xl transition-transform duration-700 hover:scale-105" /> </div>

    <div className="flex items-center gap-4 mb-8 animate-in slide-in-from-bottom-4 duration-700 delay-300 fill-mode-both">
      <div className="w-12 h-[2px] bg-gradient-to-r from-transparent to-blue-400 rounded-full"></div>
      <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.4em]">The Future of News</span>
      <div className="w-12 h-[2px] bg-gradient-to-l from-transparent to-blue-400 rounded-full"></div>
    </div>

    <h2 className="text-4xl md:text-5xl font-black text-[#0A192F] tracking-tight mb-4 animate-in slide-in-from-bottom-6 duration-1000 delay-500 fill-mode-both">
      Intelligent Journalism. <br />
      <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500">
        Human Control.
      </span>
    </h2>
    
    <p className="max-w-xl text-gray-500 font-medium leading-relaxed animate-in fade-in duration-1000 delay-700 fill-mode-both">
      Empowering reporters with high-fidelity AI tools while keeping 
      editorial integrity at the heart of every story.
    </p>
  </section>

  {/* Main Grid Section */}
  <section className="container mx-auto px-6 pb-20">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-700 fill-mode-both">
      {newsCards.map((card) => (
        <div 
          key={card.id} 
          className="transition-all duration-500 hover:-translate-y-2 hover:drop-shadow-2xl"
        >
          <NewsCard data={card} />
        </div>
      ))}
    </div>
  </section>

  {/* Analytics Placeholder */}
  <section className="container mx-auto px-6 pb-24">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 opacity-80">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="group bg-white rounded-[32px] p-8 border border-gray-100 shadow-sm h-72 relative overflow-hidden transition-all duration-500 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-900/5"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-2 text-[10px] font-black text-blue-400 uppercase tracking-widest mb-6">
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
              Analytics Preview
            </div>
            
            <div className="space-y-4">
              <div className="h-4 bg-gray-50 rounded-full w-3/4 animate-pulse"></div>
              <div className="h-20 bg-gray-50/50 rounded-2xl w-full flex items-end p-4 gap-2">
                <div className="flex-1 bg-blue-100 rounded-t-md h-1/2 group-hover:h-3/4 transition-all duration-1000 delay-100"></div>
                <div className="flex-1 bg-blue-200 rounded-t-md h-3/4 group-hover:h-1/2 transition-all duration-1000 delay-200"></div>
                <div className="flex-1 bg-blue-300 rounded-t-md h-1/3 group-hover:h-5/6 transition-all duration-1000 delay-300"></div>
                <div className="flex-1 bg-blue-400 rounded-t-md h-5/6 group-hover:h-2/3 transition-all duration-1000 delay-400"></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </section>
</div>
); };

export default Home;