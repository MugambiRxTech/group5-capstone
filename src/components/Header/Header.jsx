import React, { useState, useEffect, useRef, useCallback } from 'react';
import { FaUser, FaMapMarkerAlt, FaCog, FaSignOutAlt, FaArrowRight, FaBookmark, FaSearch } from 'react-icons/fa';
import { searchCities } from '../../utils/citySearch';

export default function Header({ user, onLoginClick, theme = 'dark', location = '', onSearch }) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const searchRef = useRef(null);
  const debounceRef = useRef(null);
  const isDark = theme === 'dark';

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  useEffect(() => {
    setSearchInput('');
    setSuggestions([]);
    setShowSuggestions(false);
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSuggestions(false);
        setActiveIndex(-1);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectCity = useCallback((cityLabel) => {
    if (onSearch && cityLabel) {
      onSearch(cityLabel);
    }
    setSearchInput('');
    setSuggestions([]);
    setShowSuggestions(false);
    setActiveIndex(-1);
  }, [onSearch]);

  const fetchSuggestions = useCallback(async (query) => {
    if (query.trim().length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    const results = await searchCities(query);
    setSuggestions(results);
    setShowSuggestions(results.length > 0);
    setActiveIndex(-1);
    setIsSearching(false);
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);

    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (value.trim().length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    debounceRef.current = setTimeout(() => fetchSuggestions(value), 300);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (activeIndex >= 0 && suggestions[activeIndex]) {
      selectCity(suggestions[activeIndex].label);
      return;
    }
    if (searchInput.trim()) {
      selectCity(searchInput.trim());
    }
  };

  const handleKeyDown = (e) => {
    if (!showSuggestions || suggestions.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : suggestions.length - 1));
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
      setActiveIndex(-1);
    }
  };

  const shellClasses = isDark
    ? 'border-white/[0.08] bg-slate-950/50 shadow-lg shadow-black/20 ring-1 ring-white/[0.06]'
    : 'border-white/60 bg-white/70 shadow-lg shadow-slate-900/[0.06] ring-1 ring-slate-900/[0.04]';

  const dropdownClasses = isDark
    ? 'border-white/10 bg-slate-950/95 shadow-black/40 backdrop-blur-xl'
    : 'border-slate-200/80 bg-white/95 shadow-slate-900/10 backdrop-blur-xl';

  const menuItemClasses = isDark
    ? 'text-white hover:bg-white/10'
    : 'text-slate-800 hover:bg-slate-100';

  const menuSubtextClasses = isDark ? 'text-white/60' : 'text-slate-500';

  const iconWrapClasses = isDark
    ? 'bg-sky-500/15 text-sky-300'
    : 'bg-sky-500/10 text-sky-600';

  const suggestionPanel = isDark
    ? 'border-white/10 bg-slate-900/95 shadow-black/30'
    : 'border-slate-200 bg-white/98 shadow-slate-900/10';

  const hasLocation = Boolean(location);

  return (
    <header className="sticky top-0 z-50 mx-1 mt-1 w-full">
      <div className={`rounded-2xl border backdrop-blur-xl transition-colors duration-500 ${shellClasses}`}>
        <div className="grid h-12 grid-cols-[1fr_auto_1fr] items-center gap-2 px-3 sm:px-4">

          <h1 className="justify-self-start select-none truncate">
            <span className={`text-[13px] font-medium tracking-tight sm:text-sm ${isDark ? 'text-white/70' : 'text-slate-500'}`}>
              Smart
            </span>
            <span className={`bg-gradient-to-r bg-clip-text text-[13px] font-bold tracking-tight text-transparent sm:text-sm ${
              isDark ? 'from-sky-300 via-cyan-200 to-violet-300' : 'from-sky-600 via-cyan-600 to-violet-600'
            }`}>
              Atmosphere
            </span>
          </h1>

          <div className="flex items-center gap-2 justify-self-center">
            {hasLocation && (
              <div
                className={`flex max-w-[5.5rem] shrink-0 items-center gap-1.5 sm:max-w-[8rem] md:max-w-[10rem] ${
                  isDark ? 'text-white/90' : 'text-slate-800'
                }`}
                title={location}
              >
                <div
                  className={`relative flex h-7 w-7 shrink-0 items-center justify-center rounded-full shadow-sm sm:h-8 sm:w-8 ${
                    isDark
                      ? 'bg-gradient-to-br from-rose-500 to-orange-400 shadow-rose-500/20'
                      : 'bg-gradient-to-br from-rose-500 to-amber-500 shadow-rose-500/25'
                  }`}
                >
                  <span className={`absolute inset-0 rounded-full ring-2 ring-inset ${isDark ? 'ring-white/20' : 'ring-white/40'}`} />
                  <FaMapMarkerAlt className="relative text-[10px] text-white sm:text-[11px]" />
                </div>
                <span className="hidden truncate text-[11px] font-semibold leading-tight sm:inline sm:max-w-[6rem] sm:text-xs md:max-w-[9rem]">
                  {location}
                </span>
              </div>
            )}

            <div ref={searchRef} className="relative">
              <form
                onSubmit={handleSearch}
                className={`flex h-8 w-[11rem] items-center gap-1.5 rounded-full border px-2.5 sm:w-52 md:w-60 ${
                  isDark
                    ? 'border-white/10 bg-white/[0.07] focus-within:border-sky-400/40 focus-within:bg-white/10'
                    : 'border-slate-200/80 bg-white/80 focus-within:border-sky-400/50 focus-within:ring-2 focus-within:ring-sky-500/15'
                } transition-all duration-200`}
              >
                <FaSearch className={`shrink-0 text-[10px] ${isDark ? 'text-white/40' : 'text-slate-400'}`} />
                <input
                  type="text"
                  placeholder="Search city..."
                  value={searchInput}
                  onChange={handleInputChange}
                  onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
                  onKeyDown={handleKeyDown}
                  autoComplete="off"
                  aria-autocomplete="list"
                  aria-expanded={showSuggestions}
                  className={`min-w-0 flex-1 border-0 bg-transparent py-0 text-xs font-medium outline-none ${
                    isDark
                      ? 'text-white placeholder:text-white/35'
                      : 'text-slate-800 placeholder:text-slate-400'
                  }`}
                />
                {isSearching && (
                  <span className={`h-3 w-3 shrink-0 animate-pulse rounded-full ${isDark ? 'bg-white/30' : 'bg-slate-300'}`} />
                )}
              </form>

              {showSuggestions && suggestions.length > 0 && (
                <ul
                  className={`absolute left-0 right-0 top-[calc(100%+6px)] z-50 overflow-hidden rounded-xl border py-1 shadow-xl backdrop-blur-xl ${suggestionPanel}`}
                  role="listbox"
                >
                  {suggestions.map((city, index) => (
                    <li key={city.id} role="option" aria-selected={index === activeIndex}>
                      <button
                        type="button"
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => selectCity(city.label)}
                        className={`flex w-full items-center gap-2.5 px-3 py-2 text-left transition ${
                          index === activeIndex
                            ? isDark
                              ? 'bg-sky-500/20 text-white'
                              : 'bg-sky-50 text-slate-900'
                            : isDark
                              ? 'text-white/90 hover:bg-white/10'
                              : 'text-slate-800 hover:bg-slate-50'
                        }`}
                      >
                        <FaMapMarkerAlt className={`shrink-0 text-[10px] ${isDark ? 'text-rose-400' : 'text-rose-500'}`} />
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-xs font-semibold">{city.name}</p>
                          <p className={`truncate text-[10px] ${isDark ? 'text-white/50' : 'text-slate-500'}`}>
                            {[city.region, city.country].filter(Boolean).join(', ')}
                          </p>
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="flex shrink-0 items-center justify-self-end gap-1.5 sm:gap-2">
            <button
              type="button"
              aria-label="Bookmarks"
              className={`flex h-8 w-8 items-center justify-center rounded-full border transition-all duration-200 hover:scale-105 active:scale-95 ${
                isDark
                  ? 'border-amber-400/20 bg-amber-400/10 text-amber-300 hover:border-amber-400/35 hover:bg-amber-400/20'
                  : 'border-amber-500/25 bg-amber-50 text-amber-600 hover:border-amber-500/40 hover:bg-amber-100'
              }`}
            >
              <FaBookmark className="text-[11px]" />
            </button>

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className={`flex h-8 items-center gap-1.5 rounded-full border px-1.5 pr-2.5 text-xs font-semibold transition-all duration-200 hover:scale-105 active:scale-95 ${
                    isDark
                      ? 'border-white/10 bg-white/10 text-white hover:bg-white/15'
                      : 'border-slate-200 bg-slate-50 text-slate-800 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-sky-500 text-[10px] font-bold text-white">
                    {user.initials || 'U'}
                  </div>
                  <span className="hidden max-w-[80px] truncate md:block">{user.name || 'Profile'}</span>
                </button>

                {isProfileOpen && (
                  <div className={`absolute right-0 mt-2 w-56 overflow-hidden rounded-xl border shadow-xl animate-fade-in-up ${dropdownClasses}`}>
                    <div className="p-1.5">
                      {[
                        { icon: FaUser, title: 'My Profile', desc: 'View profile' },
                        { icon: FaMapMarkerAlt, title: 'Saved Places', desc: 'Your locations' },
                        { icon: FaCog, title: 'Settings', desc: 'Preferences' },
                      ].map(({ icon: Icon, title, desc }) => (
                        <button
                          key={title}
                          className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-xs font-medium transition ${menuItemClasses}`}
                        >
                          <div className={`flex h-7 w-7 items-center justify-center rounded-md text-sm ${iconWrapClasses}`}>
                            <Icon />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="font-semibold">{title}</p>
                            <p className={`truncate text-[10px] ${menuSubtextClasses}`}>{desc}</p>
                          </div>
                        </button>
                      ))}
                      <div className={`my-1 h-px ${isDark ? 'bg-white/10' : 'bg-slate-200'}`} />
                      <button className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-xs font-medium transition ${isDark ? 'text-rose-300 hover:bg-rose-500/10' : 'text-rose-600 hover:bg-rose-50'}`}>
                        <div className={`flex h-7 w-7 items-center justify-center rounded-md text-sm ${isDark ? 'bg-rose-500/15 text-rose-300' : 'bg-rose-500/10 text-rose-600'}`}>
                          <FaSignOutAlt />
                        </div>
                        <div>
                          <p className="font-semibold">Log Out</p>
                          <p className={`text-[10px] ${menuSubtextClasses}`}>Sign out</p>
                        </div>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={onLoginClick}
                className="group relative inline-flex h-8 items-center gap-1.5 overflow-hidden rounded-full bg-gradient-to-r from-violet-500 via-sky-500 to-cyan-500 px-3.5 text-xs font-semibold text-white shadow-md shadow-sky-500/25 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-sky-500/35 active:scale-95 sm:px-4"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-violet-600 via-sky-600 to-cyan-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <span className="relative z-10 hidden sm:inline">Sign In</span>
                <span className="relative z-10 sm:hidden">In</span>
                <FaArrowRight className="relative z-10 text-[10px] transition-transform duration-300 group-hover:translate-x-0.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
