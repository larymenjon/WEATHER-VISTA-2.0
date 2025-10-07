
import React from 'react';

const Logo = ({ className = 'w-10 h-10' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="sunGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#FFD700' }} />
        <stop offset="100%" style={{ stopColor: '#FFA500' }} />
      </linearGradient>
      <linearGradient id="cloudStrokeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#87CEEB' }} />
        <stop offset="100%" style={{ stopColor: '#22d3ee' }} />
      </linearGradient>
    </defs>
    {/* Outer Circle */}
    <circle cx="50" cy="50" r="48" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
    
    {/* Sun */}
    <circle cx="68" cy="35" r="12" fill="url(#sunGradient)" />

    {/* Cloud */}
    <path d="M 25 70 C 10 70, 10 52, 30 52 C 35 37, 60 37, 65 52 C 85 52, 85 70, 70 70 Z" fill="rgba(15, 23, 42, 0.5)" stroke="url(#cloudStrokeGradient)" strokeWidth="4" />
    
    {/* Lightning */}
    <path d="M 50 64 L 42 76 L 50 76 L 42 88" fill="none" stroke="#FFD700" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    
    {/* Raindrop */}
    <path d="M65 78 a 5 10 0 0 1 -10 0 C 60 73 65 73 65 78Z" fill="#4299E1" />
  </svg>
);

export default Logo;
