import React from 'react';
function AlertCard({ alert, onDismiss }) {
  const { id, location, message, ctaLabel, ctaAction } = alert;
  return (
    <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/30 dark:to-orange-900/30 border border-amber-200 dark:border-amber-800/50 rounded-3xl p-6 transition-all duration-300 shadow-lg hover:shadow-xl">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/50 dark:to-orange-900/50 flex items-center justify-center text-2xl shadow-inner">
            ⚠️
          </div>
          <div>
            <div className="text-sm font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider">
              Weather Alert
            </div>
            {location && (
              <div className="text-base font-bold text-slate-800 dark:text-slate-100 mt-1">
                {location}
              </div>
            )}
          </div>
        </div>
        {onDismiss && (
          <button
            onClick={() => onDismiss?.(id)}
            className="w-10 h-10 rounded-xl bg-white/60 dark:bg-slate-800/60 flex items-center justify-center text-slate-500 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 transition-all duration-200"
          >
            ✕
          </button>
        )}
      </div>
      <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-base">
        Storm front approaching{' '}
        {message}
      </p>
      {ctaLabel && (
        <button
          onClick={ctaAction}
          className="mt-6 inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
        >
          {ctaLabel} →
        </button>
      )}
    </div>
  );
}
export default AlertCard;
