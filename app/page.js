'use client';
import { useEffect, useState } from 'react';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import Hero from './components/Hero';
import PageHeader from './components/PageHeader';
import Stats from './components/stats';
import Bar from './components/Bar';
import TaskTable from './components/TaskTable';
import TaskList from './components/TaskList';
import TaskModal from './components/TaskModal';
import Icon from './components/iconcomponent';
import { DeleteDialog, HelpDialog, ReminderDialog } from './components/Dialogs';
import { seed } from './lib/data';
import { KEY, iso, fmt, tm, dueAt, left, beep, stats, filterTasks } from './lib/helpers';

const TITLE = 'BrightEdge Task Manager';
const PH = { overview: 'Search tasks…', all: 'Search tasks…', active: 'Search active tasks…', completed: 'Search completed tasks…' };

export default function Home() {
  const [tasks, setTasks] = useState(null);
  const [view, setView] = useState('overview');
  const [tab, setTab] = useState('all');
  const [q, setQ] = useState('');
  const [sort, setSort] = useState('new');
  const [page, setPage] = useState(1);
  const [drawer, setDrawer] = useState(false);
  const [modal, setModal] = useState(null);
  const [toast, setToast] = useState('');
  const [dark, setDark] = useState(false);

  const update = (n) => { setTasks(n); try { localStorage.setItem(KEY, JSON.stringify(n)); } catch (e) {} };
  const flash = (m) => { setToast(m); setTimeout(() => setToast(''), 2000); };
  const close = () => { setModal(null); document.title = TITLE; };

  // load saved tasks + theme
  useEffect(() => {
    let t;
    try { t = JSON.parse(localStorage.getItem(KEY)); } catch (e) {}
    setTasks(Array.isArray(t) ? t : seed());
    const d = document.documentElement;
    try { const th = localStorage.getItem('be.theme'); if (th) d.dataset.theme = th; } catch (e) {}
    setDark(d.dataset.theme ? d.dataset.theme === 'dark' : matchMedia('(prefers-color-scheme:dark)').matches);
  }, []);

  useEffect(() => { document.body.classList.toggle('menu', drawer); }, [drawer]);

  useEffect(() => {
    const k = (e) => { if (e.key === 'Escape') { close(); setDrawer(false); } };
    document.addEventListener('keydown', k);
    return () => document.removeEventListener('keydown', k);
  }, []);

  // reminders: 30 min before (1 day before for big projects)
  useEffect(() => {
    if (!tasks) return;
    const check = () => {
      const now = Date.now(), hit = [];
      const next = tasks.map((t) => {
        if (t.done || t.reminded) return t;
        const d = dueAt(t).getTime();
        if (now < d && now >= d - (t.big ? 864e5 : 18e5)) { hit.push(t); return { ...t, reminded: true }; }
        return t;
      });
      if (!hit.length) return;
      update(next);
      const msgs = hit.map((t) => `“${t.title}” is due in ${left(t)} (${fmt(t.due)}, ${tm(t)})`);
      try { if ('Notification' in window && Notification.permission === 'granted') hit.forEach((t, i) => new Notification('⏰ Task reminder', { body: msgs[i], tag: 'task' + t.id, requireInteraction: true })); } catch (e) {}
      try { navigator.vibrate && navigator.vibrate([300, 150, 300, 150, 300]); } catch (e) {}
      beep();
      document.title = '⏰ Task reminder';
      setModal({ type: 'remind', msgs });
    };
    check();
    const id = setInterval(check, 15000);
    document.addEventListener('visibilitychange', check);
    return () => { clearInterval(id); document.removeEventListener('visibilitychange', check); };
  }, [tasks]);

  if (!tasks) return null;

  const s = stats(tasks);
  const list = filterTasks(tasks, { view, tab, q, sort });
  const hi = tasks.filter((t) => !t.done && t.priority === 'High');
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

  const go = (v) => { setView(v); setPage(1); setQ(''); setDrawer(false); close(); };
  const toggle = (id) => {
    const t = tasks.find((x) => x.id === id);
    update(tasks.map((x) => (x.id === id ? { ...x, done: !x.done, completedOn: !x.done ? iso() : null } : x)));
    flash(t.done ? 'Task reopened' : 'Task completed');
  };
  const save = (f) => {
    const id = modal.id;
    if (id) update(tasks.map((t) => (t.id === id ? { ...t, ...f, reminded: false } : t)));
    else update([...tasks, { id: Math.max(0, ...tasks.map((t) => t.id)) + 1, ...f, created: iso(), done: false, completedOn: null, reminded: false }]);
    try { if (window.Notification && Notification.permission === 'default') Notification.requestPermission(); } catch (e) {}
    close(); flash(id ? 'Task updated' : 'Task added'); setPage(1);
  };
  const remove = () => { update(tasks.filter((t) => t.id !== modal.id)); close(); flash('Task deleted'); };
  const theme = () => {
    const d = document.documentElement, n = dark ? 'light' : 'dark';
    d.dataset.theme = n; setDark(n === 'dark');
    try { localStorage.setItem('be.theme', n); } catch (e) {}
  };
  const newTask = () => setModal({ type: 'form' });
  const edit = (id) => setModal({ type: 'form', id });
  const del = (id) => setModal({ type: 'del', id });
  const help = () => setModal({ type: 'help' });

  return (
    <>
      <Sidebar view={view} go={go} onHelp={help} />
      <div className="scrim" onClick={() => setDrawer(false)} />
      <main>
        <Topbar q={q} setQ={setQ} ph={PH[view]} hi={hi} onMenu={() => setDrawer(true)} dark={dark} onTheme={theme} />

        {view === 'overview' ? (
          <>
            <Hero greeting={greeting} />
            <Stats view={view} s={s} />
            <div className="panel">
              <div className="ph2">
                <div className="cb"><Icon n="check" style={{ width: 20 }} /></div>
                <h3>My Tasks</h3>
                <button className="btn" onClick={newTask}><Icon n="plus" />Create New Task</button>
              </div>
              <Bar active={tab} onTab={setTab} q={q} setQ={setQ} ph={PH[view]} setSort={setSort} showFilter={false} />
              <TaskList list={list} onToggle={toggle} onEdit={edit} onDel={del} />
            </div>
            <div className="ban">
              <div className="e">{s.a ? '🚀' : '🏆'}</div>
              <div>
                <b>{s.a ? `${s.a} task${s.a > 1 ? 's' : ''} still active` : 'You’re all caught up!'}</b>
                <p>{s.a ? 'Keep going — you’re making great progress.' : 'No active tasks at the moment. Great job!'}</p>
              </div>
              <button className="btn" onClick={newTask}>Create a Task <Icon n="arr" style={{ width: 18 }} /></button>
            </div>
          </>
        ) : (
          <>
            <PageHeader view={view} done={s.c} onNew={newTask} />
            <Stats view={view} s={s} />
            <Bar active={view} onTab={go} q={q} setQ={setQ} ph={PH[view]} setSort={setSort} showFilter />
            <TaskTable view={view} list={list} page={page} setPage={setPage} onToggle={toggle} onEdit={edit} onDel={del} />
          </>
        )}
      </main>

      {modal && modal.type === 'form' && <TaskModal key={modal.id || 'new'} task={tasks.find((t) => t.id === modal.id)} onSave={save} onClose={close} />}
      {modal && modal.type === 'del' && <DeleteDialog task={tasks.find((t) => t.id === modal.id)} onClose={close} onConfirm={remove} />}
      {modal && modal.type === 'help' && <HelpDialog onClose={close} />}
      {modal && modal.type === 'remind' && <ReminderDialog msgs={modal.msgs} onClose={close} onView={() => go('active')} />}
      {toast && <div className="toast">{toast}</div>}
    </>
  );
}