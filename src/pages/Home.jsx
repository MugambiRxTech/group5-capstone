import SearchBar from "../components/SearchBar";
import { Link } from "react-router-dom";
import { LuUsers, LuGlobe, LuClock, LuMapPin, LuBookmark } from 'react-icons/lu';
import { useAuth } from '../contexts/AuthContext';

function Home() {
  const { user } = useAuth();
  return (
    <main className="overflow-hidden">
      {/* HERO SECTION */}
      <section
        className="relative bg-cover bg-center flex items-center justify-center pb-32"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=1920&q=80')`,
        }}
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/85 via-slate-900/75 to-slate-950/80"></div>
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 -left-24 w-80 h-80 bg-blue-400/30 rounded-full blur-3xl animate-bounce" style={{ animationDuration: '8s' }}></div>
          <div className="absolute top-1/3 -right-24 w-96 h-96 bg-cyan-400/30 rounded-full blur-3xl animate-bounce" style={{ animationDelay: '2s', animationDuration: '10s' }}></div>
          <div className="absolute -bottom-24 left-1/4 w-72 h-72 bg-indigo-400/25 rounded-full blur-3xl animate-bounce" style={{ animationDelay: '4s', animationDuration: '12s' }}></div>
        </div>

        {/* Content */}
        <div className="relative z-20 flex flex-col items-center justify-center px-6 md:px-12 text-center max-w-5xl mx-auto py-24 animate-fade-in">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-4">
            Weather That
            <span className="block bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              Helps You Decide
            </span>
          </h1>
          
          <p className="max-w-3xl text-base md:text-lg text-slate-200/90 mb-10 leading-relaxed">
            Get real-time weather forecasts transformed into practical, actionable 
            recommendations that help you plan your day, travel, outdoor activities, 
            and events with complete confidence.
          </p>
          
          {/* Search */}
          <div className="w-full max-w-3xl mb-8">
              <SearchBar />
          </div>
          
          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            {user ? (
              <Link
                to="/bookmarks"
                className="group px-10 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold rounded-2xl shadow-xl shadow-blue-500/40 transition-all duration-300 transform hover:scale-105"
              >
                <span className="flex items-center gap-2">
                  <LuBookmark className="text-lg" />
                  View My Bookmarks
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </span>
              </Link>
            ) : (
              <Link
                to="/signup"
                className="group px-10 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold rounded-2xl shadow-xl shadow-blue-500/40 transition-all duration-300 transform hover:scale-105"
              >
                <span className="flex items-center gap-2">
                  Get Started Free
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </span>
              </Link>
            )}
            <Link
              to="#"
              onClick={(e) => {
                e.preventDefault();
                // TODO: Add popular cities modal or auto-fill search
                alert("Popular cities feature coming soon!");
              }}
              className="px-10 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-2xl font-bold hover:bg-white/20 hover:border-white/30 transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
            >
              <LuMapPin className="text-lg" />
              Explore Popular Cities
            </Link>
          </div>
        </div>
        
        {/* Floating Stats */}
        <div className="absolute bottom-0 left-0 right-0 z-30">
          <div className="max-w-6xl mx-auto -translate-y-1/2">
            <div className="flex items-center justify-center gap-12">
              <div className="text-center flex flex-col items-center gap-2">
                <LuUsers className="text-3xl text-white drop-shadow-lg" />
                <div className="text-2xl md:text-3xl font-extrabold text-white drop-shadow-lg">10K+</div>
                <div className="text-xs text-slate-200/90">Active Users</div>
              </div>
              <div className="text-center flex flex-col items-center gap-2">
                <LuGlobe className="text-3xl text-white drop-shadow-lg" />
                <div className="text-2xl md:text-3xl font-extrabold text-white drop-shadow-lg">200+</div>
                <div className="text-xs text-slate-200/90">Cities</div>
              </div>
              <div className="text-center flex flex-col items-center gap-2">
                <LuClock className="text-3xl text-white drop-shadow-lg" />
                <div className="text-2xl md:text-3xl font-extrabold text-white drop-shadow-lg">24/7</div>
                <div className="text-xs text-slate-200/90">Forecasts</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
export default Home;
