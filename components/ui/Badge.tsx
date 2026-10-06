import React from 'react';

type BadgeVariant = 'success' | 'warning' | 'danger' | 'info' | 'neutral';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  icon?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export default function Badge({
  children,
  variant = 'neutral',
  icon,
  className = '',
  style,
}: BadgeProps) {
  return (
    <span className={`badge badge-${variant} ${className}`} style={style}>
      {icon}
      {children}
    </span>
  );
}
