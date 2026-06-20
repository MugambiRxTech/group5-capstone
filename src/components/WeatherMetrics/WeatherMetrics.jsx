import { FaTint, FaWind, FaSun, FaEye, FaThermometerHalf, FaChartArea } from 'react-icons/fa'

export default function WeatherMetrics({ weather, theme = 'dark', weatherTheme }) {
  const isDark = theme === 'dark'

  const shell = isDark
    ? 'border-white/10 bg-slate-900/50 shadow-black/20'
    : 'border-white/80 bg-white/75 shadow-slate-900/10'

  const heading = isDark ? 'text-white' : 'text-slate-900'
  const label = isDark ? 'text-slate-400' : 'text-slate-500'

  const metrics = [
    { icon: <FaTint className="text-xl" style={{ color: weatherTheme.primary }} />, label: 'Humidity', value: `${weather.humidity}%` },
    { icon: <FaWind className="text-xl" style={{ color: weatherTheme.primary }} />, label: 'Wind', value: `${weather.windSpeed} mph` },
    { icon: <FaSun className="text-xl" style={{ color: weatherTheme.primary }} />, label: 'UV', value: weather.uvi },
    { icon: <FaEye className="text-xl" style={{ color: weatherTheme.primary }} />, label: 'Visibility', value: `${weather.visibility} mi` },
    { icon: <FaChartArea className="text-xl" style={{ color: weatherTheme.primary }} />, label: 'Pressure', value: `${weather.pressure} mb` },
    { icon: <FaThermometerHalf className="text-xl" style={{ color: weatherTheme.primary }} />, label: 'Dew Point', value: `${weather.dewPoint}°` },
  ]

  return (
    <div className={`flex flex-col overflow-hidden rounded-3xl border backdrop-blur-2xl shadow-2xl transition-all duration-300 hover:shadow-sky-500/10 ${shell}`} style={{ borderColor: `${weatherTheme.primary}30` }}>
      <div className={`border-b p-5 ${isDark ? 'border-white/5' : 'border-slate-200/80'}`}>
        <h3 className={`flex items-center gap-2 text-lg font-bold ${heading}`}>
          <FaChartArea style={{ color: weatherTheme.primary }} /> Weather Metrics
        </h3>
      </div>

      <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-3 p-5">
        {metrics.map((metric) => (
          <div
              key={metric.label}
              className={`flex flex-col items-center gap-2 rounded-2xl border p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${
                isDark 
                  ? 'border-white/10 bg-slate-800/50 hover:bg-slate-800/70' 
                  : 'border-slate-200/80 bg-white/60 hover:bg-white/80'
              }`}
              style={{ borderColor: `${weatherTheme.primary}30` }}
            >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl">
              {metric.icon}
            </div>
            <p className={`text-xs font-bold uppercase tracking-wider ${label}`}>{metric.label}</p>
            <p className={`text-lg font-bold ${heading}`}>{metric.value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
