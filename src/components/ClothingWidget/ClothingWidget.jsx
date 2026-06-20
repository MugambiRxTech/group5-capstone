import { FaFire, FaSun, FaCloudSun, FaSnowflake, FaTshirt, FaHatCowboy, FaShoePrints, FaUmbrella, FaGlasses, FaCapsules, FaMagic, FaUser } from 'react-icons/fa'

export default function ClothingWidget({ clothing, theme = 'dark', weatherTheme }) {
  const isDark = theme === 'dark'

  const shell = isDark
    ? 'border-white/10 bg-slate-900/50 shadow-black/20'
    : 'border-white/80 bg-white/75 shadow-slate-900/10'

  const heading = isDark ? 'text-white' : 'text-slate-900'
  const muted = isDark ? 'text-slate-300' : 'text-slate-600'
  const itemBg = isDark
    ? 'border-white/10 bg-slate-800/60 hover:border-sky-500/30 hover:from-sky-500/20 hover:to-cyan-500/20'
    : 'border-slate-200/80 bg-white/70 hover:border-sky-300 hover:from-sky-50 hover:to-cyan-50'
  const footerBg = isDark ? 'bg-slate-800/40' : 'bg-slate-100/80'

  const getTemperatureBadge = (temp) => {
    if (temp > 85) return { bg: 'from-red-500 to-orange-500', icon: <FaFire className="text-4xl text-white" /> }
    if (temp > 75) return { bg: 'from-amber-500 to-yellow-500', icon: <FaSun className="text-4xl text-white" /> }
    if (temp > 60) return { bg: 'from-sky-400 to-cyan-500', icon: <FaCloudSun className="text-4xl text-white" /> }
    if (temp > 45) return { bg: 'from-indigo-500 to-violet-500', icon: <FaSnowflake className="text-4xl text-white" /> }
    return { bg: 'from-slate-600 to-slate-800', icon: <FaSnowflake className="text-4xl text-white" /> }
  }

  const getClothingIcon = (item) => {
    const iconMap = {
      'T-shirt': <FaTshirt className="text-lg" style={{ color: weatherTheme.primary }} />,
      'Light jacket': <FaUser className="text-lg" style={{ color: weatherTheme.primary }} />,
      'Jacket': <FaUser className="text-lg" style={{ color: weatherTheme.primary }} />,
      'Heavy jacket': <FaUser className="text-lg" style={{ color: weatherTheme.primary }} />,
      'Sweater': <FaUser className="text-lg" style={{ color: weatherTheme.primary }} />,
      'Jeans': <FaUser className="text-lg" style={{ color: weatherTheme.primary }} />,
      'Shorts': <FaUser className="text-lg" style={{ color: weatherTheme.primary }} />,
      'Pants': <FaUser className="text-lg" style={{ color: weatherTheme.primary }} />,
      'Sneakers': <FaShoePrints className="text-lg" style={{ color: weatherTheme.primary }} />,
      'Boots': <FaShoePrints className="text-lg" style={{ color: weatherTheme.primary }} />,
      'Sandals': <FaShoePrints className="text-lg" style={{ color: weatherTheme.primary }} />,
      'Sunglasses': <FaGlasses className="text-lg" style={{ color: weatherTheme.primary }} />,
      'Hat': <FaHatCowboy className="text-lg" style={{ color: weatherTheme.primary }} />,
      'Beanie': <FaHatCowboy className="text-lg" style={{ color: weatherTheme.primary }} />,
      'Sunscreen': <FaCapsules className="text-lg" style={{ color: weatherTheme.primary }} />,
      'Umbrella': <FaUmbrella className="text-lg" style={{ color: weatherTheme.primary }} />,
      'Scarf': <FaUser className="text-lg" style={{ color: weatherTheme.primary }} />,
      'Gloves': <FaUser className="text-lg" style={{ color: weatherTheme.primary }} />,
    }
    return iconMap[item] || <FaUser className="text-lg" style={{ color: weatherTheme.primary }} />
  }

  const badge = getTemperatureBadge(clothing.temp)

  return (
    <div className={`flex flex-col overflow-hidden rounded-3xl border backdrop-blur-2xl shadow-2xl transition-all duration-300 hover:shadow-sky-500/10 ${shell}`} style={{ borderColor: `${weatherTheme.primary}30` }}>
      <div className={`border-b p-5 ${isDark ? 'border-white/5' : 'border-slate-200/80'}`}>
        <h3 className={`flex items-center gap-2 text-lg font-bold ${heading}`}>
          <FaTshirt style={{ color: weatherTheme.primary }} /> What to Wear
        </h3>
      </div>

      <div className="flex flex-col flex-1 space-y-5 p-5">
        <div className={`flex items-center justify-between rounded-2xl bg-gradient-to-r ${badge.bg} p-5`}>
          <div>
            <p className="text-3xl font-bold text-white">{clothing.temp}°C</p>
            <p className="text-sm font-medium text-white/90">{clothing.condition}</p>
          </div>
          {badge.icon}
        </div>

        <div className="flex-1">
          <p className={`mb-3 text-sm font-semibold ${muted}`}>Recommended Items:</p>
          <div className="flex flex-wrap gap-2">
            {clothing.items.map((item, idx) => (
              <div
                key={idx}
                className={`flex items-center gap-2 rounded-xl border bg-gradient-to-r px-3 py-2 transition hover:scale-105 ${itemBg}`}
              >
                <span className="text-sky-500">{getClothingIcon(item)}</span>
                <span className={`text-sm font-medium ${heading}`}>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={`rounded-xl p-4 ${footerBg}`}>
          <p className={`flex items-start gap-2 text-sm leading-relaxed ${muted}`}>
            <FaMagic className="mt-0.5 shrink-0 text-amber-500" />
            Adjust based on humidity and wind speed for maximum comfort
          </p>
        </div>
      </div>
    </div>
  )
}
