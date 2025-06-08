// components/info-panel.tsx
"use client"

import { useEffect, useRef } from "react"
import { X } from "lucide-react"

interface InfoPanelProps {
  isOpen: boolean
  title: string
  description: string
  onClose: () => void
}

export default function InfoPanel({ isOpen, title, description, onClose }: InfoPanelProps) {
  if (!isOpen) return null;

  return (
    <div
      className="info-panel"
      style={{
        position: 'absolute',
        left: '50%',
        bottom: '2.5rem', // above the feature dots
        transform: 'translateX(-50%)',
        zIndex: 20,
        maxWidth: '90vw',
        width: '340px',
        // background: 'rgba(255,255,255,0.85)',
        // backdropFilter: 'blur(8px)',
        borderRadius: '1.25rem',
        // boxShadow: '0 4px 24px rgba(0,0,0,0.10)',
        padding: '1.25rem 1.5rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <h2 className="text-2xl font-bold text-black mb-2 mt-1 text-center" style={{color:'#2d174d'}}>{title}</h2>
      <p className="text-base text-black leading-relaxed text-center">
        {description}
      </p>
    </div>
  )
}