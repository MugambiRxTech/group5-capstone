export default function Clothing({ recommendation, theme = 'dark' }) {
  const isDark = theme === 'dark'
  const shell = isDark ? 'border-white/10 bg-slate-900/50' : 'border-white/80 bg-white/75'
  const heading = isDark ? 'text-white' : 'text-slate-900'
  const muted = isDark ? 'text-slate-400' : 'text-slate-500'
  const itemCard = isDark ? 'border-white/10 bg-slate-800/50' : 'border-slate-200/80 bg-white/60'

  const getBadgeColors = (temp) => {
    if (temp > 85) return 'from-red-500 to-orange-500'
    if (temp > 75) return 'from-amber-500 to-yellow-500'
    if (temp > 60) return 'from-sky-400 to-cyan-500'
    if (temp > 45) return 'from-indigo-500 to-violet-500'
    return 'from-slate-600 to-slate-800'
  }

  const getClothingEmoji = (item) => {
    const emojiMap = {
      'T-shirt': '👕', 'Light jacket': '🧥', 'Jacket': '🧥', 'Sweater': '🧶',
      'Jeans': '👖', 'Shorts': '🩳', 'Sneakers': '👟', 'Boots': '🥾',
      'Sunglasses': '😎', 'Hat': '🧢', 'Sunscreen': '🧴', 'Umbrella': '☔',
      'Scarf': '🧣', 'Gloves': '🧤',
    }
    return emojiMap[item] || '👗'
  }

  return (
    <div className={`rounded-3xl border p-6 backdrop-blur-2xl shadow-2xl ${shell}`}>
      <h3 className={`mb-5 text-lg font-bold ${heading}`}>👗 What to Wear</h3>

      <div className={`mb-5 flex items-center justify-between rounded-2xl bg-gradient-to-r ${getBadgeColors(recommendation.temperature)} p-5 text-white`}>
        <span className="text-3xl font-bold">{recommendation.temperature}°F</span>
        <span className="text-sm font-medium">{recommendation.condition}</span>
      </div>

      <div className="mb-4">
        <p className={`mb-3 text-sm font-semibold ${muted}`}>Recommended Outfit:</p>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {recommendation.items.map((item, idx) => (
            <div key={idx} className={`flex flex-col items-center gap-1 rounded-xl border p-3 ${itemCard}`}>
              <span className="text-2xl">{getClothingEmoji(item)}</span>
              <span className={`text-center text-xs font-medium ${heading}`}>{item}</span>
            </div>
          ))}
        </div>
      </div>

      <p className={`text-sm ${muted}`}>💡 Adjust based on wind speed and humidity levels for maximum comfort.</p>
    </div>
  )
}
