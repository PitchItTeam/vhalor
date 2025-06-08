// components/hotspot-3d.tsx
"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

interface Hotspot3DProps {
  position: [number, number, number]
  isActive: boolean
  label?: string
}

export default function Hotspot3D({ position, isActive, label }: Hotspot3DProps) {
  const meshRef = useRef<THREE.Group>(null)
  const pulseRef = useRef(0)

  useFrame((state, delta) => {
    if (meshRef.current) {
      // Make hotspot face camera
      meshRef.current.lookAt(state.camera.position)
      
      // Pulse animation when active
      if (isActive) {
        pulseRef.current += delta * 3
        const scale = 1 + Math.sin(pulseRef.current) * 0.1
        meshRef.current.scale.setScalar(scale)
      } else {
        meshRef.current.scale.setScalar(1)
        pulseRef.current = 0
      }
    }
  })

  return (
    <group ref={meshRef} position={position}>
      {/* Outer ring */}
      <mesh>
        <ringGeometry args={[0.08, 0.1, 32]} />
        <meshBasicMaterial 
          color={isActive ? "#3b82f6" : "#000000"} 
          opacity={isActive ? 0.9 : 0.7}
          transparent
        />
      </mesh>
      
      {/* Inner circle */}
      <mesh position={[0, 0, 0.001]}>
        <circleGeometry args={[0.07, 32]} />
        <meshBasicMaterial 
          color={isActive ? "#60a5fa" : "#ffffff"}
          opacity={0.9}
          transparent
        />
      </mesh>
      
      {/* Center dot */}
      <mesh position={[0, 0, 0.002]}>
        <circleGeometry args={[0.03, 32]} />
        <meshBasicMaterial 
          color={isActive ? "#ffffff" : "#3b82f6"}
        />
      </mesh>
    </group>
  )
}