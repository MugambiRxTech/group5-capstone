export default function Weather({ weatherData, theme = 'dark' }) {
  const isDark = theme === 'dark'
  const shell = isDark ? 'border-white/10 bg-slate-900/50' : 'border-white/80 bg-white/75'
  const heading = isDark ? 'text-white' : 'text-slate-900'
  const card = isDark ? 'border-white/10 bg-slate-800/50' : 'border-slate-200/80 bg-white/60'

  const metrics = [
    { icon: '💧', label: 'Humidity', value: `${weatherData.current.humidity}%` },
    { icon: '💨', label: 'Wind Speed', value: `${weatherData.current.windSpeed} mph` },
    { icon: '☀️', label: 'UV Index', value: weatherData.current.uvi },
    { icon: '👁️', label: 'Visibility', value: `${weatherData.current.visibility} mi` },
    { icon: '🔽', label: 'Pressure', value: `${weatherData.current.pressure} mb` },
    { icon: '🌡️', label: 'Feels Like', value: `${weatherData.current.feelsLike}°F` },
  ]

  return (
    <div className={`rounded-3xl border p-6 backdrop-blur-2xl shadow-2xl ${shell}`}>
      <h3 className={`mb-5 text-lg font-bold ${heading}`}>📊 Weather Metrics</h3>

      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {metrics.map((metric) => (
          <div key={metric.label} className={`flex items-center gap-3 rounded-2xl border p-4 ${card}`}>
            <div className="text-2xl">{metric.icon}</div>
            <div>
              <p className={`text-xs font-semibold uppercase ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{metric.label}</p>
              <p className={`text-lg font-bold text-sky-600`}>{metric.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div>
        <p className={`mb-3 text-sm font-semibold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>5-Day Forecast</p>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
          {weatherData.daily.map((day, idx) => (
            <div key={idx} className={`rounded-xl border p-3 text-center ${card}`}>
              <p className={`text-sm font-bold ${heading}`}>{day.day}</p>
              <p className="my-1 text-2xl">{day.condition}</p>
              <div className="flex justify-center gap-2 text-sm font-semibold">
                <span className="text-sky-600">{day.high}°</span>
                <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>{day.low}°</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
