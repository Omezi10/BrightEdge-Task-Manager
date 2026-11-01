export const KEY = 'brightedge.tasks.v1';
export const PER = 5;

export const fmt = (i) =>
  new Date(i + 'T00:00:00Z').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
export const iso = (d = new Date()) => new Date(d.getTime() - d.getTimezoneOffset() * 6e4).toISOString().slice(0, 10);
export const tm = (t) => {
  const [h, m] = (t.time || '09:00').split(':');
  return new Date(2000, 0, 1, +h, +m).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
};
export const dueAt = (t) => new Date(t.due + 'T' + (t.time || '09:00') + ':00');

export function left(t) {
  const m = Math.max(1, Math.round((dueAt(t) - Date.now()) / 6e4));
  return m < 90 ? m + ' minute' + (m > 1 ? 's' : '') : m < 2880 ? Math.round(m / 60) + ' hours' : Math.round(m / 1440) + ' days';
}

let AC;
export function beep() {
  try {
    AC = AC || new (window.AudioContext || window.webkitAudioContext)();
    [0, 0.4, 0.8].forEach((d) => {
      const o = AC.createOscillator(), g = AC.createGain(), n = AC.currentTime + d;
      o.frequency.value = 880; o.connect(g); g.connect(AC.destination);
      g.gain.setValueAtTime(0.25, n); g.gain.exponentialRampToValueAtTime(0.001, n + 0.3);
      o.start(n); o.stop(n + 0.3);
    });
  } catch (e) {}
}

export function stats(tasks) {
  const t = tasks.length, c = tasks.filter((x) => x.done).length;
  return { t, c, a: t - c, r: t ? Math.round((c / t) * 100) : 0 };
}

export function filterTasks(tasks, { view, tab, q, sort }) {
  let l = tasks.slice();
  if (view === 'active') l = l.filter((t) => !t.done);
  if (view === 'completed') l = l.filter((t) => t.done);
  if (view === 'overview') {
    if (tab === 'active') l = l.filter((t) => !t.done);
    if (tab === 'completed') l = l.filter((t) => t.done);
  }
  const s = q.trim().toLowerCase();
  if (s) l = l.filter((t) => (t.title + ' ' + t.desc).toLowerCase().includes(s));
  const pr = { High: 0, Medium: 1, Low: 2 };
  l.sort(
    sort === 'az' ? (a, b) => a.title.localeCompare(b.title)
    : sort === 'old' ? (a, b) => a.id - b.id
    : sort === 'pri' ? (a, b) => pr[a.priority] - pr[b.priority]
    : (a, b) => b.id - a.id
  );
  return l;
}