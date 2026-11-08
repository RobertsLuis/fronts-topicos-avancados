export default function ProgressBar({ value, label, showValue = true }) {
  const percentage = Number.isFinite(value)
    ? Math.min(100, Math.max(0, value))
    : 0;

  return (
    <div className="progress">
      {(label || showValue) && (
        <div className="progress-caption">
          <span>{label}</span>
          {showValue && <span>{Math.round(percentage)}%</span>}
        </div>
      )}
      <div
        className="progress-track"
        role="progressbar"
        aria-label={label || 'Progresso'}
        aria-valuenow={percentage}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div className="progress-fill" style={{ width: `${percentage}%` }} />
      </div>
    </div>
  );
}
