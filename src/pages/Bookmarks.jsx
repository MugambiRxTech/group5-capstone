import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BookmarkCard, { EmptyBookmarkCard } from '../components/Bookmarkcard';
import RecentlyViewedCard from '../components/Recentlyviewedcard';
import AlertCard from '../components/Alerts';
const SAMPLE_BOOKMARKS = [
  {
    id: 1,
    city: 'Maui',
    country: 'HI',
    eventLabel: 'Surfing Trip',
    image: 'https://images.pexels.com/photos/1032650/pexels-photo-1032650.jpeg?w=400',
    temperature: 28,
    condition: 'Sunny',
    humidity: 12,
    wind: 14,
    advisory: 'Ideal Conditions',
    advisoryType: 'ideal',
  },
  {
    id: 2,
    city: 'Aspen',
    country: 'CO',
    eventLabel: 'Ski Weekend',
    image: 'https://images.pexels.com/photos/668880/pexels-photo-668880.jpeg?w=400',
    temperature: -4,
    condition: 'Partly Cloudy',
    humidity: null,
    wind: null,
    advisory: 'High UV',
    advisoryType: 'warning',
  },
  {
    id: 3,
    city: 'London',
    country: 'UK',
    eventLabel: 'Business Summit',
    image: 'https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?w=400',
    temperature: 14,
    condition: 'Rain',
    humidity: 80,
    wind: null,
    advisory: 'Bring Umbrella',
    advisoryType: 'warning',
  },
];
const SAMPLE_RECENT = [
  { id: 1, city: 'Paris', country: 'FR', condition: 'Mostly Sunny', temperature: 19, image: 'https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?w=100', },
  { id: 2, city: 'New York', country: 'NY', condition: 'Light Rain', temperature: 16, image: 'https://images.unsplash.com/photo-1500916434205-0c77489c6cf7?w=100&q=80' },
  { id: 3, city: 'Yosemite', country: 'CA', condition: 'Clear Sky', temperature: 22, image: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=100&q=80' },
];
const SAMPLE_ALERT = {
  id: 1,
  location: 'Maui',
  message: 'in 48 hours. Consider rescheduling your surfing session for tomorrow morning.',
  ctaLabel: 'Adjust Plan',
  ctaAction: () => {},
};
function Bookmarks() {
  const navigate = useNavigate();
  const [bookmarks, setBookmarks] = useState(SAMPLE_BOOKMARKS);
  const [alert, setAlert] = useState(SAMPLE_ALERT);
  const handleRemove = (id) => {
    setBookmarks((prev) => prev.filter((b) => b.id !== id));
  };
  const handleCardClick = (bookmark) => {
    navigate(`/forecast/${bookmark.id}`);
  };
  const handleRecentClick = (item) => {
    navigate(`/forecast/${item.id}`);
  };
  return (
    <main className="flex-grow bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 border border-blue-200 dark:border-blue-800/50 mb-3">
              📍 Your Saved Locations
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
              My Bookmarks
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-3 text-lg">
              Your weather-smart planned destinations and events, always at your fingertips.
            </p>
          </div>
          <button className="flex items-center gap-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold px-7 py-4 rounded-2xl shadow-xl hover:shadow-2xl hover:shadow-blue-500/40 transition-all duration-300 transform hover:-translate-y-0.5">
            <span className="text-xl">+</span>
            <span>Add New Bookmark</span>
          </button>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Bookmark grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {bookmarks.map((bookmark) => (
                <BookmarkCard
                  key={bookmark.id}
                  bookmark={bookmark}
                  onRemove={handleRemove}
                  onClick={handleCardClick}
                />
              ))}
              <EmptyBookmarkCard onAdd={() => {}} />
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="w-full lg:w-80 flex flex-col gap-6">
            {/* Stats Card */}
            <div className="bg-gradient-to-br from-blue-600 to-cyan-600 rounded-3xl p-6 text-white shadow-2xl shadow-blue-500/30">
              <div className="text-sm font-bold uppercase tracking-wider opacity-90 mb-2">
                Your Weather Dashboard
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <div className="text-3xl font-extrabold">{bookmarks.length}</div>
                  <div className="text-sm opacity-90 mt-1">Saved Locations</div>
                </div>
                <div>
                  <div className="text-3xl font-extrabold">12</div>
                  <div className="text-sm opacity-90 mt-1">Forecasts Today</div>
                </div>
              </div>
            </div>
            
            {/* Recently Viewed */}
            <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 shadow-xl">
              <h2 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                <span>🕐</span> Recently Viewed
              </h2>
              <div className="flex flex-col gap-2">
                {SAMPLE_RECENT.map((item) => (
                  <RecentlyViewedCard key={item.id} item={item} onClick={handleRecentClick} />
                ))}
              </div>
              <button className="mt-5 w-full text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 border border-slate-200 dark:border-slate-700 hover:border-blue-200 dark:hover:border-blue-800/50 rounded-2xl py-3 transition-all duration-200">
                View Full Browsing History
              </button>
            </div>
            
            {/* Alert */}
            {alert && (
              <AlertCard
                alert={alert}
                onDismiss={() => setAlert(null)}
              />
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
export default Bookmarks;
