import { useEffect } from 'react';

export default function Toast({ toast, onDismiss }) {
  useEffect(() => {
    if (!toast) return undefined;
    const timer = window.setTimeout(onDismiss, 5000);
    return () => window.clearTimeout(timer);
  }, [toast, onDismiss]);

  if (!toast) return null;

  const isError = toast.variant === 'error';
  return (
    <div
      className={`toast toast-${isError ? 'error' : 'success'}`}
      role={isError ? 'alert' : 'status'}
      aria-atomic="true"
    >
      <p className="toast-message">{toast.message}</p>
      <button
        type="button"
        className="toast-close"
        onClick={onDismiss}
        aria-label="Fechar notificação"
      >
        <span aria-hidden="true">×</span>
      </button>
    </div>
  );
}
