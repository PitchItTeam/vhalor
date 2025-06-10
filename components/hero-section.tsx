"use client"

import { useRef, useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useMobile } from "@/hooks/use-mobile"
import { useSection } from "@/contexts/section-context"
import { Canvas } from "@react-three/fiber"
import { useGLTF, OrbitControls, Environment } from "@react-three/drei"

type Position = [number, number, number]
type Rotation = [number, number, number]

interface DebugPanelProps {
  position: Position
  rotation: Rotation
  scale: number
  onPositionChange: (position: Position) => void
  onRotationChange: (rotation: Rotation) => void
  onScaleChange: (scale: number) => void
}

function DebugPanel({ position, rotation, scale, onPositionChange, onRotationChange, onScaleChange }: DebugPanelProps) {
  return (
    <div className="fixed bottom-4 left-4 bg-black/80 text-white p-4 rounded-lg z-50 font-mono text-sm">
      <h3 className="mb-2 font-bold">Debug Panel</h3>
      
      <div className="space-y-4">
        <div>
          <h4 className="mb-1">Position</h4>
          <div className="space-y-2">
            <div>
              <label className="block text-xs mb-1">X: {position[0].toFixed(2)}</label>
              <input
                type="range"
                min="-5"
                max="5"
                step="0.1"
                value={position[0]}
                onChange={(e) => onPositionChange([parseFloat(e.target.value), position[1], position[2]])}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-xs mb-1">Y: {position[1].toFixed(2)}</label>
              <input
                type="range"
                min="-5"
                max="5"
                step="0.1"
                value={position[1]}
                onChange={(e) => onPositionChange([position[0], parseFloat(e.target.value), position[2]])}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-xs mb-1">Z: {position[2].toFixed(2)}</label>
              <input
                type="range"
                min="-5"
                max="5"
                step="0.1"
                value={position[2]}
                onChange={(e) => onPositionChange([position[0], position[1], parseFloat(e.target.value)])}
                className="w-full"
              />
            </div>
          </div>
        </div>

        <div>
          <h4 className="mb-1">Rotation</h4>
          <div className="space-y-2">
            <div>
              <label className="block text-xs mb-1">X: {rotation[0].toFixed(2)}</label>
              <input
                type="range"
                min="-Math.PI"
                max="Math.PI"
                step="0.1"
                value={rotation[0]}
                onChange={(e) => onRotationChange([parseFloat(e.target.value), rotation[1], rotation[2]])}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-xs mb-1">Y: {rotation[1].toFixed(2)}</label>
              <input
                type="range"
                min="-Math.PI"
                max="Math.PI"
                step="0.1"
                value={rotation[1]}
                onChange={(e) => onRotationChange([rotation[0], parseFloat(e.target.value), rotation[2]])}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-xs mb-1">Z: {rotation[2].toFixed(2)}</label>
              <input
                type="range"
                min="-Math.PI"
                max="Math.PI"
                step="0.1"
                value={rotation[2]}
                onChange={(e) => onRotationChange([rotation[0], rotation[1], parseFloat(e.target.value)])}
                className="w-full"
              />
            </div>
          </div>
        </div>

        <div>
          <h4 className="mb-1">Scale</h4>
          <div>
            <label className="block text-xs mb-1">Scale: {scale.toFixed(2)}</label>
            <input
              type="range"
              min="0.1"
              max="2"
              step="0.1"
              value={scale}
              onChange={(e) => onScaleChange(parseFloat(e.target.value))}
              className="w-full"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

interface AirplaneModelProps {
  position: Position
  rotation: Rotation
  scale: number
}

function AirplaneModel({ position, rotation, scale }: AirplaneModelProps) {
  const { scene } = useGLTF('/model/plane.glb')
  
  return (
    <primitive 
      object={scene} 
      scale={scale}
      position={position}
      rotation={rotation}
    />
  )
}

export default function HeroSection() {
  const isMobile = useMobile()
  const containerRef = useRef<HTMLDivElement>(null)
  const { isLoading } = useSection()
  const audioRef = useRef<HTMLAudioElement | null>(null)
  
  // Facts for the slider
  const facts = [
    {
      intro: "We heard you like to travel",
      heading: "So we invented a travel jacket that saves you up to $100 everytime you fly!"
    }
  ]

  const [currentIndex, setCurrentIndex] = useState(0)
  const [position, setPosition] = useState<Position>([6, -1.6, -2.5])
  const [rotation, setRotation] = useState<Rotation>([6.1, 9.39, 0.2])
  const [scale, setScale] = useState(0.1)
  const [isAnimating, setIsAnimating] = useState(true)
  
  // Animation trigger state
  const [show, setShow] = useState(false)
  
  // Initialize audio
  // useEffect(() => {
  //   audioRef.current = new Audio('/sound22.mp3')
  //   audioRef.current.volume = 0.5 // Set volume to 50%
    
  //   return () => {
  //     if (audioRef.current) {
  //       audioRef.current.pause()
  //       audioRef.current = null
  //     }
  //   }
  // }, [])
  
  // When the main heading is shown, reset Z and start animating
  useEffect(() => {
    if (show) {
      setPosition(([x, y]) => [x, y, -5])
      setIsAnimating(true)
      // Play sound when animation starts
      // if (audioRef.current) {
      //   audioRef.current.currentTime = 0
      //   audioRef.current.play().catch(error => {
      //     console.log('Audio playback failed:', error)
      //   })
      // }
    }
  }, [show])

  useEffect(() => {
    if (!isLoading) {
      // Add extra delay after loading screen is gone
      const timeout = setTimeout(() => setShow(true), 400)
      return () => clearTimeout(timeout)
    } else {
      setShow(false)
    }
  }, [isLoading])

  // Animate X, Y, Z for diagonal fly from right-top to left-bottom
  useEffect(() => {
    if (show && isAnimating) {
      let start: number | null = null
      const duration = 6000 // ms
      const initial = [6, -1.6, -2.5]
      const target = [-9, 1.6, 2]
      const animate = (timestamp: number) => {
        if (start === null) start = timestamp
        const elapsed = timestamp - start
        const t = Math.min(elapsed / duration, 1)
        const newX = initial[0] + (target[0] - initial[0]) * t
        const newY = initial[1] + (target[1] - initial[1]) * t
        const newZ = initial[2] + (target[2] - initial[2]) * t
        setPosition([newX, newY, newZ])
        if (t < 1 && isAnimating) {
          requestAnimationFrame(animate)
        } else {
          setIsAnimating(false)
        }
      }
      requestAnimationFrame(animate)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show, isAnimating])

  // Stop animation if user interacts with debug panel
  const handlePositionChange = (newPos: Position) => {
    setIsAnimating(false)
    setPosition(newPos)
  }

  return (
    <div ref={containerRef} className="w-full flex flex-col items-center justify-start pt-20 md:justify-start relative mb-0">
      <div className="w-full h-full absolute inset-0 -z-10 pointer-events-none">
        <Canvas className="pointer-events-none" camera={{ position: [0, 2, 5], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
          <AirplaneModel position={position} rotation={rotation} scale={scale} />
          <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
          <Environment preset="city" />
        </Canvas>
      </div>

      {/* <DebugPanel 
        position={position}
        rotation={rotation}
        scale={scale}
        onPositionChange={handlePositionChange}
        onRotationChange={setRotation}
        onScaleChange={setScale}
      /> */}

      <div className="z-10 text-center px-4 md:px-0 max-w-5xl lg:max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="hero-intro mb-4"
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: "1.9rem",
            letterSpacing: "0.099em",
            textShadow: "0 2px 8px rgba(0,0,0,0.12)",
            fontWeight: "normal"
          }}
        >
          {facts[currentIndex].intro}
        </motion.div>
        <AnimatePresence mode="wait">
          {show && (
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
              className="w-[80%] mx-auto"
            >
              <motion.h1 className="w-full text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-light leading-tight mb-0 ultra-thin-heading mx-auto max-w-6xl lg:max-w-6xl px-4 sm:px-6 md:px-8"
                style={{
                  fontFamily: "'DM Sans', sans-serif"
                }}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: 'easeOut', delay: 0.3 }}
              >
                {facts[currentIndex].heading}
              </motion.h1>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
