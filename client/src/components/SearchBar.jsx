import { useState } from "react";
import { useGeocoding } from "../hooks/useGeocoding";
import { useWeatherContext } from "../contexts/WeatherContext";
import { useNavigate } from "react-router-dom";
import { FiMapPin, FiCalendar, FiSearch } from "react-icons/fi";

export default function SearchBar() {
  const navigate = useNavigate();
  const weatherContext = useWeatherContext();
  const { setCity } = weatherContext;

  const [query, setQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [dateError, setDateError] = useState("");

  const { results, loading, searchCity } = useGeocoding();

  const today = new Date().toISOString().split("T")[0];

  const addDays = (days) => {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date.toISOString().split("T")[0];
  };

  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(addDays(7));

  const handleQuickRange = (days) => {
    setStartDate(today);
    setEndDate(addDays(days));
    setDateError("");
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!query.trim()) return;

    if (new Date(endDate) < new Date(startDate)) {
      setDateError("End date cannot be earlier than start date.");
      return;
    }

    setDateError("");
    await searchCity(query);
    setShowResults(true);
  };

  const handleSelect = (selectedCity) => {
    setCity(selectedCity);

    if (typeof weatherContext.setDateRange === "function") {
      weatherContext.setDateRange({
        startDate,
        endDate,
      });
    }

    setQuery(selectedCity.name);
    setShowResults(false);
    navigate("/details");
  };

  return (
    <div className="relative max-w-3xl mx-auto">
      <form onSubmit={handleSearch} className="space-y-4">
        {/* Search row */}
        <div className="flex gap-3">
          <div className="relative flex-1">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg" />
            <input
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setShowResults(false);
              }}
              placeholder="Search city... e.g. Nairobi, London"
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/95 backdrop-blur-sm border border-white/30 text-slate-900 text-base shadow-lg outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 transition-all duration-300 placeholder:text-slate-500 placeholder:font-medium"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="px-6 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white text-sm font-semibold rounded-2xl shadow-lg shadow-blue-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-xl hover:shadow-blue-500/30 hover:-translate-y-0.5"
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </div>

        {/* Date range row */}
        <div className="grid md:grid-cols-2 gap-3">
          <div className="relative">
            <FiCalendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg" />
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/95 backdrop-blur-sm border border-white/30 text-slate-900 text-base shadow-lg outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 transition-all duration-300"
            />
          </div>

          <div className="relative">
            <FiCalendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg" />
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/95 backdrop-blur-sm border border-white/30 text-slate-900 text-base shadow-lg outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 transition-all duration-300"
            />
          </div>
        </div>

        {/* Quick ranges */}
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => handleQuickRange(7)}
            className="px-5 py-2.5 rounded-xl bg-white/80 backdrop-blur-sm border border-white/30 text-slate-700 text-sm font-medium hover:bg-white hover:border-blue-300 hover:text-blue-600 transition-all duration-300 shadow-sm"
          >
            Next 7 Days
          </button>

          <button
            type="button"
            onClick={() => handleQuickRange(14)}
            className="px-5 py-2.5 rounded-xl bg-white/80 backdrop-blur-sm border border-white/30 text-slate-700 text-sm font-medium hover:bg-white hover:border-blue-300 hover:text-blue-600 transition-all duration-300 shadow-sm"
          >
            Next 14 Days
          </button>

          <button
            type="button"
            onClick={() => handleQuickRange(16)}
            className="px-5 py-2.5 rounded-xl bg-white/80 backdrop-blur-sm border border-white/30 text-slate-700 text-sm font-medium hover:bg-white hover:border-blue-300 hover:text-blue-600 transition-all duration-300 shadow-sm"
          >
            Next 16 Days
          </button>
        </div>

        {dateError && (
          <div className="mt-2 px-4 py-3 bg-red-50/90 backdrop-blur-sm border border-red-200 rounded-2xl text-sm text-red-600 text-center shadow-sm">
            {dateError}
          </div>
        )}
      </form>

      {/* Dropdown results */}
      {showResults && results.length > 0 && (
        <ul className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl z-50 overflow-hidden">
          {results.map((city, i) => (
            <li
              key={i}
              onClick={() => handleSelect(city)}
              className="flex justify-between items-center px-4 py-3 cursor-pointer hover:bg-blue-50/80 border-b border-slate-100 last:border-none transition-all duration-200"
            >
              <div className="flex items-center gap-2">
                <FiMapPin className="text-slate-500" />
                <span className="text-sm font-medium text-slate-800">
                  {city.name}
                </span>
              </div>
              <span className="text-xs text-slate-400">
                {city.admin1 ? `${city.admin1}, ` : ""}
                {city.country}
              </span>
            </li>
          ))}
        </ul>
      )}

      {/* No results */}
      {showResults && results.length === 0 && !loading && (
        <div className="mt-2 px-4 py-3 bg-red-50/90 backdrop-blur-sm border border-red-200 rounded-2xl text-sm text-red-600 text-center shadow-sm">
          No cities found for <span className="font-medium">"{query}"</span>.
          Try a different name.
        </div>
      )}
    </div>
  );
}