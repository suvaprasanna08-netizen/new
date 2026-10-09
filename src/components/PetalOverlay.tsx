import React from 'react';

interface PetalOverlayProps {
  density?: 'low' | 'medium' | 'high';
}

export const PetalOverlay: React.FC<PetalOverlayProps> = ({ density = 'medium' }) => {
  const count = density === 'high' ? 18 : density === 'medium' ? 12 : 7;

  const petals = Array.from({ length: count }, (_, i) => {
    const left = `${Math.floor((i * 100) / count) + (i % 3) * 2}%`;
    const delay = `${(i * 1.3) % 9}s`;
    const duration = `${11 + (i % 7) * 2}s`;
    const size = 14 + (i % 4) * 6;
    const color = i % 3 === 0 ? '#FBCFE8' : i % 3 === 1 ? '#F472B6' : '#FCE7F3';

    return (
      <div
        key={i}
        className="absolute pointer-events-none select-none z-10"
        style={{
          left,
          top: '-30px',
          animation: `driftPetal ${duration} infinite linear`,
          animationDelay: delay,
        }}
      >
        <svg
          width={size}
          height={size * 1.3}
          viewBox="0 0 24 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            transform: `rotate(${(i * 47) % 360}deg)`,
            opacity: 0.75,
            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.15))',
          }}
        >
          <path
            d="M12 0C18 7 24 16 22 24C20 30 14 32 12 32C10 32 4 30 2 24C0 16 6 7 12 0Z"
            fill={color}
          />
        </svg>
      </div>
    );
  });

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10" aria-hidden="true">
      {petals}
    </div>
  );
};
