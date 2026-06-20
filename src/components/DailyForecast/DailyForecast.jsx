import { FaCalendarAlt, FaTint, FaSun, FaCloudSun, FaCloud, FaCloudRain, FaMoon } from 'react-icons/fa'

function getDayAbbreviation(day) {
  if (day.toLowerCase().includes('today')) return 'Today'
  if (day.toLowerCase().includes('tomorrow')) return 'Tom'
  const dayMap = {
    'monday': 'Mon', 'tuesday': 'Tue', 'wednesday': 'Wed',
    'thursday': 'Thu', 'friday': 'Fri', 'saturday': 'Sat', 'sunday': 'Sun'
  }
  for (const [key, value] of Object.entries(dayMap)) {
    if (day.toLowerCase().includes(key)) return value
  }
  return day.slice(0, 3)
}

export default function DailyForecast({ forecast, theme = 'dark', weatherTheme }) {
  const isDark = theme === 'dark'

  const shell = isDark
    ? 'border-white/10 bg-slate-900/50 shadow-black/20'
    : 'border-white/80 bg-white/75 shadow-slate-900/10'

  const heading = isDark ? 'text-white' : 'text-slate-900'
  const muted = isDark ? 'text-slate-400' : 'text-slate-500'
  const lowTemp = isDark ? 'text-slate-300' : 'text-slate-600'

  const getWeatherIcon = (icon) => {
    if (icon.includes('☀️') || icon.includes('sun')) return <FaSun className="text-2xl" style={{ color: weatherTheme.primary }} />
    if (icon.includes('⛅') || icon.includes('cloud')) return <FaCloudSun className="text-2xl" style={{ color: weatherTheme.primary }} />
    if (icon.includes('☁️')) return <FaCloud className="text-2xl" style={{ color: weatherTheme.primary }} />
    if (icon.includes('🌧️') || icon.includes('rain')) return <FaCloudRain className="text-2xl" style={{ color: weatherTheme.primary }} />
    if (icon.includes('🌙') || icon.includes('moon')) return <FaMoon className="text-2xl" style={{ color: weatherTheme.primary }} />
    return <FaSun className="text-2xl" style={{ color: weatherTheme.primary }} />
  }

  return (
    <div className={`overflow-hidden rounded-3xl border backdrop-blur-2xl shadow-2xl transition-all duration-300 hover:shadow-sky-500/10 ${shell}`} style={{ borderColor: `${weatherTheme.primary}30` }}>
      <div className={`border-b p-5 ${isDark ? 'border-white/5' : 'border-slate-200/80'}`}>
        <h3 className={`flex items-center gap-2 text-lg font-bold ${heading}`}>
          <FaCalendarAlt style={{ color: weatherTheme.primary }} /> 5-Day Forecast
        </h3>
      </div>

      <div className="p-5">
        {/* Days Row */}
        <div className="flex gap-2">
          {forecast.map((day, idx) => (
            <div
              key={idx}
              className={`flex-1 flex flex-col items-center gap-2 rounded-2xl border p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${
                isDark 
                  ? 'border-white/10 bg-slate-800/50 hover:bg-slate-800/70' 
                  : 'border-slate-200/80 bg-white/60 hover:bg-white/80'
              }`}
              style={{ borderColor: `${weatherTheme.primary}30` }}
            >
              <p className={`text-sm font-semibold ${muted}`}>{getDayAbbreviation(day.day)}</p>
              <div className="h-10 flex items-center justify-center">
                {typeof day.icon === 'string' ? getWeatherIcon(day.icon) : day.icon}
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-base font-bold ${heading}`}>{day.high}°</span>
                <span className={`text-sm font-semibold ${lowTemp}`}>{day.low}°</span>
              </div>
              <div className={`flex items-center gap-1 text-xs ${muted}`}>
                <FaTint style={{ color: weatherTheme.primary }} />
                {day.precipitation}%
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
