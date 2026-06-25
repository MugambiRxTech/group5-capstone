import { useState } from "react";
import { useGeocoding } from "../hooks/useGeocoding";
import { useWeatherContext } from "../contexts/WeatherContext";
import { useNavigate } from "react-router-dom";
import { LuSearch, LuMapPin, LuFrown } from 'react-icons/lu';

export default function SearchBar() {
  const { setCity } = useWeatherContext();
  const [query, setQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const { results, loading, searchCity } = useGeocoding();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    searchCity(query);
    setShowResults(true);
  };

  const navigate = useNavigate();

  const handleSelect = (city) => {
    setCity(city);
    setQuery(city.name);
    setShowResults(false);
    navigate("/details");
  };

  return (
    <div className="relative max-w-3xl mx-auto">
      {/* Search form */}
      <form onSubmit={handleSearch} className="flex gap-3">
        <div className="flex-1 relative">
          <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300">
            <LuSearch className="text-xl" />
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              if (e.target.value.trim()) searchCity(e.target.value);
              setShowResults(true);
            }}
            placeholder="Search for a city... e.g. Nairobi, London, Tokyo"
            className="w-full pl-14 pr-5 py-4 rounded-2xl border-2 border-white/30 bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl shadow-2xl shadow-black/20 text-slate-800 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400 outline-none focus:ring-4 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-300"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold rounded-2xl shadow-xl shadow-blue-500/40 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed transform hover:scale-105"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
              </svg>
              Searching...
            </span>
          ) : "Search"}
        </button>
      </form>
      
      {/* Dropdown results */}
      {showResults && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-4 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-2xl shadow-xl shadow-black/10 z-50 overflow-hidden">
          {results.map((city, i) => (
            <button
              key={i}
              onClick={() => handleSelect(city)}
              className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-gradient-to-r from-blue-50 to-cyan-50 dark:hover:from-slate-700 dark:hover:to-slate-700 border-b border-slate-100 dark:border-slate-700 last:border-none transition-all duration-300"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900/50 dark:to-cyan-900/50 flex items-center justify-center text-blue-600 dark:text-blue-400">
                  <LuMapPin className="text-xl" />
                </div>
                <div>
                  <div className="font-bold text-slate-800 dark:text-slate-100">{city.name}</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">{city.country}</div>
                </div>
              </div>
              <div className="text-right">
                {city.admin1 && <div className="text-xs text-slate-500 dark:text-slate-400">{city.admin1}</div>}
                <span className="text-xs font-semibold text-slate-400 dark:text-slate-500">View Forecast →</span>
              </div>
            </button>
          ))}
        </div>
      )}
      
      {/* No results */}
      {showResults && results.length === 0 && !loading && (
        <div className="absolute top-full left-0 right-0 mt-4 px-6 py-6 bg-red-50 dark:bg-red-900/20 border-2 border-red-100 dark:border-red-800/50 rounded-2xl text-center">
          <LuFrown className="text-3xl mb-3 mx-auto text-red-500" />
          <div className="text-red-600 dark:text-red-400 font-semibold">
            No cities found for "<span className="font-bold">{query}</span>"
          </div>
          <div className="text-sm text-red-500 dark:text-red-300 mt-2">
            Try checking your spelling or searching for another city
          </div>
        </div>
      )}
    </div>
  );
}
