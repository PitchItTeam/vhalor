// components/product-features.tsx
"use client"

import { useState, useRef, useEffect } from "react"
import { Canvas, useFrame, useThree, useLoader } from "@react-three/fiber"
import { Environment, OrbitControls, useGLTF } from "@react-three/drei"
import { motion, useInView } from "framer-motion"
import ProductModel from "@/components/product-model"
import InfoPanel from "@/components/info-panel"
import { useMobile } from "@/hooks/use-mobile"
import * as THREE from "three"

const features = [
  {
    id: 1,
    title: "Lightweight Durability & Waterproof",
    description:
      "Made from premium waterproof Nylon and sown together with heavy duty thread used for bags.",
    hotspotPosition: [0.3, 0, 0.5] as [number, number, number],
    cameraPosition: [-1.4, 0.9, 1.5] as [number, number, number],
    cameraTarget: [0, 0.3, 0] as [number, number, number],
  },
  {
    id: 2,
    title: "Internal Storage",
    description:
      "Pack up to 22 lbs of clothes in the vacuum bags and put inside the internal pocket.",
    hotspotPosition: [0, 0.3, 0] as [number, number, number],
    cameraPosition: [0, 0.3, 2.0] as [number, number, number],
    cameraTarget: [0, 0.3, 0] as [number, number, number],
  },
  {
    id: 3,
    title: "Convertible to Bag",
    description:
      "Easily convert the jacket into a bag should you not want to wear it before or after boarding gate.",
    hotspotPosition: [-0.6, 1.3, 0.3] as [number, number, number],
    cameraPosition: [1.4, 1.4, 1.5] as [number, number, number],
    cameraTarget: [0, 0.3, 0] as [number, number, number],
  },
  {
    id: 4,
    title: "Return on Investment",
    description:
      "The jacket acts as your golden ticket to a lifetime of free carry-on pays for itself by the time you go on your second trip.",
      hotspotPosition: [-0.3, 1.5, 0.3] as [number, number, number],
      cameraPosition: [0.5, 1.6, 1.5] as [number, number, number],
      cameraTarget: [0, 0.5, 0] as [number, number, number],
  },
]

type CameraControllerProps = {
  position: [number, number, number]
  target: [number, number, number]
  onAnimationComplete?: () => void
}

function CameraController({ position, target, onAnimationComplete }: CameraControllerProps) {
  const { camera } = useThree()
  const targetVector = useRef(new THREE.Vector3(...target))
  const startPosition = useRef(camera.position.clone())
  const startTarget = useRef(targetVector.current.clone())
  const progress = useRef(0)
  const isAnimating = useRef(true)
  
  useEffect(() => {
    // Reset animation when position/target changes
    startPosition.current = camera.position.clone()
    startTarget.current = targetVector.current.clone()
    progress.current = 0
    isAnimating.current = true
  }, [position, target])
  
  useFrame((state, delta) => {
    if (isAnimating.current) {
      // Use easing for smooth animation
      progress.current += delta * 1.5 // Adjust speed as needed
      const easedProgress = 1 - Math.pow(1 - Math.min(progress.current, 1), 3) // Cubic ease-out
      
      // Interpolate camera position
      const endPosition = new THREE.Vector3(...position)
      camera.position.lerpVectors(startPosition.current, endPosition, easedProgress)
      
      // Interpolate look-at target
      const endTarget = new THREE.Vector3(...target)
      targetVector.current.lerpVectors(startTarget.current, endTarget, easedProgress)
      camera.lookAt(targetVector.current)
      
      // Check if animation is complete
      if (progress.current >= 1) {
        isAnimating.current = false
        // Set final position and target
        camera.position.copy(endPosition)
        targetVector.current.copy(endTarget)
        camera.lookAt(targetVector.current)
        if (onAnimationComplete) {
          onAnimationComplete()
        }
      }
    } else {
      // Maintain target even after animation
      camera.lookAt(targetVector.current)
    }
  })
  
  return null
}

function RotatingBucks({ model }: { model: any }) {
  const meshRef = useRef<THREE.Group>(null)
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 1.5 // Adjust rotation speed here
    }
  })
  
  return (
    <primitive 
      ref={meshRef}
      object={model.scene} 
      scale={1.4} 
      position={[0.07, 1.3, 0.17]} 
      rotation={[0, 1, 0]}
    />
  )
}

function Scene({ activeFeature, onAnimationComplete }: { activeFeature: number, onAnimationComplete: () => void }) {
  const feature = features[activeFeature]
  const model = useGLTF("/stage.glb")
  const bucksModel = useGLTF("/bucks.glb")
  const [bakedMap] = useLoader(THREE.TextureLoader, ["/stage_baked.jpg"])
  const { camera, gl } = useThree()
  
  useEffect(() => {
    bakedMap.flipY = false
    model.scene.traverse((item) => {
      if ((item as THREE.Mesh).isMesh) {
        const mesh = item as THREE.Mesh
        if (mesh.name === "Emissive") {
          mesh.material = new THREE.MeshBasicMaterial()
        } else {
          mesh.material = new THREE.MeshBasicMaterial({ map: bakedMap })
        }
      }
    })
  }, [bakedMap, model.scene])

  // Reset camera position when switching to orbit mode
  useEffect(() => {
    gl.domElement.style.pointerEvents = 'none'
  }, [activeFeature, camera, gl])
  
  return (
    <>
      {activeFeature !== 4 && (
        <CameraController 
          position={feature.cameraPosition} 
          target={feature.cameraTarget}
          onAnimationComplete={onAnimationComplete}
        />
      )}
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
      <Environment files="/potsdamer_platz_1k.hdr" background />
      <OrbitControls 
        enableZoom={false}
        enablePan={false}
        enableRotate={false}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI * 3/4}
        rotateSpeed={0.5}
        target={[0, 0.3, 0]}
        makeDefault={false}
        domElement={gl.domElement}
      />
      
      {/* Stage Model */}
      <primitive object={model.scene} scale={0.17} position={[0, -0.2, 0]} />
      
      {/* Product Model */}
      <ProductModel
        position={[0, 0.5, 0]}
        scale={1.2}
        rotation={[0, 0, 0]}
      />
      
      {/* Bucks Model - Only show for ROI feature */}
      {activeFeature === 3 && (
        <RotatingBucks model={bucksModel} />
      )}
    </>
  )
}

export default function ProductFeatures() {
  const [activeFeature, setActiveFeature] = useState(0)
  const [isInfoPanelOpen, setIsInfoPanelOpen] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [showSwipeHint, setShowSwipeHint] = useState(false)
  const [hasSwiped, setHasSwiped] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const isMobile = useMobile()
  const lastTouchX = useRef(0)
  const isInView = useInView(sectionRef, { once: false, amount: 0.5 })

  // Show swipe hint when section is in view and user hasn't swiped
  useEffect(() => {
    if (isMobile && isInView && !hasSwiped) {
      setShowSwipeHint(true)
    } else {
      setShowSwipeHint(false)
    }
  }, [isMobile, isInView, hasSwiped])

  // Handle touch events for mobile swipe
  useEffect(() => {
    let touchStartX = 0
    let touchStartY = 0
    let touchEndX = 0
    let touchEndY = 0

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX
      touchStartY = e.touches[0].clientY
    }

    const handleTouchEnd = (e: TouchEvent) => {
      touchEndX = e.changedTouches[0].clientX
      touchEndY = e.changedTouches[0].clientY
      
      const diffX = touchStartX - touchEndX
      const diffY = touchStartY - touchEndY
      
      // Only handle horizontal swipes if they're more horizontal than vertical
      if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
        e.preventDefault() // Only prevent default for horizontal swipes
        setHasSwiped(true)
        setShowSwipeHint(false)
        if (diffX > 0 && activeFeature < features.length - 1) {
          // Swipe left
          setActiveFeature(prev => prev + 1)
          setIsInfoPanelOpen(true)
        } else if (diffX < 0 && activeFeature > 0) {
          // Swipe right
          setIsInfoPanelOpen(false)
          setActiveFeature(prev => prev - 1)
        }
      }
    }

    const section = sectionRef.current
    if (section) {
      section.addEventListener('touchstart', handleTouchStart, { passive: true })
      section.addEventListener('touchend', handleTouchEnd, { passive: false })
      return () => {
        section.removeEventListener('touchstart', handleTouchStart)
        section.removeEventListener('touchend', handleTouchEnd)
      }
    }
  }, [activeFeature])

  // Handle animation complete
  const handleAnimationComplete = () => {
    setIsAnimating(false)
  }

  // Auto-open info panel when feature changes (except on first load)
  useEffect(() => {
    if (activeFeature > 0 && !isInfoPanelOpen) {
      setIsInfoPanelOpen(true)
    }
  }, [activeFeature])

  const handlePrevFeature = () => {
    if (activeFeature > 0) {
      setActiveFeature(prev => prev - 1)
      setIsInfoPanelOpen(false)
    }
  }

  const handleNextFeature = () => {
    if (activeFeature < features.length - 1) {
      setActiveFeature(prev => prev + 1)
      setIsInfoPanelOpen(true)
    }
  }

  return (
    <>
      <style>{`
        html, body, #__next {
          height: 100%;
          margin: 0;
          padding: 0;
          background: transparent !important;
        }
      `}</style>
      <div
        ref={sectionRef}
        style={{
          width: '100vw',
          height: '85vh',
          position: 'relative',
          overflow: 'visible',
          margin: 0,
          padding: 0,
          background: 'transparent',
          touchAction: 'pan-y', // Allow vertical scrolling
          borderRadius: '2rem',
        }}
        className="md:h-screen"
      >
        <div ref={containerRef} className="w-full h-full">
          <div 
            style={{ 
              position: 'absolute', 
              top: 0, 
              left: 0, 
              width: '100vw', 
              height: 'calc(100% - 1rem)',
              margin: '0.5rem 0',
              zIndex: 1,
              pointerEvents: 'auto',
              borderRadius: '2rem',
              overflow: 'hidden',
            }}
          >
            <Canvas camera={{ position: features[activeFeature].cameraPosition, fov: 50 }}>
              <Scene activeFeature={activeFeature} onAnimationComplete={handleAnimationComplete} />
            </Canvas>

            {/* Navigation Arrows - Only show on desktop */}
            {!isMobile && (
              <>
                <div className="absolute inset-y-0 left-0 flex items-center z-20">
                  <button
                    onClick={handlePrevFeature}
                    disabled={activeFeature === 0}
                    className={`p-2 rounded-full bg-black/30 text-white hover:bg-black/50 transition-all ${
                      activeFeature === 0 ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    style={{ marginLeft: '1rem' }}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M15 18l-6-6 6-6" />
                    </svg>
                  </button>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center z-20">
                  <button
                    onClick={handleNextFeature}
                    disabled={activeFeature === features.length - 1}
                    className={`p-2 rounded-full bg-black/30 text-white hover:bg-black/50 transition-all ${
                      activeFeature === features.length - 1 ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    style={{ marginRight: '1rem' }}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </button>
                </div>
              </>
            )}

            {/* Info Panel */}
            {activeFeature < 4 ? (
              <div
                className="info-panel-wrapper"
                style={{ 
                  position: 'absolute', 
                  bottom: 0, 
                  left: 0, 
                  right: 0, 
                  zIndex: 10,
                  padding: '1rem',
                  background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
                }}
              >
                <InfoPanel
                  isOpen={true}
                  title={features[activeFeature].title}
                  description={features[activeFeature].description}
                  onClose={() => setIsInfoPanelOpen(false)}
                />
              </div>
            ) : null}

            {/* Feature indicators */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20">
              <div className="flex items-center space-x-2">
                {features.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setActiveFeature(index)
                      if (index > 0) {
                        setIsInfoPanelOpen(true)
                      } else {
                        setIsInfoPanelOpen(false)
                      }
                    }}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      activeFeature === index ? "bg-white w-8" : "bg-gray-400 w-2"
                    }`}
                    aria-label={`Go to feature ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Swipe Hint */}
          {isMobile && showSwipeHint && (
            <motion.div 
              className="absolute top-4 right-4 z-30"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3 }}
              style={{ pointerEvents: 'none', background: 'transparent' }}
            >
              <motion.span
                className="text-xs font-semibold text-gray-800 dark:text-gray-200 rounded px-2 py-1 shadow-none"
                initial={{ scale: 1 }}
                animate={{ scale: [1, 1.12, 1] }}
                transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
                style={{ display: 'inline-block', background: 'transparent' }}
              >
                Swipe left<span className="ml-1">&gt;&gt;</span>
              </motion.span>
            </motion.div>
          )}
        </div>
      </div>
    </>
  )
}
