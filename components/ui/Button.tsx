'use client';

import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const sizeStyles = {
    sm: { padding: '6px 12px', fontSize: '0.8rem' },
    md: { padding: '10px 18px', fontSize: '0.875rem' },
    lg: { padding: '12px 24px', fontSize: '1rem' },
  }[size];

  return (
    <button
      className={`btn btn-${variant} ${className}`}
      disabled={disabled || isLoading}
      style={{
        ...sizeStyles,
        opacity: disabled || isLoading ? 0.6 : 1,
        cursor: disabled || isLoading ? 'not-allowed' : 'pointer',
      }}
      {...props}
    >
      {isLoading ? (
        <span style={{
          width: 16,
          height: 16,
          border: '2px solid currentColor',
          borderRightColor: 'transparent',
          borderRadius: '50%',
          display: 'inline-block',
          animation: 'spin 0.6s linear infinite'
        }} />
      ) : leftIcon}
      {children}
      {!isLoading && rightIcon}
    </button>
  );
}
