import { WeatherInfo } from '../types';
import { OUTFIT_ADVICE_DATABASE } from '../constants';
import { Shirt } from 'lucide-react';

interface Props {
  weather: WeatherInfo;
}

const WeatherWidget = ({ weather }: Props) => {
  const advice = OUTFIT_ADVICE_DATABASE.find(
    a => weather.avgTemp >= a.minTemp && weather.avgTemp < a.maxTemp
  ) || OUTFIT_ADVICE_DATABASE[1];

  return (
    <div className="bg-gradient-to-r from-blue-50 to-stone-50 rounded-xl p-4 mb-6 shadow-sm border border-stone-100 flex items-center gap-4 relative overflow-hidden group">
      <div className="text-4xl filter drop-shadow-sm transition-transform group-hover:scale-110 duration-300">
        {weather.icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2 mb-1">
          <span className="text-xl font-bold text-stone-700 font-mono tracking-tight">{weather.temp}</span>
        </div>
        <div className="flex items-start gap-1.5 text-xs text-stone-600 leading-snug bg-white/60 p-2 rounded-lg">
          <Shirt size={14} className="mt-0.5 shrink-0 text-indigo-500" />
          <span>
            <strong className="text-indigo-700 block mb-0.5">{advice.title}</strong>
            {advice.description}
          </span>
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;