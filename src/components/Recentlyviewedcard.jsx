import React from 'react';
function getWeatherIcon(condition) {
  const c = (condition || '').toLowerCase();
  if (c.includes('sun') || c.includes('clear')) return '☀️';
  if (c.includes('cloud')) return '⛅';
  if (c.includes('rain')) return '🌧️';
  if (c.includes('snow')) return '❄️';
  if (c.includes('storm') || c.includes('thunder')) return '⛈️';
  if (c.includes('fog') || c.includes('mist')) return '🌫️';
  return '🌡️';
}
function RecentlyViewedCard({ item, onClick }) {
  const { city, country, condition, temperature, image } = item;
  const icon = getWeatherIcon(condition);
  return (
    <div
      onClick={() => onClick?.(item)}
      className="flex items-center gap-4 p-3 rounded-2xl hover:bg-gradient-to-r from-blue-50 to-cyan-50 dark:hover:from-slate-700 dark:hover:to-slate-700 cursor-pointer transition-all duration-300 group border border-transparent hover:border-blue-100 dark:hover:border-slate-600"
    >
      <div className="w-14 h-14 rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-700 flex-shrink-0 shadow-sm group-hover:shadow-md transition-shadow">
        {image ? (
          <img src={image} alt={city} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-2xl bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30">{icon}</div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-bold text-slate-800 dark:text-slate-100 truncate text-base">
          {city}{country && <span className="text-slate-500 dark:text-slate-400 font-semibold ml-1">, {country}</span>}
        </div>
        <div className="text-sm text-slate-500 dark:text-slate-400 truncate mt-1">
          {condition && <span className="flex items-center gap-1"><span>{icon}</span><span>{condition}</span></span>}
          {condition && temperature !== undefined && <span className="mx-2">•</span>}
          {temperature !== undefined && <span className="font-semibold text-blue-600 dark:text-blue-400">{Math.round(temperature)}°C</span>}
        </div>
      </div>
      <div className="text-slate-300 dark:text-slate-600 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition text-2xl flex-shrink-0 group-hover:translate-x-1 transform">
        →
      </div>
    </div>
  );
}
export default RecentlyViewedCard;
