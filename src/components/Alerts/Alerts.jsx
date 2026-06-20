export default function Alerts({ alerts, theme = 'dark' }) {
  const isDark = theme === 'dark'
  const shell = isDark ? 'border-white/10 bg-slate-900/50' : 'border-white/80 bg-white/75'
  const heading = isDark ? 'text-white' : 'text-slate-900'

  const getAlertStyles = (type) => {
    switch (type) {
      case 'warning': return isDark ? 'border-amber-500/40 bg-amber-500/10' : 'border-amber-200 bg-amber-50'
      case 'danger': return isDark ? 'border-red-500/40 bg-red-500/10' : 'border-red-200 bg-red-50'
      case 'info': return isDark ? 'border-sky-500/40 bg-sky-500/10' : 'border-sky-200 bg-sky-50'
      default: return isDark ? 'border-slate-500/40 bg-slate-500/10' : 'border-slate-200 bg-slate-50'
    }
  }

  const getAlertIcon = (type) => {
    switch (type) {
      case 'warning': return '⚠️'
      case 'danger': return '🚨'
      case 'info': return 'ℹ️'
      default: return '📢'
    }
  }

  return (
    <div className={`rounded-3xl border p-6 backdrop-blur-2xl shadow-2xl ${shell}`}>
      <h3 className={`mb-5 text-lg font-bold ${heading}`}>🚨 Safety Alerts</h3>

      {alerts.length === 0 ? (
        <p className={`text-center ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>All clear! No active weather alerts.</p>
      ) : (
        <div className="space-y-3">
          {alerts.map((alert) => (
            <div key={alert.id} className={`rounded-2xl border p-4 ${getAlertStyles(alert.type)}`}>
              <div className="mb-2 flex items-center gap-2">
                <span className="text-xl">{getAlertIcon(alert.type)}</span>
                <h4 className={`font-bold ${heading}`}>{alert.title}</h4>
              </div>
              <p className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>{alert.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
