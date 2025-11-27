import { FLIGHTS, HOTELS } from '../constants';
import { Plane, Home, Copy, ExternalLink } from 'lucide-react';

const DocsView = () => {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // Could add toast here
  };

  return (
    <div className="pb-24 min-h-screen px-4 pt-8 max-w-md mx-auto animate-fade-in">
      <h1 className="text-2xl font-bold serif mb-6 text-stone-800">旅程資訊</h1>
      
      <div className="space-y-6">
        {/* Flights */}
        <div className="bg-white p-5 rounded-2xl border border-stone-100 shadow-sm">
          <h3 className="font-bold flex items-center gap-2 mb-4 text-stone-700">
            <Plane size={20} className="text-blue-500"/> 航班資訊
          </h3>
          {[FLIGHTS.outbound, FLIGHTS.inbound].map((flight, i) => (
            <div key={i} className="mb-4 last:mb-0 border-b border-stone-100 last:border-0 pb-4 last:pb-0">
              <div className="flex justify-between items-baseline mb-1">
                <span className="font-bold text-lg text-stone-800">{flight.airline}</span>
                <span className="font-mono text-stone-500 font-bold">{flight.code}</span>
              </div>
              <div className="flex justify-between items-center text-sm text-stone-600 bg-stone-50 p-2 rounded-lg">
                <div className="text-center">
                  <div className="font-mono font-bold text-lg">{flight.depTime}</div>
                  <div className="text-xs text-stone-400">{flight.from}</div>
                </div>
                <div className="text-stone-300">➜</div>
                <div className="text-center">
                  <div className="font-mono font-bold text-lg">{flight.arrTime}</div>
                  <div className="text-xs text-stone-400">{flight.to}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Hotels */}
        <div className="bg-white p-5 rounded-2xl border border-stone-100 shadow-sm">
          <h3 className="font-bold flex items-center gap-2 mb-4 text-stone-700">
            <Home size={20} className="text-indigo-500"/> 住宿資訊
          </h3>
          <div className="space-y-4">
            {HOTELS.map((hotel, i) => (
              <div key={i} className="group">
                <div className="flex justify-between items-start">
                  <div className="font-bold text-stone-800">{hotel.name}</div>
                  {hotel.link && (
                    <a href={hotel.link} target="_blank" rel="noreferrer" className="text-stone-400 hover:text-indigo-500">
                      <ExternalLink size={16}/>
                    </a>
                  )}
                </div>
                <div className="flex items-center gap-2 mt-1 mb-2">
                  <p className="text-xs text-stone-500 flex-1 truncate">{hotel.address}</p>
                  <button onClick={() => copyToClipboard(hotel.address)} className="text-stone-300 hover:text-stone-500">
                    <Copy size={14}/>
                  </button>
                </div>
                <div className="text-xs bg-orange-50 text-orange-800 p-2 rounded border border-orange-100 inline-block">
                  💡 {hotel.notes}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocsView;