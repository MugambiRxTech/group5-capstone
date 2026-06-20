import { useState } from 'react'
import { FaSearch } from 'react-icons/fa'

export default function Navigation({ location, theme = 'dark' }) {
  const [searchInput, setSearchInput] = useState(location)
  const isDark = theme === 'dark'

  const shell = isDark
    ? 'border-white/10 bg-slate-900/50'
    : 'border-white/80 bg-white/75'

  const handleSearch = (e) => {
    e.preventDefault()
    console.log('Searching for:', searchInput)
  }

  return (
    <nav className={`rounded-2xl border backdrop-blur-2xl shadow-xl ${shell}`}>
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 md:p-5">
        <h1 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
          SmartAtmosphere
        </h1>

        <form className="flex flex-1 gap-2 md:max-w-md" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search location..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="flex-1 rounded-xl border-0 bg-white/90 px-4 py-2.5 text-slate-800 outline-none ring-sky-500/30 focus:ring-4"
          />
          <button
            type="submit"
            className="flex items-center justify-center rounded-xl bg-sky-600 px-4 py-2.5 text-white hover:bg-sky-700"
          >
            <FaSearch />
          </button>
        </form>

        <div className="flex gap-2">
          {['⏰', '⚙️', '👤'].map((icon) => (
            <button
              key={icon}
              className={`flex h-10 w-10 items-center justify-center rounded-xl border transition ${
                isDark
                  ? 'border-white/10 bg-white/10 hover:bg-white/20'
                  : 'border-slate-200 bg-slate-900/5 hover:bg-slate-900/10'
              }`}
            >
              {icon}
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}
