import Icon from './iconcomponent';

const META = {
  all: ['grid', 'All Tasks', 'View and manage all your tasks in one place.'],
  active: ['play', 'Active Tasks', 'Tasks that are in progress and need your attention.'],
  completed: ['cc', 'Completed Tasks', 'Tasks that have been successfully completed.'],
};

export default function PageHeader({ view, done, onNew }) {
  const m = META[view];
  return (
    <div className="ph">
      <div className={`pi ${view === 'completed' ? 'g' : ''}`}><Icon n={m[0]} /></div>
      <div><h2>{m[1]}</h2><p>{m[2]}</p></div>
      {view === 'completed' ? (
        <div className="tro">
          <span className="e">🏆</span>
          <div><b>{done} tasks completed</b><small>Keep up the great work!</small></div>
          <span className="e">🎉</span>
        </div>
      ) : (
        <button className="btn" onClick={onNew}><Icon n="plus" />Create New Task</button>
      )}
    </div>
  );
}