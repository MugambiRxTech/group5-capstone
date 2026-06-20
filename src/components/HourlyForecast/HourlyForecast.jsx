import { FaClock, FaChartBar, FaSun, FaCloudSun, FaCloud, FaCloudRain, FaMoon } from 'react-icons/fa'

export default function HourlyForecast({ forecast, theme = 'dark', weatherTheme }) {
  const isDark = theme === 'dark'

  const shell = isDark
    ? 'border-white/10 bg-slate-900/50 shadow-black/20'
    : 'border-white/80 bg-white/75 shadow-slate-900/10'

  const heading = isDark ? 'text-white' : 'text-slate-900'
  const muted = isDark ? 'text-slate-400' : 'text-slate-500'
  const itemBg = isDark
    ? 'border-white/10 bg-slate-800/50 hover:border-sky-500/30 hover:from-sky-500/20 hover:to-cyan-500/20'
    : 'border-slate-200/80 bg-white/60 hover:border-sky-300 hover:from-sky-50 hover:to-cyan-50'

  const getWeatherIcon = (icon) => {
    if (icon.includes('☀️') || icon.includes('sun')) return <FaSun className="text-3xl" style={{ color: weatherTheme.primary }} />
    if (icon.includes('⛅') || icon.includes('cloud')) return <FaCloudSun className="text-3xl" style={{ color: weatherTheme.primary }} />
    if (icon.includes('☁️')) return <FaCloud className="text-3xl" style={{ color: weatherTheme.primary }} />
    if (icon.includes('🌧️') || icon.includes('rain')) return <FaCloudRain className="text-3xl" style={{ color: weatherTheme.primary }} />
    if (icon.includes('🌙') || icon.includes('moon')) return <FaMoon className="text-3xl" style={{ color: weatherTheme.primary }} />
    return <FaSun className="text-3xl" style={{ color: weatherTheme.primary }} />
  }

  return (
    <div className={`flex flex-col overflow-hidden rounded-3xl border backdrop-blur-2xl shadow-2xl transition-all duration-300 hover:shadow-sky-500/10 ${shell}`} style={{ borderColor: `${weatherTheme.primary}30` }}>
      <div className={`flex items-center justify-between border-b p-5 ${isDark ? 'border-white/5' : 'border-slate-200/80'}`}>
        <h3 className={`flex items-center gap-2 text-lg font-bold ${heading}`}>
          <FaClock style={{ color: weatherTheme.primary }} /> Hourly Forecast
        </h3>
        <span className={`text-sm font-medium ${muted}`}>Next 8 Hours</span>
      </div>

      <div className="flex-1 p-5">
        <div className="scrollbar-hide flex gap-3 overflow-x-auto pb-2 h-full">
          {forecast.map((hour, idx) => (
            <div
                key={idx}
                className={`flex min-w-[96px] shrink-0 flex-col items-center gap-2 rounded-2xl border bg-gradient-to-br p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${itemBg}`}
                style={{ borderColor: `${weatherTheme.primary}30` }}
              >
              <p className={`text-sm font-semibold ${muted}`}>{hour.time}</p>
              {typeof hour.icon === 'string' ? getWeatherIcon(hour.icon) : hour.icon}
              <p className={`text-2xl font-bold ${heading}`}>{hour.temp}°</p>
              <p className={`text-center text-xs leading-tight ${muted}`}>{hour.condition}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="px-5 pb-5">
        <p className={`flex items-center justify-center gap-2 text-center text-sm ${muted}`}>
          <FaChartBar style={{ color: weatherTheme.primary }} /> Scroll for more hours →
        </p>
      </div>
    </div>
  )
}
