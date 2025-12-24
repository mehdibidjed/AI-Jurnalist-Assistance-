const StatusLegend = () => {
    return (
      <div className="flex items-center justify-around mt-8 pt-8 border-t border-gray-100 bg-gray-50/50 -mx-12 -mb-12 p-8 rounded-b-[32px]">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]"></div>
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Verified = Recommended
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]"></div>
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            False = Fake News
          </span>
        </div>
      </div>
    );
  };
  
  export default StatusLegend;