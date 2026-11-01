'use client';
import { useEffect, useState } from 'react';
import Icon from './icon';
import { fmt } from '../lib/helpers';

export default function Topbar({ q, setQ, ph, hi, onMenu, dark, onTheme }) {
  const [open, setOpen] = useState(false);
  const [perm, setPerm] = useState('');

  useEffect(() => {
    if (typeof Notification !== 'undefined') setPerm(Notification.permission);
  }, []);
  useEffect(() => {
    if (!open) return;
    const f = (e) => { if (!e.target.closest('.rel')) setOpen(false); };
    document.addEventListener('click', f);
    return () => document.removeEventListener('click', f);
  }, [open]);

  const ask = () => { try { Notification.requestPermission().then(setPerm); } catch (e) {} };
  const date = new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });

  return (
    <div className="top">
      <button className="hb" aria-label="Open menu" onClick={onMenu}>
        <svg className="ic" viewBox="0 0 24 24" style={{ width: 24, height: 24 }}><path d="M4 6h16M4 12h16M4 18h16" /></svg>
      </button>
      <label className="search">
        <Icon n="s" />
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={ph} autoComplete="off" />
      </label>
      <div className="sp" />
      <div className="rel">
        <button className="bell" aria-label="Notifications" onClick={() => setOpen(!open)}>
          <svg className="ic" viewBox="0 0 24 24" style={{ width: 28, height: 28 }}><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10.3 21a1.9 1.9 0 0 0 3.4 0" /></svg>
          {hi.length > 0 && <i>{hi.length}</i>}
        </button>
        {open && (
          <div className="pop">
            {hi.length ? hi.map((t) => (
              <div key={t.id}><b>{t.title}</b><br /><small>High priority · due {fmt(t.due)}</small></div>
            )) : <div>No new notifications</div>}
            {perm === 'default' && <button onClick={ask}>🔔 Enable device alerts</button>}
          </div>
        )}
      </div>
      <div className="date">{date}</div>
      <button className="theme" aria-label="Toggle theme" onClick={onTheme}><Icon n={dark ? 'moon' : 'sun'} /></button>
    </div>
  );
}