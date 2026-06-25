import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; 
import { LuCloudSun, LuBookmark } from 'react-icons/lu';

function Navbar() {  
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleLogout = () => {
    logout();
    navigate('/login'); 
  };
  
  const isActive = (path) => location.pathname === path;
  
  return (
    <header className="flex items-center justify-between px-8 md:px-16 py-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl transition-all duration-300 sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/30">
          <LuCloudSun className="text-white text-xl" />
        </div>
        <Link to="/" className="text-3xl font-extrabold bg-gradient-to-r from-blue-700 via-cyan-600 to-blue-500 bg-clip-text text-transparent tracking-tight">
          Atmosphere
        </Link>
      </div>
      
      <nav className="hidden md:flex items-center gap-3">
        <Link 
          to="/" 
          className={`px-6 py-3 rounded-2xl text-sm font-bold transition-all duration-300 transform hover:-translate-y-0.5 ${
            isActive('/') 
              ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-xl shadow-blue-500/40' 
              : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 hover:shadow-md'
          }`}
        >
          Home
        </Link>
        <Link 
          to="/bookmarks" 
          className={`px-6 py-3 rounded-2xl text-sm font-bold transition-all duration-300 transform hover:-translate-y-0.5 ${
            isActive('/bookmarks') 
              ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-xl shadow-blue-500/40' 
              : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 hover:shadow-md'
          }`}
        >
          <LuBookmark className="w-5 h-5" />
        </Link>
        
        {/* Dynamic Authentication Rendering */}
        <div className="ml-6 pl-6">
          {user ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3 px-5 py-3 bg-gradient-to-r from-slate-50 to-blue-50 dark:from-slate-800 dark:to-slate-800 rounded-2xl shadow-inner">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white font-black text-lg shadow-md">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="text-sm font-bold text-slate-700 dark:text-slate-100">
                  Hi, {user.name.split(' ')[0]}
                </span>
              </div>
              <button 
                onClick={handleLogout}
                className="px-6 py-3 text-sm font-bold text-slate-700 dark:text-slate-200 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 rounded-2xl transition-all duration-300 transform hover:-translate-y-0.5"
              >
                Log Out
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link 
                to="/login" 
                className="px-6 py-3 text-sm font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl transition-all duration-300 transform hover:-translate-y-0.5"
              >
                Log In
              </Link>
              <Link 
                to="/signup" 
                className="px-6 py-3 text-sm font-bold bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-2xl hover:from-blue-700 hover:to-cyan-700 shadow-xl shadow-blue-500/40 transition-all duration-300 transform hover:-translate-y-0.5"
              >
                Sign Up for Free
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
export default Navbar;
