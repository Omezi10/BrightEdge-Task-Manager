import Icon from './icon';

function Donut({ r }) {
  const c = ((2 * Math.PI * 32 * r) / 100).toFixed(1);
  return (
    <div className="donut">
      <svg viewBox="0 0 80 80" width="76" height="76">
        <circle cx="40" cy="40" r="32" fill="none" stroke="#C9D3FF" strokeWidth="9" opacity=".7" />
        <circle cx="40" cy="40" r="32" fill="none" stroke="#1F4FE0" strokeWidth="9" strokeLinecap="round" strokeDasharray={`${c} 999`} transform="rotate(-90 40 40)" />
      </svg>
      <b>{r}%</b>
    </div>
  );
}

function Card({ label, value, bg, icon, color, trend }) {
  return (
    <div className="st" style={{ background: `var(${bg})` }}>
      <div className="bi" style={{ background: color }}><Icon n={icon} /></div>
      <div><small>{label}</small><strong>{value}</strong>{trend && <em>{trend}</em>}</div>
    </div>
  );
}

export default function Stats({ view, s }) {
  const ov = view === 'overview';
  return (
    <div className="stats">
      <Card label="Total Tasks" value={s.t} bg="--c1" icon="clip" color="#1F4FE0" trend={ov ? '+2 from last week' : ''} />
      {view !== 'completed' && (
        <Card label="Active Tasks" value={s.a} bg={ov ? '--c2r' : '--c2'} icon="play" color={ov ? '#E5202E' : '#7C5CE6'} trend={ov ? '+1 from last week' : ''} />
      )}
      <Card label="Completed Tasks" value={s.c} bg="--c3" icon="check" color="#12A150" trend={ov ? '+1 from last week' : ''} />
      <div className="st" style={{ background: 'var(--c4)' }}>
        <Donut r={s.r} />
        <div><small>Completion Rate</small><strong>{s.r}%</strong>{ov && <em>+8% from last week</em>}</div>
      </div>
    </div>
  );
}