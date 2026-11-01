'use client';
import { useEffect, useRef, useState } from 'react';
import Icon from './icon';
import Modal from './Modal';
import { iso } from '../lib/helpers';

export default function TaskModal({ task, onSave, onClose }) {
  const t = task || { title: '', desc: '', priority: 'Medium', due: iso(), time: '09:00', big: false };
  const [f, setF] = useState({ title: t.title, desc: t.desc, priority: t.priority, due: t.due, time: t.time || '09:00', big: !!t.big });
  const [err, setErr] = useState(false);
  const ref = useRef(null);
  useEffect(() => { ref.current && ref.current.focus(); }, []);

  const set = (k) => (e) => setF({ ...f, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value });
  const submit = () => {
    const title = f.title.trim();
    if (!title) { setErr(true); return ref.current.focus(); }
    onSave({ title, desc: f.desc.trim(), priority: f.priority, due: f.due || iso(), time: f.time || '09:00', big: f.big });
  };

  return (
    <Modal onClose={onClose}>
      <h4>
        <span className="pl"><Icon n={task ? 'edit' : 'plus'} /></span>
        {task ? 'Edit Task' : 'Create New Task'}
        <button onClick={onClose} aria-label="Close"><Icon n="x" /></button>
      </h4>
      <label>Task Title <i>*</i></label>
      <input ref={ref} value={f.title} onChange={set('title')} onKeyDown={(e) => e.key === 'Enter' && submit()} placeholder="e.g. Design marketing materials" maxLength={80} />
      <div className="err" style={{ display: err ? 'block' : 'none' }}>Please enter a task title.</div>
      <label>Description (Optional)</label>
      <textarea value={f.desc} onChange={set('desc')} placeholder="Add more details…" />
      <div className="two">
        <div>
          <label>Priority</label>
          <select value={f.priority} onChange={set('priority')}>
            {['High', 'Medium', 'Low'].map((p) => <option key={p}>{p}</option>)}
          </select>
        </div>
        <div><label>Due Date</label><input type="date" value={f.due} onChange={set('due')} /></div>
      </div>
      <div className="two">
        <div><label>Due Time</label><input type="time" value={f.time} onChange={set('time')} /></div>
        <div style={{ display: 'flex', alignItems: 'flex-end' }}>
          <label style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontWeight: 500, fontSize: 13, margin: '0 0 10px' }}>
            <input type="checkbox" checked={f.big} onChange={set('big')} style={{ width: 18, height: 18, flex: 'none' }} />
            Big project: remind me 1 day before
          </label>
        </div>
      </div>
      <p style={{ fontSize: 12, color: 'var(--mut)', marginTop: 10 }}>
        ⏰ You’ll get an alarm 30 minutes before the due time (1 day before for big projects). Keep this tab open.
      </p>
      <div className="mf">
        <button className="c" onClick={onClose}>Cancel</button>
        <button className="btn" onClick={submit}>Save Task</button>
      </div>
    </Modal>
  );
}