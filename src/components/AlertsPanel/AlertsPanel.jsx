import { FaExclamationTriangle, FaInfoCircle, FaCheckCircle, FaTimes } from 'react-icons/fa'

export default function AlertsPanel({ alerts, theme = 'dark', weatherTheme }) {
  const isDark = theme === 'dark'

  const shell = isDark
    ? 'border-white/10 bg-slate-900/50 shadow-black/20'
    : 'border-white/80 bg-white/75 shadow-slate-900/10'

  const heading = isDark ? 'text-white' : 'text-slate-900'
  const muted = isDark ? 'text-slate-300' : 'text-slate-600'
  const emptyText = isDark ? 'text-slate-400' : 'text-slate-500'

  const getAlertStyles = (type) => {
    switch (type) {
      case 'warning':
        return {
          bg: isDark ? 'bg-amber-500/10' : 'bg-amber-50',
          border: isDark ? 'border-amber-500/30' : 'border-amber-200',
          leftBar: 'border-l-amber-500',
          icon: <FaExclamationTriangle className="shrink-0 text-2xl text-amber-500" />,
        }
      case 'danger':
        return {
          bg: isDark ? 'bg-red-500/10' : 'bg-red-50',
          border: isDark ? 'border-red-500/30' : 'border-red-200',
          leftBar: 'border-l-red-500',
          icon: <FaExclamationTriangle className="shrink-0 text-2xl text-red-500" />,
        }
      case 'info':
        return {
          bg: isDark ? 'bg-sky-500/10' : 'bg-sky-50',
          border: isDark ? 'border-sky-500/30' : 'border-sky-200',
          leftBar: 'border-l-sky-500',
          icon: <FaInfoCircle className="shrink-0 text-2xl text-sky-500" />,
        }
      case 'success':
        return {
          bg: isDark ? 'bg-green-500/10' : 'bg-green-50',
          border: isDark ? 'border-green-500/30' : 'border-green-200',
          leftBar: 'border-l-green-500',
          icon: <FaCheckCircle className="shrink-0 text-2xl text-green-500" />,
        }
      default:
        return {
          bg: isDark ? 'bg-sky-500/10' : 'bg-sky-50',
          border: isDark ? 'border-sky-500/30' : 'border-sky-200',
          leftBar: 'border-l-sky-500',
          icon: <FaInfoCircle className="shrink-0 text-2xl text-sky-500" />,
        }
    }
  }

  return (
    <div className={`flex flex-col overflow-hidden rounded-3xl border backdrop-blur-2xl shadow-2xl transition-all duration-300 hover:shadow-sky-500/10 ${shell}`} style={{ borderColor: `${weatherTheme.primary}30` }}>
      <div className={`flex items-center justify-between border-b p-5 ${isDark ? 'border-white/5' : 'border-slate-200/80'}`}>
        <h3 className={`flex items-center gap-2 text-lg font-bold ${heading}`}>
          <FaExclamationTriangle style={{ color: weatherTheme.primary }} /> Active Alerts
        </h3>
        <span className="rounded-full bg-gradient-to-r from-sky-600 to-cyan-600 px-3 py-1 text-xs font-bold text-white">
          {alerts.length}
        </span>
      </div>

      <div className="flex-1 space-y-3 p-5">
        {alerts.length === 0 ? (
          <div className={`flex-1 flex items-center justify-center py-6 text-center ${emptyText}`}>
            <p className="font-medium">
              <FaCheckCircle className="mr-2 inline-block text-green-500" />
              All clear! No active weather alerts.
            </p>
          </div>
        ) : (
          alerts.map((alert) => {
            const styles = getAlertStyles(alert.type)
            return (
              <div
                key={alert.id}
                className={`flex items-start gap-3 rounded-2xl border border-l-4 p-4 transition-all duration-300 hover:translate-x-1 hover:shadow-md ${styles.bg} ${styles.border} ${styles.leftBar}`}
              >
                {styles.icon}
                <div className="min-w-0 flex-1">
                  <h4 className={`mb-1 font-bold ${heading}`}>{alert.title}</h4>
                  <p className={`text-sm leading-relaxed ${muted}`}>{alert.message}</p>
                </div>
                <button className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition ${isDark ? 'text-slate-400 hover:bg-white/10 hover:text-white' : 'text-slate-400 hover:bg-slate-100 hover:text-slate-700'}`}>
                  <FaTimes />
                </button>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
