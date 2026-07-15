import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FiMenu, FiX, FiSun, FiCloud, FiLogOut, FiUser, FiBookmark, FiHome } from 'react-icons/fi';

function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsMobileMenuOpen(false);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-4 left-4 right-4 z-50 backdrop-blur-md bg-white/70 dark:bg-slate-900/70 rounded-2xl shadow-lg border border-white/20 dark:border-slate-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 group"
            onClick={closeMobileMenu}
          >
            <div className="relative">
              <FiCloud className="w-8 h-8 text-blue-500 group-hover:text-blue-600 group-hover:scale-110 transition-all duration-300" />
              <FiSun className="w-4 h-4 text-yellow-400 absolute -top-1 -right-1 group-hover:scale-125 group-hover:rotate-12 transition-all duration-300" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent group-hover:from-blue-500 group-hover:to-cyan-400 transition-all duration-300">
              Atmosphere
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link 
              to="/" 
              className="flex items-center space-x-2 px-4 py-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50 dark:hover:from-blue-900/30 dark:hover:to-cyan-900/30 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 hover:scale-105 hover:shadow-md group relative"
            >
              <FiHome className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
              <span className="font-medium">Home</span>
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
            </Link>
            <Link 
              to="/bookmarks" 
              className="flex items-center space-x-2 px-4 py-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50 dark:hover:from-blue-900/30 dark:hover:to-cyan-900/30 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 hover:scale-105 hover:shadow-md group relative"
            >
              <FiBookmark className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
              <span className="font-medium">Bookmarks</span>
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
            </Link>

            {isAuthenticated && user ? (
              <div className="flex items-center space-x-2 ml-4 pl-4 border-l border-slate-200 dark:border-slate-700">
                <div className="flex items-center space-x-2 px-3 py-2 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-lg">
                  <FiUser className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
                    {user.name.split(' ')[0]}
                  </span>
                </div>
                <button 
                  onClick={handleLogout}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg text-slate-500 hover:text-red-600 dark:text-slate-400 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200"
                >
                  <FiLogOut className="w-4 h-4" />
                  <span className="font-medium">Log Out</span>
                </button>
              </div>
            ) : (
              <div className="ml-4 pl-4 border-l border-slate-200 dark:border-slate-700">
                <Link 
                  to="/login" 
                  className="inline-flex items-center space-x-2 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg font-medium hover:from-blue-700 hover:to-cyan-600 hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-200"
                >
                  <span>Log In</span>
                </Link>
              </div>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <FiX className="w-6 h-6" />
            ) : (
              <FiMenu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-700 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl">
          <div className="px-4 py-4 space-y-2">
            <Link
              to="/"
              onClick={closeMobileMenu}
              className="flex items-center space-x-3 px-4 py-3 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50 dark:hover:from-blue-900/30 dark:hover:to-cyan-900/30 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 group relative"
            >
              <FiHome className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              <span className="font-medium">Home</span>
            </Link>
            <Link
              to="/bookmarks"
              onClick={closeMobileMenu}
              className="flex items-center space-x-3 px-4 py-3 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50 dark:hover:from-blue-900/30 dark:hover:to-cyan-900/30 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 group relative"
            >
              <FiBookmark className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              <span className="font-medium">Bookmarks</span>
            </Link>

            {isAuthenticated && user ? (
              <>
                <div className="pt-4 mt-4 border-t border-slate-200 dark:border-slate-700">
                  <div className="flex items-center space-x-3 px-4 py-3 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-lg mb-2">
                    <FiUser className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    <span className="font-medium text-slate-700 dark:text-slate-200">
                      {user.name}
                    </span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-slate-500 hover:text-red-600 dark:text-slate-400 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200"
                  >
                    <FiLogOut className="w-5 h-5" />
                    <span className="font-medium">Log Out</span>
                  </button>
                </div>
              </>
            ) : (
              <div className="pt-4 mt-4 border-t border-slate-200 dark:border-slate-700">
                <Link
                  to="/login"
                  onClick={closeMobileMenu}
                  className="block w-full text-center px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg font-medium hover:from-blue-700 hover:to-cyan-600 transition-all duration-200"
                >
                  Log In
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;