'use client';
import { useEffect, useState } from 'react';
import Icon from './icon';

const TABS = [['all', 'grid', 'All Tasks', ''], ['active', 'play', 'Active Tasks', ''], ['completed', 'cc', 'Completed Tasks', 'g']];
const SORTS = [['new', 'Newest first'], ['old', 'Oldest first'], ['az', 'A–Z'], ['pri', 'Priority']];

export default function Bar({ active, onTab, q, setQ, ph, setSort, showFilter }) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return;
    const f = (e) => { if (!e.target.closest('.rel')) setOpen(false); };
    document.addEventListener('click', f);
    return () => document.removeEventListener('click', f);
  }, [open]);

  return (
    <div className="bar">
      {TABS.map((t) => (
        <button key={t[0]} className={`tab${active === t[0] ? ' on ' + t[3] : ''}`} onClick={() => onTab(t[0])}>
          <Icon n={t[1]} style={{ width: 18 }} />{t[2]}
        </button>
      ))}
      <label className="search">
        <Icon n="s" />
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={ph} autoComplete="off" />
      </label>
      {showFilter && (
        <div className="rel">
          <button className="fb" aria-label="Sort" onClick={() => setOpen(!open)}><Icon n="filt" /></button>
          {open && (
            <div className="pop" style={{ minWidth: 170 }}>
              {SORTS.map(([k, l]) => <button key={k} onClick={() => { setSort(k); setOpen(false); }}>{l}</button>)}
            </div>
          )}
        </div>
      )}
    </div>
  );
}