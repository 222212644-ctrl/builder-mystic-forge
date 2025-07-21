import React from "react";

interface SamarindaLogoProps {
  className?: string;
  size?: number;
}

export function SamarindaLogo({
  className = "",
  size = 40,
}: SamarindaLogoProps) {
  return (
    <div
      className={`flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Samarinda City Logo - Simplified version based on official design */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Logo Kota Samarinda"
      >
        {/* Outer circle - represents unity */}
        <circle
          cx="50"
          cy="50"
          r="48"
          fill="#1E40AF"
          stroke="#FFD700"
          strokeWidth="2"
        />

        {/* Inner shield shape */}
        <path
          d="M25 35C25 30 28 25 35 25H65C72 25 75 30 75 35V55C75 65 65 75 50 78C35 75 25 65 25 55V35Z"
          fill="#DC2626"
          stroke="#FFD700"
          strokeWidth="1.5"
        />

        {/* Central emblem - simplified Dayak motif */}
        <path d="M50 30L45 40L50 50L55 40L50 30Z" fill="#FFD700" />

        {/* Traditional pattern lines */}
        <line
          x1="35"
          y1="45"
          x2="40"
          y2="45"
          stroke="#FFD700"
          strokeWidth="2"
        />
        <line
          x1="60"
          y1="45"
          x2="65"
          y2="45"
          stroke="#FFD700"
          strokeWidth="2"
        />
        <line
          x1="35"
          y1="55"
          x2="40"
          y2="55"
          stroke="#FFD700"
          strokeWidth="2"
        />
        <line
          x1="60"
          y1="55"
          x2="65"
          y2="55"
          stroke="#FFD700"
          strokeWidth="2"
        />

        {/* River representation (Mahakam River) */}
        <path
          d="M30 60Q40 65 50 60Q60 55 70 60"
          stroke="#87CEEB"
          strokeWidth="3"
          fill="none"
        />

        {/* Stars representing guidance */}
        <polygon
          points="42,35 43,38 46,38 44,40 45,43 42,41 39,43 40,40 38,38 41,38"
          fill="#FFD700"
        />
        <polygon
          points="58,35 59,38 62,38 60,40 61,43 58,41 55,43 56,40 54,38 57,38"
          fill="#FFD700"
        />
      </svg>
    </div>
  );
}

export default SamarindaLogo;
