export default function Modal({ onClose, children }) {
  return (
    <div className="ov" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="md" role="dialog" aria-modal="true">{children}</div>
    </div>
  );
}