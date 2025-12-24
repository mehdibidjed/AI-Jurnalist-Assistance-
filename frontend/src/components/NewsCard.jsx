const NewsCard = ({ data }) => (
    <div className="bg-[#0A3D62] rounded-[32px] p-6 shadow-xl transition-transform hover:scale-[1.02]">
      <div className="flex items-center gap-2 text-white font-bold mb-6 tracking-wide">
        <span className="text-xl">{data.icon}</span>
        <span className="uppercase">{data.category}</span>
      </div>
      
      <div className="bg-white rounded-2xl overflow-hidden shadow-inner">
        <img src={data.image} alt={data.title} className="w-full h-48 object-cover" />
        <div className="p-4">
          <p className="text-[10px] font-bold text-blue-600 uppercase mb-2 tracking-widest">
            {data.category} • {data.label}
          </p>
          <h3 className="text-gray-900 font-bold leading-tight text-lg mb-4">
            {data.title}
          </h3>
        </div>
      </div>
    </div>
  );
  
  export default NewsCard;