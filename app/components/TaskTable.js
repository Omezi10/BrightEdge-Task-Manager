import Icon from './icon';
import { fmt, tm, PER } from '../lib/helpers';

const HEAD = {
  all: ['Task', 'Description', 'Status', 'Created On'],
  active: ['Task', 'Description', 'Priority', 'Due Date'],
  completed: ['Task', 'Description', 'Completed On'],
};

function Actions({ t, full, onEdit, onDel }) {
  return (
    <div className="act">
      {full && <button className="ib" aria-label="Edit" onClick={() => onEdit(t.id)}><Icon n="edit" /></button>}
      <button className="ib del" aria-label="Delete" onClick={() => onDel(t.id)}><Icon n="trash" /></button>
    </div>
  );
}

export default function TaskTable({ view, list, page, setPage, onToggle, onEdit, onDel }) {
  const pages = Math.max(1, Math.ceil(list.length / PER));
  const pg = Math.min(page, pages);
  const s = (pg - 1) * PER;
  const sl = list.slice(s, s + PER);
  const noun = view === 'active' ? 'active tasks' : view === 'completed' ? 'completed tasks' : 'tasks';

  const row = (t) => {
    if (view === 'completed') {
      return (
        <tr key={t.id} className="done">
          <td style={{ width: 50 }}><button className="k on g" aria-label="Mark active" onClick={() => onToggle(t.id)}><Icon n="check" /></button></td>
          <td className="t">{t.title}</td>
          <td className="d">{t.desc}</td>
          <td><span className="cal"><Icon n="cal" />{fmt(t.completedOn || t.created)}</span> &nbsp; <span className="pill Completed">Completed</span></td>
          <td><Actions t={t} full={false} onDel={onDel} /></td>
        </tr>
      );
    }
    const chk = (
      <td style={{ width: 50 }}>
        <button className={`k ${t.done ? 'on' : ''}`} aria-label="Toggle complete" onClick={() => onToggle(t.id)}>{t.done && <Icon n="check" />}</button>
      </td>
    );
    if (view === 'active') {
      return (
        <tr key={t.id}>
          {chk}
          <td className="t">{t.title}</td>
          <td className="d">{t.desc}</td>
          <td><span className={`pill ${t.priority}`}>{t.priority}</span></td>
          <td><span className="cal"><Icon n="cal" />{fmt(t.due)}, {tm(t)}</span></td>
          <td><Actions t={t} full onEdit={onEdit} onDel={onDel} /></td>
        </tr>
      );
    }
    return (
      <tr key={t.id} className={t.done ? 'done' : ''}>
        {chk}
        <td className="t">{t.title}</td>
        <td className="d">{t.desc}</td>
        <td><span className={`pill ${t.done ? 'Completed' : 'Pending'}`}>{t.done ? 'Completed' : 'Pending'}</span></td>
        <td><span className="cal"><Icon n="cal" />{fmt(t.created)}</span></td>
        <td><Actions t={t} full onEdit={onEdit} onDel={onDel} /></td>
      </tr>
    );
  };

  return (
    <>
      <div className="tw">
        <table>
          <thead>
            <tr>
              <th style={{ width: 50 }}></th>
              {HEAD[view].map((h) => <th key={h}>{h}</th>)}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sl.length ? sl.map(row) : <tr><td colSpan="6" className="empty">No {noun} found.</td></tr>}
          </tbody>
        </table>
      </div>
      <div className={`ft ${view === 'completed' ? 'gr' : ''}`}>
        <span>{list.length ? `Showing ${s + 1}–${s + sl.length} of ${list.length} ${noun}` : `Showing 0 ${noun}`}</span>
        <div className="pg">
          <button disabled={pg < 2} aria-label="Previous" onClick={() => setPage(pg - 1)}><Icon n="l" /></button>
          {Array.from({ length: pages }, (_, i) => (
            <button key={i} className={i + 1 === pg ? 'on' : ''} onClick={() => setPage(i + 1)}>{i + 1}</button>
          ))}
          <button disabled={pg >= pages} aria-label="Next" onClick={() => setPage(pg + 1)}><Icon n="r" /></button>
        </div>
      </div>
    </>
  );
}