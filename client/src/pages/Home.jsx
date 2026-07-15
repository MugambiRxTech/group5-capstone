import SearchBar from "../components/SearchBar";
import { Link } from "react-router-dom";

function Home() {
  return (
    <main>
      {/* HERO SECTION */}
      <section
        className="relative min-h-screen bg-cover bg-center overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(135deg, #1e3a8a 0%, #3b82f6 25%, #0ea5e9 50%, #06b6d4 75%, #0891b2 100%)`,
        }}
      >
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              radial-gradient(circle at 20% 50%, rgba(255,255,255,0.15) 0%, transparent 50%),
              radial-gradient(circle at 80% 50%, rgba(255,255,255,0.15) 0%, transparent 50%),
              radial-gradient(circle at 50% 80%, rgba(255,255,255,0.15) 0%, transparent 50%),
              repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.03) 10px, rgba(255,255,255,0.03) 20px),
              repeating-linear-gradient(-45deg, transparent, transparent 10px, rgba(255,255,255,0.03) 10px, rgba(255,255,255,0.03) 20px)
            `
          }}></div>
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-64 h-64 bg-white/5 rounded-full blur-3xl top-20 left-10 animate-pulse"></div>
          <div className="absolute w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl bottom-20 right-10 animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute w-48 h-48 bg-blue-300/10 rounded-full blur-2xl top-1/2 left-1/2 animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40"></div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-start min-h-screen px-6 text-center pt-32">
          <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight animate-fade-in-down">
            Weather That
            <span className="block text-cyan-300 animate-fade-in-up">Helps You Decide</span>
          </h1>

          <p className="max-w-2xl mt-4 text-sm md:text-base text-slate-200 leading-relaxed animate-fade-in">
            Get real-time weather forecasts transformed into practical
            recommendations that help you plan your day, travel, outdoor
            activities, and events with confidence.
          </p>

          {/* Search */}
          <div className="w-full max-w-3xl mt-10 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <SearchBar />
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8 mb-12 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <Link
              to="/signup"
              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold rounded-2xl transition-all duration-300 shadow-lg shadow-blue-500/25 hover:shadow-2xl hover:shadow-blue-500/40 hover:-translate-y-1 hover:scale-105"
            >
              Get Started
            </Link>

            <Link
              to="/login"
              className="px-8 py-3 bg-white/80 backdrop-blur-sm border border-white/30 text-slate-700 rounded-2xl font-semibold hover:bg-white hover:border-blue-300 hover:text-blue-600 transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-1 hover:scale-105"
            >
              Login
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;