import { useState } from 'react';
import { ITINERARY } from '../constants';
import { Activity } from '../types';
import WeatherWidget from '../components/WeatherWidget';
import ItineraryCard from '../components/ItineraryCard';
import ActivityDetailModal from '../components/ActivityDetailModal';

const ItineraryView = () => {
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);

  const currentDay = ITINERARY[selectedDayIndex];

  return (
    <div className="pb-24 min-h-screen">
      {/* Header Image */}
      <div className="relative h-56 w-full shadow-sm overflow-hidden">
        <img 
          src="https://tw.wamazing.com/media/wp-content/uploads/sites/4/2019/08/kawaguchiko-koyo_44532026_M.jpg.webp" 
          alt="Fuji Autumn" 
          className="w-full h-full object-cover animate-fade-in" 
        />
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute bottom-4 left-6">
          <h1 className="text-3xl font-bold text-white serif drop-shadow-lg">家族之旅</h1>
          <p className="text-white font-bold drop-shadow text-sm tracking-widest opacity-90">2025 東京與富士山</p>
        </div>
      </div>

      {/* Day Selector */}
      <div className="sticky top-0 z-40 bg-[#fcfaf5]/95 backdrop-blur border-b border-stone-200 shadow-sm">
        <div className="flex overflow-x-auto hide-scrollbar py-3 px-4 gap-3">
          {ITINERARY.map((day, index) => {
            const isSelected = index === selectedDayIndex;
            return (
              <button
                key={index}
                onClick={() => setSelectedDayIndex(index)}
                className={`shrink-0 flex flex-col items-center justify-center w-14 h-16 rounded-xl border transition-all duration-300 ${
                  isSelected 
                    ? 'bg-red-800 text-white scale-105 shadow-md border-red-900' 
                    : 'bg-white text-stone-500 border-stone-200 hover:border-red-300'
                }`}
              >
                <span className="text-xs font-bold">{day.date}</span>
                <span className="text-sm font-medium">{day.dayOfWeek}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 py-6 max-w-md mx-auto animate-fade-in" key={selectedDayIndex}>
        <div className="mb-6">
          <h2 className="text-xl font-bold text-stone-800 mb-1 serif">{currentDay.title}</h2>
        </div>

        <WeatherWidget weather={currentDay.weather} />

        <div className="pl-6 border-l-2 border-stone-200 space-y-6 relative">
           {/* Timeline Line Fix */}
          <div className="absolute top-0 bottom-0 left-[-1px] w-0.5 bg-stone-200"></div>
          
          {currentDay.activities.map((item) => (
            <ItineraryCard 
              key={item.id} 
              item={item} 
              onClick={setSelectedActivity} 
            />
          ))}
        </div>

        <div className="flex justify-center mt-8 text-stone-300">
          <span className="tracking-[0.5em] text-sm">✤✤✤</span>
        </div>
      </div>

      <ActivityDetailModal 
        item={selectedActivity} 
        onClose={() => setSelectedActivity(null)} 
      />
    </div>
  );
};

export default ItineraryView;