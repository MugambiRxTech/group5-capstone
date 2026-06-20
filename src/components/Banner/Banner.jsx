export default function Banner({ weather, theme = 'dark' }) {
  const isDark = theme === 'dark'
  const shell = isDark ? 'border-white/10 bg-slate-900/50' : 'border-white/80 bg-white/75'
  const heading = isDark ? 'text-white' : 'text-slate-900'
  const muted = isDark ? 'text-slate-400' : 'text-slate-500'
  const card = isDark ? 'border-white/10 bg-slate-800/50' : 'border-slate-200/80 bg-white/60'

  const getWeatherIcon = (condition) => {
    if (condition.includes('Cloud')) return '☁️'
    if (condition.includes('Sunny') || condition.includes('Clear')) return '☀️'
    if (condition.includes('Rain')) return '🌧️'
    if (condition.includes('Storm')) return '⛈️'
    return '⛅'
  }

  const getRecommendation = (temp) => {
    if (temp > 80) return 'Perfect time for outdoor activities! Stay hydrated.'
    if (temp > 70) return 'Great weather for a walk or outdoor sports!'
    if (temp > 60) return 'Nice day! A light layer might be useful.'
    if (temp > 50) return 'Bring a jacket for your outdoor plans.'
    return "Bundle up! It's quite cold outside."
  }

  return (
    <div className={`overflow-hidden rounded-3xl border backdrop-blur-2xl shadow-2xl ${shell}`}>
      <div className="grid grid-cols-1 gap-6 p-6 lg:grid-cols-3">
        <div>
          <h2 className={`mb-1 text-xl font-bold ${heading}`}>📍 {weather.location}</h2>
          <p className={`text-sm ${muted}`}>
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </p>
        </div>

        <div className="text-center">
          <div className="text-5xl">{getWeatherIcon(weather.current.condition)}</div>
          <div className={`my-2 text-6xl font-bold ${heading}`}>
            {weather.current.temp}°<span className="text-2xl">F</span>
          </div>
          <p className={`font-semibold ${heading}`}>{weather.current.condition}</p>
          <p className={`text-sm ${muted}`}>Feels like {weather.current.feelsLike}°</p>
        </div>

        <div className={`rounded-2xl border p-4 ${card}`}>
          <p className="mb-1 text-sm font-semibold text-sky-600">✨ Today&apos;s Recommendation</p>
          <p className={`mb-4 text-sm ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            {getRecommendation(weather.current.temp)}
          </p>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className={`text-xs uppercase ${muted}`}>Humidity</p>
              <p className={`font-bold ${heading}`}>{weather.current.humidity}%</p>
            </div>
            <div>
              <p className={`text-xs uppercase ${muted}`}>Wind</p>
              <p className={`font-bold ${heading}`}>{weather.current.windSpeed} mph</p>
            </div>
          </div>
        </div>
      </div>

      <div className={`border-t p-6 ${isDark ? 'border-white/5' : 'border-slate-200/80'}`}>
        <p className={`mb-3 text-sm font-semibold ${muted}`}>Hourly Forecast</p>
        <div className="scrollbar-hide flex gap-3 overflow-x-auto">
          {weather.hourly.map((hour, idx) => (
            <div key={idx} className={`min-w-[80px] shrink-0 rounded-xl border p-3 text-center ${card}`}>
              <p className={`text-xs font-semibold ${muted}`}>{hour.time}</p>
              <p className="my-1 text-xl">{hour.condition}</p>
              <p className={`font-bold ${heading}`}>{hour.temp}°</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
