import React from "react";

type BackgroundOverlayProps = {
  children: React.ReactNode;
  intensity?: number; // 0-1 value for opacity
  className?: string;
  minHeight?: string; // Control the minimum height
};

export default function BackgroundOverlay({
  children,
  intensity = 0.5,
  className = "",
  minHeight = "auto", // Default to auto to prevent unnecessary stretching
}: BackgroundOverlayProps) {
  // Ensure intensity is between 0 and 1
  // const safeIntensity = Math.max(0, Math.min(1, intensity));
  return (
    <div className={`relative ${className}`} style={{ minHeight }}>
      {/* Removed black overlay */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
} 