import Icon from './iconcomponent';

const NAV = [['overview', 'home', 'Overview'], ['all', 'grid', 'All Tasks'], ['active', 'play', 'Active Tasks'], ['completed', 'cc', 'Completed Tasks']];

export default function Sidebar({ view, go, onHelp }) {
  const done = view === 'completed';
  return (
    <aside>
      <div className="sb">
        <div className="brand">
          <svg width="44" height="44" viewBox="0 0 44 44">
            <defs><linearGradient id="lg" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#4C7DFF" /><stop offset="1" stopColor="#7B3FE4" /></linearGradient></defs>
            <path d="M8 4h20l8 8v8L22 22l14 4v8L26 40H8z" fill="url(#lg)" />
            <path d="M15 12h10l3 3-3 3H15zM15 24h12l3 3-3 3H15z" fill="#0A1A5C" />
          </svg>
          <div>BrightEdge<br />Technologies</div>
        </div>
        <nav>
          {NAV.map((n) => (
            <button key={n[0]} className={view === n[0] ? 'on' : ''} onClick={() => go(n[0])}><Icon n={n[1]} />{n[2]}</button>
          ))}
        </nav>
        <div className="hr" />
        {done ? (
          <div className="promo ok">
            <svg className="art" viewBox="0 0 200 92">
              <circle cx="100" cy="46" r="30" fill="#12A150" />
              <path d="m86 47 10 10 19-21" fill="none" stroke="#fff" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M52 30l14 8M60 58l14-6M148 38l14-8M140 58l14 6M100 6v10" stroke="#F5B73B" strokeWidth="3" strokeLinecap="round" />
            </svg>
            <b>Great Work!</b>
            <p>You’ve completed<br />all your important tasks.</p>
            <button onClick={onHelp}>Keep Going <Icon n="arr" style={{ width: 16 }} /></button>
          </div>
        ) : (
          <div className="promo">
            <svg className="art" viewBox="0 0 200 92">
              <ellipse cx="100" cy="86" rx="95" ry="22" fill="#1B3AA0" />
              <g transform="rotate(40 100 44)">
                <path d="M100 4c14 10 18 30 14 52H86C82 34 86 14 100 4z" fill="#EAF0FF" />
                <circle cx="100" cy="30" r="8" fill="#1F4FE0" stroke="#0A1A5C" strokeWidth="3" />
                <path d="M86 46l-12 14 12-2zM114 46l12 14-12-2z" fill="#3D6BFF" />
                <path d="M94 58h12l-6 18z" fill="#FFB020" />
              </g>
            </svg>
            <b>Stay Productive!</b>
            <p>Organize, track and<br />achieve more together.</p>
            <button onClick={onHelp}>Learn More <Icon n="arr" style={{ width: 16 }} /></button>
          </div>
        )}
        <div className="user">
          <div className="av">MG</div>
          <div><b>Melissa Grant</b><small>Operations Manager</small></div>
          <svg className="ic" viewBox="0 0 24 24"><path d="m6 15 6-6 6 6" /></svg>
        </div>
      </div>
    </aside>
  );
}