"use client"

import { createContext, useContext, useState, ReactNode } from 'react'

type SectionContextType = {
  currentSection: string;
  setCurrentSection: (section: string) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const SectionContext = createContext<SectionContextType | undefined>(undefined)

export function SectionProvider({ children }: { children: ReactNode }) {
  const [currentSection, setCurrentSection] = useState('hero')
  const [isLoading, setIsLoading] = useState(true)

  return (
    <SectionContext.Provider value={{ currentSection, setCurrentSection, isLoading, setIsLoading }}>
      {children}
    </SectionContext.Provider>
  )
}

export function useSection() {
  const context = useContext(SectionContext)
  if (context === undefined) {
    throw new Error('useSection must be used within a SectionProvider')
  }
  return context
} 