import React from 'react';
import { 
  LuSun, 
  LuCloud, 
  LuCloudRain, 
  LuSnowflake, 
  LuCloudLightning, 
  LuCloudFog, 
  LuThermometer, 
  LuDroplets, 
  LuWind, 
  LuCalendar, 
  LuTrash2, 
  LuPlus 
} from 'react-icons/lu';

function getAdvisoryStyle(type) {
  switch (type) {
    case 'ideal':
      return 'bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 dark:from-blue-900/40 dark:to-cyan-900/40 dark:text-blue-300 border border-blue-200 dark:border-blue-800/50';
    case 'warning':
      return 'bg-gradient-to-r from-orange-100 to-amber-100 text-orange-700 dark:from-orange-900/40 dark:to-amber-900/40 dark:text-orange-300 border border-orange-200 dark:border-orange-800/50';
    case 'danger':
      return 'bg-gradient-to-r from-red-100 to-rose-100 text-red-700 dark:from-red-900/40 dark:to-rose-900/40 dark:text-red-300 border border-red-200 dark:border-red-800/50';
    default:
      return 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 border border-slate-200 dark:border-slate-700';
  }
}

function getWeatherIcon(condition) {
  const c = (condition || '').toLowerCase();
  if (c.includes('sun') || c.includes('clear')) return <LuSun className="text-2xl" />;
  if (c.includes('cloud')) return <LuCloud className="text-2xl" />;
  if (c.includes('rain')) return <LuCloudRain className="text-2xl" />;
  if (c.includes('snow')) return <LuSnowflake className="text-2xl" />;
  if (c.includes('storm') || c.includes('thunder')) return <LuCloudLightning className="text-2xl" />;
  if (c.includes('fog') || c.includes('mist')) return <LuCloudFog className="text-2xl" />;
  return <LuThermometer className="text-2xl" />;
}

export function EmptyBookmarkCard({ onAdd }) {
  return (
    <div
      onClick={onAdd}
      className="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-3xl flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 dark:hover:border-blue-500 hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-all duration-300 min-h-[320px] group"
    >
      <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 dark:text-slate-500 group-hover:bg-gradient-to-br group-hover:from-blue-500 group-hover:to-cyan-500 group-hover:text-white transition-all duration-300 mb-4 shadow-lg group-hover:shadow-blue-500/40">
        <LuPlus className="text-3xl" />
      </div>
      <span className="text-base font-semibold text-slate-600 dark:text-slate-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">
        Add New Location
      </span>
      <span className="text-sm text-slate-400 dark:text-slate-500 mt-2">
        Start tracking your favorite cities
      </span>
    </div>
  );
}

function BookmarkCard({ bookmark, onRemove, onClick }) {
  const { id, city, country, eventLabel, image, temperature, condition, humidity, wind, advisory, advisoryType } = bookmark;
  const icon = getWeatherIcon(condition);
  const advisoryStyle = getAdvisoryStyle(advisoryType);
  
  return (
    <div
      className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer group hover:-translate-y-1"
      onClick={() => onClick?.(bookmark)}
    >
      <div className="relative h-48 bg-slate-200 dark:bg-slate-800">
        {image ? (
          <img src={image} alt={city} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-6xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900">
            {icon}
          </div>
        )}
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        
        {/* Temperature badge */}
        {temperature !== undefined && (
          <div className="absolute top-4 right-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl text-slate-800 dark:text-slate-100 text-sm font-bold px-4 py-2 rounded-2xl flex items-center gap-2 shadow-2xl border border-white/20">
            {icon}
            <span>{Math.round(temperature)}°C</span>
          </div>
        )}
        
        {/* Remove button */}
        <button
          onClick={(e) => { e.stopPropagation(); onRemove?.(id); }}
          className="absolute top-4 left-4 w-10 h-10 rounded-xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl flex items-center justify-center text-slate-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 transition-all duration-200 shadow-lg opacity-0 group-hover:opacity-100"
        >
          <LuTrash2 className="text-xl" />
        </button>
      </div>
      
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div>
            <div className="font-bold text-slate-800 dark:text-slate-100 text-xl leading-tight">
              {city}{country && <span className="text-slate-500 dark:text-slate-400 font-semibold ml-1">, {country}</span>}
            </div>
            {eventLabel && (
              <div className="mt-2">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 border border-blue-200 dark:border-blue-800/50">
                  <LuCalendar className="text-sm" />
                  {eventLabel}
                </span>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
            {humidity !== undefined && (
              <div className="flex items-center gap-2">
                <LuDroplets className="text-lg" />
                <span className="font-semibold">{humidity}%</span>
              </div>
            )}
            {wind !== undefined && (
              <div className="flex items-center gap-2">
                <LuWind className="text-lg" />
                <span className="font-semibold">{wind} km/h</span>
              </div>
            )}
            {condition && !humidity && !wind && <span>{condition}</span>}
          </div>
          {advisory && (
            <span className={`text-xs font-bold px-3.5 py-1.5 rounded-xl ${advisoryStyle}`}>
              {advisory}
            </span>
          )}
        </div>
        
        {/* View forecast button (hover) */}
        <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <button className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold text-sm hover:from-blue-700 hover:to-cyan-700 transition-all duration-200">
            View Detailed Forecast →
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookmarkCard;
