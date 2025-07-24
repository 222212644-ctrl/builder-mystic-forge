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
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/3/38/Logo_Kota_Samarinda.png"
        alt="Logo Kota Samarinda"
        width={size}
        height={size}
        className="object-contain"
        style={{ maxWidth: size, maxHeight: size }}
      />
    </div>
  );
}

export default SamarindaLogo;
