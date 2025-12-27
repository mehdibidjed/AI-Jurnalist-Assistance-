import React from 'react';
import { 
  ShieldCheck, Lock, Radio, MapPin, 
  Settings, User, Signal, Mic 
} from 'lucide-react';
import { Pictures } from '../assets/Asset';

const CameraHub = () => {
  return (
    <div className="max-w-[1600px] mx-auto p-6 animate-in fade-in duration-700">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* --- LEFT SIDEBAR: Drones & Nodes --- */}
        <div className="lg:col-span-3 space-y-6">
          {/* Drones Section */}
          <div className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-6 text-blue-600 font-bold text-xs uppercase tracking-widest">
              <Radio size={16} /> Drones in Area
            </div>
            <div className="space-y-3">
              <DroneStatusCard name="Drone Alpha-7" status="Active" signal={85} />
              <DroneStatusCard name="Drone Beta-2" status="Active" signal={42} />
              <DroneStatusCard name="Drone Gamma-1" status="Standby" signal={0} isOffline />
            </div>
          </div>

          {/* CCTV Nodes Section */}
          <div className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-6 text-[#0A3D62] font-bold text-xs uppercase tracking-widest">
              <MapPin size={16} /> Public CCTV Nodes
            </div>
            <div className="space-y-3">
              <CCTVNodeCard name="Public Cam 12A" quality="4K" />
              <CCTVNodeCard name="Public Cam 480" quality="60FPS" />
              <CCTVNodeCard name="Public Cam 780" quality="HD" />
            </div>
          </div>
        </div>

        {/* --- MAIN CENTER: Live View --- */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-[#E5E7EB] rounded-[40px] p-8 relative overflow-hidden shadow-inner border border-gray-200">
            {/* Top Bar Indicators */}
            <div className="flex justify-between items-start relative z-10 mb-4">
              <div className="bg-red-500 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter animate-pulse flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-white rounded-full"></span> LIVE
              </div>
              <button className="p-3 bg-white/80 backdrop-blur-md rounded-full shadow-sm text-blue-600 hover:scale-110 transition-transform">
                <Settings size={20} />
              </button>
            </div>

            {/* Main Video Simulation Area */}
            <div className="relative aspect-video rounded-[24px] overflow-hidden bg-black group shadow-2xl">
              <img 
                src={Pictures.CameraDetector}
                className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-10000 linear"
                alt="City view"
              />
              {/* High-Tech HUD Overlays */}
              <div className="absolute inset-0 flex flex-col justify-center items-center pointer-events-none">
                <div className="w-48 h-48 border-2 border-cyan-400/30 rounded-full flex items-center justify-center">
                  <div className="w-24 h-24 border border-cyan-400 rounded-sm relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-cyan-400 text-[10px] font-black px-2 py-0.5 whitespace-nowrap">
                      STAT: ANALYZING
                    </div>
                  </div>
                </div>
              </div>
              {/* HUD Corners */}
              <div className="absolute top-6 left-6 w-8 h-8 border-t-2 border-l-2 border-cyan-400/50"></div>
              <div className="absolute bottom-6 right-6 w-8 h-8 border-b-2 border-r-2 border-cyan-400/50"></div>
            </div>

            {/* Bottom Controls */}
            <div className="flex justify-center mt-8">
              <button className="bg-cyan-500 hover:bg-cyan-600 text-white px-10 py-4 rounded-full font-black uppercase tracking-widest text-xs flex items-center gap-3 shadow-lg shadow-cyan-200 transition-all active:scale-95">
                <Mic size={18} /> Press to Talk
              </button>
            </div>
          </div>

          {/* Telemetry Cards */}
          <div className="grid grid-cols-2 gap-6">
            <TelemetryCard label="Altitude" value="135m" />
            <TelemetryCard label="Max Distance" value="1250m" />
          </div>
        </div>

        {/* --- RIGHT SIDEBAR: System & Auth --- */}
        <div className="lg:col-span-3 space-y-6">
          {/* Security Card */}
          <div className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-6 text-emerald-600 font-bold text-xs uppercase tracking-widest">
              <ShieldCheck size={16} /> System Security
            </div>
            
            <div className="bg-emerald-50 rounded-2xl p-5 mb-6 border border-emerald-100">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-[#0A3D62] text-white rounded-full flex items-center justify-center font-bold">JD</div>
                <div>
                  <p className="text-sm font-black text-[#0A3D62]">John Doe</p>
                  <p className="text-[10px] text-gray-400 font-bold uppercase">Press ID: 12345</p>
                </div>
              </div>
              <div className="pt-3 border-t border-emerald-100">
                <p className="text-[9px] font-black text-emerald-700 uppercase mb-1">Encryption Protocol</p>
                <p className="text-sm font-black text-[#0A3D62]">AES-256 SECURED</p>
              </div>
            </div>

            <div className="space-y-4">
               <div>
                  <p className="text-[10px] font-black text-gray-300 uppercase mb-2">Surveillance Access</p>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                    <span className="text-xs font-bold text-gray-500">Government Authorized</span>
                    <span className="text-[9px] font-black text-emerald-500 uppercase px-2 py-0.5 bg-emerald-100 rounded">Active</span>
                  </div>
               </div>
               
               <button className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-2 hover:bg-[#0A3D62] transition-colors shadow-lg shadow-blue-100">
                  <Lock size={14} /> Request Authorization
               </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

// --- HELPER COMPONENTS ---

const DroneStatusCard = ({ name, status, signal, isOffline }) => (
  <div className={`p-4 rounded-2xl border transition-all ${isOffline ? 'bg-gray-50 border-gray-100 opacity-60' : 'bg-blue-50/30 border-blue-100 shadow-sm'}`}>
    <div className="flex justify-between items-center mb-2">
      <p className="text-sm font-black text-[#0A3D62]">{name}</p>
      <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded ${isOffline ? 'bg-gray-200 text-gray-500' : 'bg-blue-600 text-white'}`}>
        {status}
      </span>
    </div>
    <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden">
      <div className={`h-full rounded-full transition-all duration-1000 ${isOffline ? 'bg-gray-300' : 'bg-blue-600'}`} style={{ width: `${signal}%` }}></div>
    </div>
  </div>
);

const CCTVNodeCard = ({ name, quality }) => (
  <div className="p-4 bg-blue-600 text-white rounded-2xl flex justify-between items-center shadow-md">
    <p className="text-sm font-black">{name}</p>
    <span className="text-[9px] font-black border border-white/30 px-2 py-0.5 rounded uppercase">{quality}</span>
  </div>
);

const TelemetryCard = ({ label, value }) => (
  <div className="bg-[#E5E7EB] p-6 rounded-[32px] border border-gray-200">
    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{label}</p>
    <p className="text-3xl font-black text-[#0A3D62]">{value}</p>
  </div>
);

export default CameraHub;
