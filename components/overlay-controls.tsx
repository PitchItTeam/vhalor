"use client"

import { useOverlay } from "@/contexts/overlay-context"
import { useState } from "react"

export default function OverlayControls() {
  const { overlayIntensity, setOverlayIntensity } = useOverlay()
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="bg-black text-white p-2 rounded-full shadow-lg hover:bg-gray-800 transition-all"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3"></circle>
          <path d="M12 5v2"></path>
          <path d="M12 17v2"></path>
          <path d="M5 12h2"></path>
          <path d="M17 12h2"></path>
        </svg>
      </button>
      
      {isExpanded && (
        <div className="bg-white p-4 rounded-lg shadow-lg mt-2 w-64">
          <h3 className="font-medium mb-2">Adjust Readability</h3>
          <div className="space-y-2">
            <label htmlFor="overlay-intensity" className="block text-sm font-medium text-gray-700">
              Background Darkness: {Math.round(overlayIntensity * 100)}%
            </label>
            <input
              id="overlay-intensity"
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={overlayIntensity}
              onChange={(e) => setOverlayIntensity(parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>
      )}
    </div>
  )
} 