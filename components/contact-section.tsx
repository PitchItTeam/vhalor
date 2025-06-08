"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import BackgroundOverlay from "./background-overlay"
import { useOverlay } from "@/contexts/overlay-context"
import { useMobile } from "@/hooks/use-mobile"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment } from "@react-three/drei"
import ProductModel from "./product-model"

export default function ContactSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.3 })
  const { overlayIntensity } = useOverlay()
  const isMobile = useMobile()

  return (
    <div className="w-full min-h-[95vh] flex flex-col md:flex-row">
      {/* Left Side - Dark */}
      <div className="flex-1 basis-1/2 flex flex-col justify-center items-center bg-black text-white p-6 sm:p-8 md:p-16 relative">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col justify-center items-center h-full text-white text-center"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl mb-4 md:mb-6 tracking-wider text-white font-['Outfit']">
            VHALÓR
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-8 md:mb-12 font-light max-w-md text-gray-200">
            Travel smart. Travel Light. Travel with Vhalór.
          </p>
          
          <div className="mt-auto">
            <div className="text-base md:text-lg mb-4 font-medium text-white">Follow us</div>
            <div className="flex gap-4 md:gap-6">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:opacity-70 transition-opacity">
                <svg width={isMobile ? "24" : "32"} height={isMobile ? "24" : "32"} fill="none" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="12" fill="#fff"/>
                  <path d="M15.36 8.26h-1.22V7.5c0-.29.19-.36.32-.36h.87V5.5h-1.18c-1.31 0-1.61.98-1.61 1.6v1.16H11v1.76h1.14V18h2.01v-7.98h1.35l.2-1.76z" fill="#222"/>
                </svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:opacity-70 transition-opacity">
                <svg width={isMobile ? "24" : "32"} height={isMobile ? "24" : "32"} fill="none" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="12" fill="#fff"/>
                  <path d="M12 8.4A3.6 3.6 0 1 0 12 15.6 3.6 3.6 0 0 0 12 8.4zm0 5.9a2.3 2.3 0 1 1 0-4.6 2.3 2.3 0 0 1 0 4.6zm4.5-6.1a.9.9 0 1 1-1.8 0 .9.9 0 0 1 1.8 0zM17.6 8.1c-.1-.7-.4-1.3-.9-1.8-.5-.5-1.1-.8-1.8-.9-.7-.1-2.7-.1-3.4 0-.7.1-1.3.4-1.8.9-.5.5-.8 1.1-.9 1.8-.1.7-.1 2.7 0 3.4.1.7.4 1.3.9 1.8.5.5 1.1.8 1.8.9.7.1 2.7.1 3.4 0 .7-.1 1.3-.4 1.8-.9.5-.5.8-1.1.9-1.8.1-.7.1-2.7 0-3.4zm-1.1 4.1a2.6 2.6 0 0 1-1.5 1.5c-.4.2-1.3.2-2.1.2s-1.7 0-2.1-.2a2.6 2.6 0 0 1-1.5-1.5c-.2-.4-.2-1.3-.2-2.1s0-1.7.2-2.1a2.6 2.6 0 0 1 1.5-1.5c.4-.2 1.3-.2 2.1-.2s1.7 0 2.1.2a2.6 2.6 0 0 1 1.5 1.5c.2.4.2 1.3.2 2.1s0 1.7-.2 2.1z" fill="#222"/>
                </svg>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="hover:opacity-70 transition-opacity">
                <svg width={isMobile ? "24" : "32"} height={isMobile ? "24" : "32"} fill="none" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="12" fill="#fff"/>
                  <path d="M16.23 9.3c-.13-.5-.52-.9-1.02-1.03C14.36 8 12 8 12 8s-2.36 0-3.21.27c-.5.13-.89.53-1.02 1.03C7.5 10.15 7.5 12 7.5 12s0 1.85.27 2.7c.13.5.52.9 1.02 1.03C9.64 16 12 16 12 16s2.36 0 3.21-.27c.5-.13.89-.53 1.02-1.03.27-.85.27-2.7.27-2.7s0-1.85-.27-2.7zM10.75 14.02V9.98l4.02 2.02-4.02 2.02z" fill="#222"/>
                </svg>
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Right Side - Light */}
      <div className="flex-1 basis-1/2 flex flex-col justify-center items-start bg-black text-black p-6 sm:p-8 md:p-16">
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full max-w-md aspect-square mx-auto"
        >
          <Canvas camera={{ position: [0, 0, 2], fov: 50 }} style={{ background: '#fff' }}>
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
            <pointLight position={[-10, -10, -10]} />
            <ProductModel position={[0, 0, 0]} scale={1.2} rotation={[0, 0, 0]} />
            <OrbitControls 
              enablePan={false}
              minPolarAngle={Math.PI / 4}
              maxPolarAngle={Math.PI * 3/4}
              rotateSpeed={0.5}
            />
            <Environment preset="city" />
          </Canvas>
        </motion.div>
      </div>
    </div>
  )
}