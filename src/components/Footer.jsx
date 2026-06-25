import React from 'react';
import { Link } from 'react-router-dom';
import { LuCloudSun } from 'react-icons/lu';

function Footer() {
    const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-10">
        {/* Top Section: Brand + Quick Links */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/30">
          <LuCloudSun className="text-white text-xl" />
        </div>
              <span className="text-2xl font-extrabold bg-gradient-to-r from-blue-700 via-cyan-600 to-blue-500 bg-clip-text text-transparent">
                Atmosphere
              </span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-sm">
              Get weather insights that help you plan your day with confidence.
            </p>
          </div>
          
          {/* Quick Links */}
          <div className="flex flex-wrap gap-8">
            <div className="flex flex-col gap-3">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">Product</h4>
              <Link to="/" className="text-sm text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition">Home</Link>
              <Link to="/bookmarks" className="text-sm text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition">Bookmarks</Link>
            </div>
            
            <div className="flex flex-col gap-3">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">Legal</h4>
              <Link to="/privacy" className="text-sm text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition">Privacy Policy</Link>
              <Link to="/terms" className="text-sm text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition">Terms of Service</Link>
            </div>
          </div>
        </div>
        
        {/* Bottom Divider */}
        <div className="pt-8 border-t border-slate-100 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            © {currentYear} Atmosphere Weather. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
