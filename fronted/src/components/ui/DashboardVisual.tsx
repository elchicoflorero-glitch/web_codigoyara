interface DashboardVisualProps {
  compact?: boolean;
}

export default function DashboardVisual({ compact = false }: DashboardVisualProps) {
  return (
    <div className={`dashboard ${compact ? "dashboard-compact" : ""}`}>
      <div className="dash-sidebar">
        <span className="dash-logo" />
        {[0, 1, 2, 3, 4].map((item) => (
          <span className={item === 0 ? "active" : ""} key={item} />
        ))}
      </div>
      <div className="dash-main">
        <div className="dash-top">
          <span>Vista general</span>
          <div><i /><i /></div>
        </div>
        <div className="dash-metrics">
          <div><small>Ingresos</small><b>$84.2K</b><em>+12.5%</em></div>
          <div><small>Usuarios</small><b>2,429</b><em>+8.2%</em></div>
          <div><small>Conversión</small><b>24.8%</b><em>+4.1%</em></div>
        </div>
        <div className="dash-lower">
          <div className="chart-card">
            <div className="chart-head">
              <span>Rendimiento</span>
              <small>Últimos 30 días</small>
            </div>
            <div className="chart-bars">
              {[38, 54, 43, 68, 60, 82, 74, 91, 76, 88, 96, 84].map((h, i) => (
                <i key={i} style={{ height: `${h}%` }} />
              ))}
            </div>
          </div>
          <div className="activity-card">
            <span>Actividad</span>
            {[1, 2, 3].map((n) => (
              <div key={n}>
                <i />
                <p><b>Nuevo registro</b><small>Hace {n * 4} min</small></p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
