import { Activity } from '../types';
import { X, Navigation, Utensils, Camera, ExternalLink, MapPin } from 'lucide-react';

interface Props {
  item: Activity | null;
  onClose: () => void;
}

const ActivityDetailModal = ({ item, onClose }: Props) => {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center pointer-events-none">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto transition-opacity" 
        onClick={onClose}
      />
      
      <div className="bg-white w-full max-w-lg sm:rounded-2xl rounded-t-2xl shadow-2xl pointer-events-auto max-h-[90vh] overflow-y-auto animate-fade-in flex flex-col relative">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 z-10 p-2 bg-black/30 text-white rounded-full hover:bg-black/50 transition-colors backdrop-blur-md"
        >
          <X size={20} />
        </button>

        {/* Hero Image */}
        <div className="relative h-64 shrink-0 bg-stone-200">
          {item.imageUrl ? (
            <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-stone-400 bg-stone-100">
              無圖片
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
          <div className="absolute bottom-4 left-6 right-6">
            <h2 className="text-2xl font-bold text-white shadow-black drop-shadow-md">{item.title}</h2>
            <div className="flex items-center text-white/90 text-sm mt-1 gap-1 font-medium">
              <MapPin size={14}/> {item.locationName}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 pb-12">
          {/* Description */}
          <div>
            <h3 className="text-lg font-bold text-stone-800 mb-2 border-l-4 border-red-800 pl-3">介紹</h3>
            <p className="text-stone-600 text-justify leading-relaxed whitespace-pre-line">
              {item.detailedDescription || item.description}
            </p>
          </div>

          {/* Photo Spots */}
          {item.photoSpots && item.photoSpots.length > 0 && (
            <div className="bg-indigo-50 rounded-xl p-4 border border-indigo-100">
              <h4 className="flex items-center gap-2 text-indigo-800 font-bold mb-2">
                <Camera size={18} /> 拍照攻略
              </h4>
              <ul className="list-disc list-inside text-sm text-indigo-900 space-y-1 ml-1">
                {item.photoSpots.map((spot, i) => <li key={i}>{spot}</li>)}
              </ul>
            </div>
          )}

          {/* Food Recommendations */}
          {item.menuRecommendations && item.menuRecommendations.length > 0 && (
            <div className="bg-orange-50 rounded-xl p-4 border border-orange-100">
              <h4 className="flex items-center gap-2 text-orange-800 font-bold mb-2">
                <Utensils size={18} /> 必吃推薦
              </h4>
              <div className="flex flex-wrap gap-2">
                {item.menuRecommendations.map((food, i) => (
                  <span key={i} className="text-xs bg-white text-orange-700 px-2.5 py-1 rounded-md border border-orange-200 font-medium shadow-sm">
                    {food}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="grid grid-cols-1 gap-3 pt-4 border-t border-stone-100">
            {item.navLink || item.locationName ? (
              <a 
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.navLink || item.locationName)}`} 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center justify-center gap-2 py-3 rounded-xl bg-blue-600 text-white font-bold shadow-lg shadow-blue-200 active:scale-95 transition-transform"
              >
                <Navigation size={18}/> 導航前往
              </a>
            ) : null}

            {item.tabelogUrl && (
              <a 
                href={item.tabelogUrl} 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center justify-center gap-2 py-3 rounded-xl bg-[#9c3016] text-white font-bold shadow-lg shadow-orange-200 active:scale-95 transition-transform"
              >
                <Utensils size={18}/> Tabelog 評分
              </a>
            )}

            {item.links?.map((link, i) => (
              <a 
                key={i}
                href={link.url} 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center justify-center gap-2 py-3 rounded-xl bg-stone-100 text-stone-700 font-bold border border-stone-200 active:scale-95 transition-transform"
              >
                <ExternalLink size={18}/> {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityDetailModal;