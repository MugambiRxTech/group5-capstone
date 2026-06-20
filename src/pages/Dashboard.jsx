import { useState, useEffect } from 'react'
import Header from '../components/Header/Header'
import Hero from '../components/Hero/Hero'
import WeatherMetrics from '../components/WeatherMetrics/WeatherMetrics'
import HourlyForecast from '../components/HourlyForecast/HourlyForecast'
import DailyForecast from '../components/DailyForecast/DailyForecast'
import AlertsPanel from '../components/AlertsPanel/AlertsPanel'
import ClothingWidget from '../components/ClothingWidget/ClothingWidget'

const MOCK_HOURLY = [
  { time: 'Now', icon: '⛅', temp: 18, condition: 'Partly Cloudy' },
  { time: '1 PM', icon: '☀️', temp: 20, condition: 'Sunny' },
  { time: '2 PM', icon: '☀️', temp: 22, condition: 'Sunny' },
  { time: '3 PM', icon: '⛅', temp: 21, condition: 'Partly Cloudy' },
  { time: '4 PM', icon: '☁️', temp: 19, condition: 'Cloudy' },
  { time: '5 PM', icon: '☁️', temp: 17, condition: 'Cloudy' },
  { time: '6 PM', icon: '🌙', temp: 15, condition: 'Clear' },
  { time: '7 PM', icon: '🌙', temp: 13, condition: 'Clear' },
]

const MOCK_DAILY = [
  { day: 'Today', condition: 'Partly Cloudy', icon: '⛅', high: 22, low: 14, precipitation: 10 },
  { day: 'Tomorrow', condition: 'Sunny', icon: '☀️', high: 24, low: 16, precipitation: 5 },
  { day: 'Wed', condition: 'Cloudy', icon: '☁️', high: 18, low: 13, precipitation: 20 },
  { day: 'Thu', condition: 'Rainy', icon: '🌧️', high: 15, low: 11, precipitation: 80 },
  { day: 'Fri', condition: 'Partly Cloudy', icon: '⛅', high: 20, low: 12, precipitation: 15 },
]

const MOCK_ALERTS = [
  {
    id: 1,
    type: 'warning',
    title: 'High UV Index',
    message: 'UV index expected to reach 8 this afternoon. Wear sunscreen and limit direct sun exposure.',
  },
  {
    id: 2,
    type: 'info',
    title: 'Coastal Breeze',
    message: 'West winds 10–15 mph may make it feel cooler near the waterfront this evening.',
  },
]

const MOCK_CLOTHING = {
  temp: 18,
  condition: 'Partly Cloudy',
  items: ['T-shirt', 'Light jacket', 'Jeans', 'Sneakers', 'Sunglasses'],
}

export default function Dashboard() {
  const [user, setUser] = useState(null)
  const [showLoginModal, setShowLoginModal] = useState(false)

  const [weatherData, setWeatherData] = useState({
    location: 'San Francisco, CA',
    condition: 'Partly Cloudy',
    temp: 18,
    humidity: 62,
    windSpeed: 12,
    windDirection: 'W',
    visibility: 10,
    uvi: 6,
    uvForecast: 'High this afternoon',
    pressure: 1013,
    dewPoint: 12,
    feelsLike: 17,
  })

  const [isNight, setIsNight] = useState(false)

  useEffect(() => {
    const hour = new Date().getHours()
    setIsNight(hour < 6 || hour > 18)
  }, [])

  const isDarkTheme = isNight || weatherData.condition === 'Rainy'
  const theme = isDarkTheme ? 'dark' : 'light'

  const handleSearch = (location) => {
    setWeatherData((prev) => ({ ...prev, location }))
  }

  const getBackgroundClasses = () => {
    const { condition } = weatherData

    if (isNight) {
      switch (condition) {
        case 'Rainy':
          return 'from-slate-950 via-slate-900 to-blue-950'
        case 'Cloudy':
          return 'from-slate-950 via-slate-900 to-slate-800'
        default:
          return 'from-indigo-950 via-slate-950 to-slate-900'
      }
    }

    switch (condition) {
      case 'Sunny':
        return 'from-sky-400 via-sky-300 to-amber-200'
      case 'Cloudy':
        return 'from-slate-300 via-slate-200 to-slate-100'
      case 'Rainy':
        return 'from-slate-700 via-slate-600 to-blue-900'
      case 'Partly Cloudy':
        return 'from-sky-300 via-blue-200 to-indigo-100'
      default:
        return 'from-sky-400 via-sky-300 to-amber-200'
    }
  }

  const getWeatherTheme = () => {
    const { condition } = weatherData

    if (isNight) {
      switch (condition) {
        case 'Rainy':
          return { primary: '#3b82f6', secondary: '#1d4ed8', accent: '#60a5fa' }
        case 'Cloudy':
          return { primary: '#64748b', secondary: '#475569', accent: '#94a3b8' }
        default:
          return { primary: '#8b5cf6', secondary: '#7c3aed', accent: '#a78bfa' }
      }
    }

    switch (condition) {
      case 'Sunny':
        return { primary: '#f59e0b', secondary: '#d97706', accent: '#fbbf24' }
      case 'Cloudy':
        return { primary: '#64748b', secondary: '#475569', accent: '#94a3b8' }
      case 'Rainy':
        return { primary: '#3b82f6', secondary: '#1d4ed8', accent: '#60a5fa' }
      case 'Partly Cloudy':
        return { primary: '#0ea5e9', secondary: '#0284c7', accent: '#38bdf8' }
      default:
        return { primary: '#f59e0b', secondary: '#d97706', accent: '#fbbf24' }
    }
  }

  const getAmbientGlows = () => {
    const { condition } = weatherData

    if (isNight) {
      switch (condition) {
        case 'Rainy':
          return (
            <>
              <div className="pointer-events-none absolute top-0 left-0 h-[520px] w-[520px] -translate-x-1/3 -translate-y-1/3 rounded-full bg-blue-500/20 blur-[120px] animate-pulse-slow" />
              <div className="pointer-events-none absolute bottom-0 right-0 h-[420px] w-[420px] translate-x-1/4 translate-y-1/4 rounded-full bg-indigo-500/15 blur-[100px] animate-pulse-slow" style={{ animationDelay: '1.5s' }} />
            </>
          )
        case 'Cloudy':
          return (
            <>
              <div className="pointer-events-none absolute top-0 left-0 h-[500px] w-[500px] -translate-x-1/3 -translate-y-1/3 rounded-full bg-slate-500/15 blur-[110px] animate-pulse-slow" />
              <div className="pointer-events-none absolute bottom-0 right-0 h-[400px] w-[400px] translate-x-1/4 translate-y-1/4 rounded-full bg-slate-400/10 blur-[90px] animate-pulse-slow" style={{ animationDelay: '1.5s' }} />
            </>
          )
        default:
          return (
            <>
              <div className="pointer-events-none absolute top-0 left-0 h-[520px] w-[520px] -translate-x-1/3 -translate-y-1/3 rounded-full bg-indigo-500/20 blur-[120px] animate-pulse-slow" />
              <div className="pointer-events-none absolute bottom-0 right-0 h-[420px] w-[420px] translate-x-1/4 translate-y-1/4 rounded-full bg-violet-500/15 blur-[100px] animate-pulse-slow" style={{ animationDelay: '1.5s' }} />
            </>
          )
      }
    }

    switch (condition) {
      case 'Sunny':
        return (
          <>
            <div className="pointer-events-none absolute -top-20 right-0 h-[560px] w-[560px] translate-x-1/4 rounded-full bg-yellow-300/50 blur-[130px]" />
            <div className="pointer-events-none absolute bottom-0 left-0 h-[480px] w-[480px] -translate-x-1/4 translate-y-1/4 rounded-full bg-orange-200/40 blur-[110px]" />
          </>
        )
      case 'Cloudy':
        return (
          <>
            <div className="pointer-events-none absolute top-0 left-0 h-[500px] w-[500px] -translate-x-1/3 -translate-y-1/3 rounded-full bg-white/50 blur-[100px]" />
            <div className="pointer-events-none absolute bottom-0 right-0 h-[420px] w-[420px] translate-x-1/4 translate-y-1/4 rounded-full bg-slate-300/40 blur-[90px]" />
          </>
        )
      case 'Rainy':
        return (
          <>
            <div className="pointer-events-none absolute top-0 left-0 h-[500px] w-[500px] -translate-x-1/3 -translate-y-1/3 rounded-full bg-blue-400/25 blur-[110px] animate-pulse-slow" />
            <div className="pointer-events-none absolute bottom-0 right-0 h-[420px] w-[420px] translate-x-1/4 translate-y-1/4 rounded-full bg-cyan-500/20 blur-[90px] animate-pulse-slow" style={{ animationDelay: '1.5s' }} />
          </>
        )
      case 'Partly Cloudy':
        return (
          <>
            <div className="pointer-events-none absolute top-0 right-0 h-[500px] w-[500px] -translate-x-1/4 -translate-y-1/4 rounded-full bg-yellow-200/45 blur-[110px]" />
            <div className="pointer-events-none absolute bottom-0 left-0 h-[420px] w-[420px] -translate-x-1/4 translate-y-1/4 rounded-full bg-sky-200/50 blur-[90px]" />
          </>
        )
      default:
        return null
    }
  }

  return (
    <div
      className={`relative isolate min-h-screen overflow-hidden bg-gradient-to-br pb-32 transition-all duration-1000 ${getBackgroundClasses()} ${isDarkTheme ? 'text-white' : 'text-slate-900'}`}
    >
      <div
        className={`pointer-events-none absolute inset-0 z-0 ${
          isDarkTheme
            ? 'bg-[radial-gradient(ellipse_70%_45%_at_15%_0%,rgba(99,102,241,0.22),transparent_55%),radial-gradient(ellipse_55%_40%_at_85%_100%,rgba(56,189,248,0.12),transparent_50%)]'
            : 'bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(255,255,255,0.18),transparent_55%),radial-gradient(ellipse_60%_40%_at_100%_100%,rgba(255,255,255,0.08),transparent_50%)]'
        }`}
      />
      <div
        className={`pointer-events-none absolute inset-0 z-0 ${
          isDarkTheme
            ? 'bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(15,23,42,0.22)_100%)]'
            : 'bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(15,23,42,0.08)_100%)]'
        }`}
      />

      {isNight && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 animate-drift-stars opacity-55 bg-[length:700px_220px] bg-[radial-gradient(1px_1px_at_20px_30px,rgba(255,255,255,0.9),transparent),radial-gradient(1px_1px_at_80px_120px,rgba(255,255,255,0.7),transparent),radial-gradient(1.5px_1.5px_at_160px_60px,rgba(255,255,255,0.85),transparent),radial-gradient(1px_1px_at_240px_180px,rgba(255,255,255,0.6),transparent),radial-gradient(1px_1px_at_320px_40px,rgba(255,255,255,0.75),transparent),radial-gradient(1.5px_1.5px_at_420px_140px,rgba(255,255,255,0.8),transparent),radial-gradient(1px_1px_at_520px_90px,rgba(255,255,255,0.65),transparent),radial-gradient(1px_1px_at_640px_200px,rgba(255,255,255,0.7),transparent)]"
        />
      )}

      <div className="relative z-10">{getAmbientGlows()}</div>

      <div className="relative z-20">
        <Header
          user={user}
          onLoginClick={() => setShowLoginModal(true)}
          theme={theme}
          location={weatherData.location}
          onSearch={handleSearch}
        />

        <main className="mx-auto max-w-7xl px-4 pb-10 pt-2 sm:px-6 md:px-10 lg:px-12">
          <Hero weather={weatherData} theme={theme} isNight={isNight} weatherTheme={getWeatherTheme()} />

          <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-12">
            {/* Left Column - same height cards */}
            <div className="grid grid-cols-1 gap-6 xl:col-span-4 xl:grid-rows-2">
              <AlertsPanel alerts={MOCK_ALERTS} theme={theme} weatherTheme={getWeatherTheme()} />
              <ClothingWidget clothing={MOCK_CLOTHING} theme={theme} weatherTheme={getWeatherTheme()} />
            </div>

            {/* Right Column - same height cards */}
            <div className="grid grid-cols-1 gap-6 xl:col-span-8 xl:grid-rows-2">
              <HourlyForecast forecast={MOCK_HOURLY} theme={theme} weatherTheme={getWeatherTheme()} />
              <WeatherMetrics weather={weatherData} theme={theme} weatherTheme={getWeatherTheme()} />
            </div>
          </div>

          {/* Full-width bottom for 5-Day Forecast */}
          <div className="mt-6">
            <DailyForecast forecast={MOCK_DAILY} theme={theme} weatherTheme={getWeatherTheme()} />
          </div>
        </main>
      </div>

      <div className="fixed bottom-6 left-1/2 z-30 flex max-w-4xl -translate-x-1/2 flex-wrap justify-center gap-2 px-4">
        <button
          onClick={() => setIsNight(!isNight)}
          className={`rounded-xl border px-4 py-2.5 text-sm font-medium backdrop-blur-xl transition-all duration-300 ${
            isDarkTheme
              ? 'border-white/20 bg-white/10 text-white hover:bg-white/20'
              : 'border-slate-900/10 bg-slate-900/5 text-slate-800 hover:bg-slate-900/10'
          }`}
        >
          Toggle {isNight ? 'Day' : 'Night'}
        </button>

        {['Sunny', 'Cloudy', 'Rainy', 'Partly Cloudy'].map((condition) => (
          <button
            key={condition}
            onClick={() => setWeatherData((prev) => ({ ...prev, condition }))}
            className={`rounded-xl border px-4 py-2.5 text-sm font-medium backdrop-blur-xl transition-all duration-300 ${
              weatherData.condition === condition
                ? isDarkTheme
                  ? 'border-white/25 bg-white/20 text-white'
                  : 'border-slate-900/15 bg-slate-900/10 text-slate-900'
                : isDarkTheme
                  ? 'border-white/20 bg-white/10 text-white/80 hover:bg-white/20'
                  : 'border-white/70 bg-white/50 text-slate-700 hover:bg-white/70'
            }`}
          >
            {condition}
          </button>
        ))}
      </div>
    </div>
  )
}
