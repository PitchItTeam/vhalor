"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useSection } from "@/contexts/section-context"
import ModelLoader from "./model-loader"

// Use the same facts as in hero-section
const facts = [
  // {
  //   intro: "We heard you like to travel",
  //   heading: "So we invented a travel jacket that saves you up to $100 everytime you fly!"
  // },
  {
    intro: "Did you know?",
    heading: "Some airlines charge up to $65 for a carry-on bag that doesn't fit under the seat"
  },
  {
    intro: "Travel smart",
    heading: "Our jacket has 10+ hidden pockets designed to carry all your essentials"
  },
  {
    intro: "No more baggage fees",
    heading: "Save money on every flight by keeping your valuables with you, not in checked luggage"
  }
]

export default function LoadingScreen() {
  const { isLoading, setIsLoading } = useSection()
  const [factIndex, setFactIndex] = useState(0)
  const [modelsReady, setModelsReady] = useState(false)
  
  useEffect(() => {
    // Check if document and window objects are available (browser environment)
    if (typeof window !== 'undefined') {
      // Start fact rotation interval
      const factInterval = setInterval(() => {
        setFactIndex(prev => (prev + 1) % facts.length)
      }, 3500)

      // Check for 3D models loading status
      const checkModelsInterval = setInterval(() => {
        if (window.MODELS_LOADED) {
          setModelsReady(true)
          clearInterval(checkModelsInterval)
        }
      }, 100)

      // Check when page is fully loaded
      const handleLoad = () => {
        // Wait for both page load and models to be ready before hiding loading screen
        const checkComplete = () => {
          if (modelsReady) {
            // Add a slight delay for smoother transition
            setTimeout(() => setIsLoading(false), 1000)
          } else {
            // Check again in a moment
            setTimeout(checkComplete, 100)
          }
        }
        
        checkComplete()
      }

      // Listen for window load event
      if (document.readyState === 'complete') {
        handleLoad()
      } else {
        window.addEventListener('load', handleLoad)
      }

      // Clean up
      return () => {
        clearInterval(factInterval)
        clearInterval(checkModelsInterval)
        window.removeEventListener('load', handleLoad)
      }
    }
  }, [setIsLoading, modelsReady])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#e6e6e6]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Invisible component that handles model preloading */}
          <ModelLoader />
          
          <motion.div 
            className="relative"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          >
            <svg width="80" height="80" viewBox="0 0 100 100">
              <path
                d="M50 15 L85 85 L15 85 Z"
                fill="transparent"
                stroke="#222"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>
          
          <motion.div
            className="mt-8 text-center px-4 max-w-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-xl font-bold mb-2">Loading VHALÓR Experience</p>
            <AnimatePresence mode="wait">
              <motion.div
                key={factIndex}
                className="text-sm"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
              >
                <p className="font-medium mb-1" style={{ color: '#444' }}>
                  {facts[factIndex].intro}
                </p>
                <p className="opacity-90" style={{ color: '#444' }}>
                  {facts[factIndex].heading}
                </p>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 