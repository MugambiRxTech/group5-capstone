import { FaMapMarkerAlt, FaSun, FaCloudSun, FaCloud, FaCloudRain, FaMoon, FaTint, FaWind, FaEye } from 'react-icons/fa'

function getTimeOfDay() {
  const hour = new Date().getHours()
  if (hour < 12) return 'Morning'
  if (hour < 18) return 'Afternoon'
  return 'Evening'
}

export default function Hero({ weather, theme = 'dark', isNight, weatherTheme }) {
  const isDark = theme === 'dark'

  const getWeatherStyles = () => {
    const condition = weather.condition
    
    if (isNight) {
      switch (condition) {
        case 'Rainy':
          return {
            bg: 'bg-gradient-to-b from-slate-950 via-slate-800 to-blue-950',
            animation: 'animate-pulse',
            particles: (
              <div className="absolute inset-0 overflow-hidden">
                {Array.from({ length: 30 }).map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-0.5 h-2 bg-blue-300 rounded-full animate-fall"
                    style={{
                      left: `${Math.random() * 100}%`,
                      animationDelay: `${Math.random() * 1}s`,
                      animationDuration: `${0.8 + Math.random() * 0.5}s`
                    }}
                  />
                ))}
              </div>
            )
          }
        case 'Cloudy':
          return {
            bg: 'bg-gradient-to-b from-slate-900 via-slate-800 to-slate-700',
            animation: '',
            particles: (
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-10 left-10 w-32 h-12 bg-slate-600/50 rounded-full blur-md animate-drift" />
                <div className="absolute top-20 right-20 w-40 h-14 bg-slate-500/40 rounded-full blur-md animate-drift" style={{ animationDelay: '-2s' }} />
                <div className="absolute top-32 left-1/2 w-28 h-10 bg-slate-600/45 rounded-full blur-md animate-drift" style={{ animationDelay: '-4s' }} />
              </div>
            )
          }
        default:
          return {
            bg: 'bg-gradient-to-b from-indigo-950 via-slate-900 to-slate-800',
            animation: '',
            particles: (
              <div className="absolute inset-0 overflow-hidden">
                {Array.from({ length: 60 }).map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-1 bg-white rounded-full animate-twinkle"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 60}%`,
                      animationDelay: `${Math.random() * 3}s`,
                      opacity: 0.3 + Math.random() * 0.7
                    }}
                  />
                ))}
              </div>
            )
          }
      }
    }

    switch (condition) {
      case 'Sunny':
        return {
          bg: 'bg-gradient-to-b from-blue-400 via-sky-300 to-amber-100',
          animation: 'animate-pulse-slow',
          particles: (
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-12 right-16 w-24 h-24 bg-yellow-300 rounded-full blur-2xl animate-pulse" />
              <div className="absolute top-10 right-14 w-16 h-16 bg-yellow-200 rounded-full blur-xl animate-pulse" style={{ animationDelay: '0.5s' }} />
            </div>
          )
        }
      case 'Cloudy':
        return {
          bg: 'bg-gradient-to-b from-slate-300 via-slate-200 to-slate-100',
          animation: '',
          particles: (
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-8 left-8 w-36 h-14 bg-white/70 rounded-full blur-md animate-drift" />
              <div className="absolute top-16 right-12 w-44 h-16 bg-white/60 rounded-full blur-md animate-drift" style={{ animationDelay: '-1.5s' }} />
              <div className="absolute top-28 left-1/3 w-32 h-12 bg-white/65 rounded-full blur-md animate-drift" style={{ animationDelay: '-3s' }} />
            </div>
          )
        }
      case 'Rainy':
        return {
          bg: 'bg-gradient-to-b from-slate-700 via-slate-600 to-blue-900',
          animation: 'animate-pulse',
          particles: (
            <div className="absolute inset-0 overflow-hidden">
              {Array.from({ length: 40 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute w-0.5 h-2 bg-blue-400 rounded-full animate-fall"
                  style={{
                    left: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 0.8}s`,
                    animationDuration: `${0.6 + Math.random() * 0.4}s`
                  }}
                />
              ))}
            </div>
          )
        }
      case 'Partly Cloudy':
        return {
          bg: 'bg-gradient-to-b from-sky-400 via-blue-200 to-indigo-100',
          animation: 'animate-pulse-slow',
          particles: (
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-10 right-10 w-20 h-20 bg-yellow-200/60 rounded-full blur-xl animate-pulse" />
              <div className="absolute top-12 left-1/4 w-32 h-12 bg-white/60 rounded-full blur-md animate-drift" />
            </div>
          )
        }
      default:
        return {
          bg: 'bg-gradient-to-b from-blue-400 via-sky-300 to-amber-100',
          animation: 'animate-pulse-slow',
          particles: (
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-12 right-16 w-24 h-24 bg-yellow-300 rounded-full blur-2xl animate-pulse" />
            </div>
          )
        }
    }
  }

  const getWeatherIcon = () => {
    const condition = weather.condition
    
    if (isNight) {
      switch (condition) {
        case 'Rainy':
          return <FaCloudRain className="text-6xl" style={{ color: weatherTheme.primary }} />
        case 'Cloudy':
          return <FaCloud className="text-6xl" style={{ color: weatherTheme.primary }} />
        default:
          return <FaMoon className="text-6xl" style={{ color: weatherTheme.primary }} />
      }
    }

    switch (condition) {
      case 'Sunny':
        return <FaSun className="text-6xl" style={{ color: weatherTheme.primary }} />
      case 'Cloudy':
        return <FaCloud className="text-6xl" style={{ color: weatherTheme.primary }} />
      case 'Rainy':
        return <FaCloudRain className="text-6xl" style={{ color: weatherTheme.primary }} />
      case 'Partly Cloudy':
        return <FaCloudSun className="text-6xl" style={{ color: weatherTheme.primary }} />
      default:
        return <FaSun className="text-6xl" style={{ color: weatherTheme.primary }} />
    }
  }

  const weatherStyles = getWeatherStyles()
  const weatherIcon = getWeatherIcon()
  const textColor = isDark ? 'text-white' : 'text-slate-900'
  const subtextColor = isDark ? 'text-slate-200' : 'text-slate-700'
  const smallTextColor = isDark ? 'text-slate-300' : 'text-slate-600'

  return (
    <section className="relative mx-auto max-w-7xl px-0 pb-2 pt-2">
      <div className={`relative overflow-hidden rounded-3xl border backdrop-blur-2xl ${weatherStyles.bg} transition-all duration-1000 ${weatherStyles.animation}`} style={{ borderColor: `${weatherTheme.primary}30` }}>
        {/* Weather Particles/Animations */}
        {weatherStyles.particles}
        
        {/* Overlay for readability */}
        <div className={`absolute inset-0 ${isDark ? 'bg-black/30' : 'bg-white/10'}`} />

        <div className="relative z-10 p-8 md:p-10">
          <div className="flex flex-col gap-6">
            {/* Top Left Section: Temperature and City */}
            <div className="flex flex-col items-start gap-2">
              <div className={`text-7xl md:text-8xl font-bold tracking-tighter ${textColor}`}>
                {weather.temp}°
              </div>
              <div className="flex items-center gap-2">
                <FaMapMarkerAlt className={isDark ? 'text-sky-400' : 'text-sky-500'} />
                <span className={`text-lg font-medium ${textColor}`}>
                  {weather.location}
                </span>
              </div>
            </div>

            {/* Weather Condition and Icon */}
            <div className="flex items-center gap-4">
              <div className={isDark ? 'text-white' : 'text-sky-500'}>
                {weatherIcon}
              </div>
              <div className={`text-2xl font-semibold ${textColor}`}>
                {weather.condition}
              </div>
            </div>

            {/* Small Metrics: Feels Like, Humidity, Wind, Visibility */}
            <div className="flex flex-wrap gap-6 text-sm">
              <div className="flex flex-col">
                <span className={`text-xs font-medium uppercase tracking-wider ${smallTextColor}`}>Feels Like</span>
                <span className={`font-semibold ${textColor}`}>{weather.feelsLike}°</span>
              </div>
              
              <div className="flex items-center gap-2">
                <FaTint style={{ color: weatherTheme.primary }} />
                <div className="flex flex-col">
                  <span className={`text-xs font-medium uppercase tracking-wider ${smallTextColor}`}>Humidity</span>
                  <span className={`font-semibold ${textColor}`}>{weather.humidity}%</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <FaWind style={{ color: weatherTheme.primary }} />
                <div className="flex flex-col">
                  <span className={`text-xs font-medium uppercase tracking-wider ${smallTextColor}`}>Wind</span>
                  <span className={`font-semibold ${textColor}`}>{weather.windSpeed} mph</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <FaEye style={{ color: weatherTheme.primary }} />
                <div className="flex flex-col">
                  <span className={`text-xs font-medium uppercase tracking-wider ${smallTextColor}`}>Visibility</span>
                  <span className={`font-semibold ${textColor}`}>{weather.visibility} mi</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Global Styles for Animations */}
      <style jsx>{`
        @keyframes fall {
          0% { transform: translateY(-20px); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
        @keyframes drift {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(20px); }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        .animate-fall {
          animation: fall linear infinite;
        }
        .animate-drift {
          animation: drift 6s ease-in-out infinite;
        }
        .animate-twinkle {
          animation: twinkle 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  )
}
