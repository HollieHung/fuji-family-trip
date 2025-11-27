import { Activity, ActivityType } from '../types';
import { MapPin, Utensils, Bed, Camera, Flag, ShoppingBag, Car, ChevronRight, Star } from 'lucide-react';

interface Props {
  item: Activity;
  onClick: (item: Activity) => void;
}

const ItineraryCard = ({ item, onClick }: Props) => {
  const getIcon = () => {
    switch (item.type) {
      case ActivityType.Transport: return Car;
      case ActivityType.Food: return Utensils;
      case ActivityType.Hotel: return Bed;
      case ActivityType.Sightseeing: return Camera;
      case ActivityType.Shopping: return ShoppingBag;
      case ActivityType.Marathon: return Flag;
      case ActivityType.Mission: return Flag;
      default: return MapPin;
    }
  };

  const getBorderColor = () => {
    switch (item.type) {
      case ActivityType.Transport: return 'border-blue-400';
      case ActivityType.Food: return 'border-orange-400';
      case ActivityType.Hotel: return 'border-indigo-400';
      case ActivityType.Sightseeing: return 'border-green-400';
      case ActivityType.Shopping: return 'border-pink-400';
      case ActivityType.Marathon: return 'border-red-500';
      case ActivityType.Mission: return 'border-yellow-400';
      default: return 'border-stone-300';
    }
  };

  const Icon = getIcon();
  const isHighlight = item.tips && item.tips.length > 0;

  return (
    <div 
      onClick={() => onClick(item)}
      className={`relative bg-white rounded-r-xl p-4 mb-4 shadow-sm border-l-4 ${getBorderColor()} active:scale-95 transition-all cursor-pointer group hover:shadow-md`}
    >
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-2">
          <span className="font-mono text-lg font-bold text-stone-800">{item.time}</span>
          <div className={`px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1 bg-stone-100 text-stone-500`}>
            <Icon size={12} />
            {item.type}
          </div>
          {isHighlight && (
            <div className="px-2 py-0.5 rounded-full text-[10px] bg-red-100 text-red-600 font-bold flex gap-1 animate-pulse">
              <Star size={10} fill="currentColor"/>
              必推
            </div>
          )}
        </div>
        <ChevronRight size={18} className="text-stone-300 group-hover:text-stone-500 transition-colors" />
      </div>
      
      <h3 className="text-lg font-bold text-stone-800 leading-tight mb-1">{item.title}</h3>
      <p className="text-sm text-stone-600 line-clamp-2">{item.description}</p>
      
      {isHighlight && (
        <div className="flex flex-wrap gap-2 mt-3">
          {item.tips?.map((tip, idx) => (
            <span key={idx} className="text-[10px] bg-yellow-50 text-yellow-800 px-2 py-1 rounded border border-yellow-100 font-medium">
              ★ {tip}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default ItineraryCard;