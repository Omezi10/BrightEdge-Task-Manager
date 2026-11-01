'use client';
import { useEffect, useState } from 'react';
import Icon from './icon';
import { fmt } from '../lib/helpers';

export default function TaskList({ list, onToggle, onEdit, onDel }) {
  const [menu, setMenu] = useState(null);
  useEffect(() => {
    const f = (e) => { if (!e.target.closest('[data-m]') && !e.target.closest('.pop')) setMenu(null); };
    document.addEventListener('click', f);
    return () => document.removeEventListener('click', f);
  }, []);

  if (!list.length) return <div className="empty">No tasks found.</div>;
  return list.slice(0, 5).map((t) => (
    <div key={t.id} className={`row ${t.done ? 'done' : ''}`}>
      <button className={`ci ${t.done ? 'on' : ''}`} aria-label="Toggle complete" onClick={() => onToggle(t.id)}>{t.done && <Icon n="check" />}</button>
      <div className="tx"><b>{t.title}</b><small>{t.desc}</small></div>
      <div className="meta">
        <span className="cal"><Icon n="cal" />{fmt(t.done ? t.completedOn || t.created : t.due)}</span>
        {t.done ? <span className="pill Completed">Completed</span> : <span className="dv" style={{ width: 1, height: 26, background: 'var(--line)' }} />}
      </div>
      <div className="rel">
        <button className="ib" data-m={t.id} aria-label="More" onClick={() => setMenu(menu === t.id ? null : t.id)}><Icon n="dots" /></button>
        {menu === t.id && (
          <div className="pop" style={{ minWidth: 140, top: 40 }}>
            <button onClick={() => { setMenu(null); onEdit(t.id); }}>Edit</button>
            <button onClick={() => { setMenu(null); onDel(t.id); }}>Delete</button>
          </div>
        )}
      </div>
    </div>
  ));
}