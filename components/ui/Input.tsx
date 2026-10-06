import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export default function Input({
  label,
  error,
  helperText,
  id,
  className = '',
  ...props
}: InputProps) {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="input-group">
      {label && (
        <label htmlFor={inputId} className="input-label">
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={`input-field ${className}`}
        style={error ? { borderColor: 'var(--danger)' } : {}}
        {...props}
      />
      {error && (
        <span style={{ fontSize: '0.75rem', color: 'var(--danger)', marginTop: 2 }}>
          {error}
        </span>
      )}
      {!error && helperText && (
        <span style={{ fontSize: '0.75rem', color: 'var(--text-subtle)', marginTop: 2 }}>
          {helperText}
        </span>
      )}
    </div>
  );
}
