import React from 'react';

interface XenonLogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function XenonLogo({ size = 'md', className = '' }: XenonLogoProps) {
  const heights = {
    sm: 34,
    md: 46,
    lg: 58,
  };

  const h = heights[size];

  return (
    <div className={`xenon-logo-container ${className}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 2 }}>
      {/* Red Stylized X Box */}
      <svg
        width={h * 0.9}
        height={h * 0.9}
        viewBox="0 0 44 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ flexShrink: 0 }}
      >
        <rect width="44" height="44" rx="2" fill="#EA4A50" />
        {/* Stylized geometric X inside */}
        <path
          d="M12 9L25 35H32L19 9H12Z"
          fill="white"
          fillOpacity="0.88"
        />
        <path
          d="M32 9L19 35H12L25 9H32Z"
          fill="white"
          fillOpacity="0.88"
        />
      </svg>
      {/* Brand Name Text 'enon' */}
      <span
        style={{
          fontSize: h * 0.68,
          fontWeight: 700,
          color: '#18181B',
          letterSpacing: '-0.03em',
          fontFamily: 'var(--font-sans)',
          lineHeight: 1,
          marginLeft: 3
        }}
      >
        enon
      </span>
    </div>
  );
}
