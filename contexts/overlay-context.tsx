"use client"

import React, { createContext, useContext, useState, ReactNode } from "react"

type OverlayContextType = {
  overlayIntensity: number
  setOverlayIntensity: (value: number) => void
}

const OverlayContext = createContext<OverlayContextType | undefined>(undefined)

export function OverlayProvider({ children }: { children: ReactNode }) {
  const [overlayIntensity, setOverlayIntensity] = useState(0.5)

  return (
    <OverlayContext.Provider value={{ overlayIntensity, setOverlayIntensity }}>
      {children}
    </OverlayContext.Provider>
  )
}

export function useOverlay() {
  const context = useContext(OverlayContext)
  if (context === undefined) {
    throw new Error("useOverlay must be used within an OverlayProvider")
  }
  return context
} 