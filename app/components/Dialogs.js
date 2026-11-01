import Icon from './icon';
import Modal from './Modal';

const Head = ({ onClose, children }) => (
  <h4>{children}<button onClick={onClose} aria-label="Close"><Icon n="x" /></button></h4>
);

export function DeleteDialog({ task, onClose, onConfirm }) {
  return (
    <Modal onClose={onClose}>
      <Head onClose={onClose}>Delete task?</Head>
      <p>“{task.title}” will be permanently removed.</p>
      <div className="mf">
        <button className="c" onClick={onClose}>Cancel</button>
        <button className="btn red" onClick={onConfirm}>Delete</button>
      </div>
    </Modal>
  );
}

export function HelpDialog({ onClose }) {
  return (
    <Modal onClose={onClose}>
      <Head onClose={onClose}>How to use this tool</Head>
      <p style={{ lineHeight: 1.7, fontSize: 15 }}>
        • <b>Add:</b> click “Create New Task”, enter a title (description is optional) and save.<br />
        • <b>Complete:</b> tick the checkbox beside a task. Tick again to reopen it.<br />
        • <b>Delete:</b> click the red bin and confirm.<br />
        • <b>Edit:</b> click the pencil.<br />
        • <b>Search & sort:</b> use the search bars and the filter button.<br />
        • Your data is saved in this browser automatically.
      </p>
      <div className="mf"><button className="btn" onClick={onClose}>Got it</button></div>
    </Modal>
  );
}

export function ReminderDialog({ msgs, onClose, onView }) {
  return (
    <Modal onClose={onClose}>
      <Head onClose={onClose}>⏰ Task reminder</Head>
      <p style={{ lineHeight: 1.7 }}>{msgs.map((m, i) => <span key={i}>{m}<br /></span>)}</p>
      <div className="mf">
        <button className="c" onClick={onClose}>Dismiss</button>
        <button className="btn" onClick={onView}>View tasks</button>
      </div>
    </Modal>
  );
}