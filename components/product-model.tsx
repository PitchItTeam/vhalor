"use client"

import { useRef, useMemo } from "react"
import { useGLTF } from "@react-three/drei"
import type * as THREE from "three"

interface ProductModelProps {
  position?: [number, number, number]
  scale?: number
  rotation?: [number, number, number]
}

const MODEL_URL = '/model/HoodieModel4.glb';

// Preload model outside the component
useGLTF.preload(MODEL_URL)

export default function ProductModel({ position = [0, 0, 0], scale = 1, rotation = [0, 0, 0] }: ProductModelProps) {
  const meshRef = useRef<THREE.Group>(null)
  const gltf = useGLTF(MODEL_URL)
  const scene = useMemo(() => gltf.scene?.clone?.() ?? null, [gltf.scene])

  if (!scene) {
    // Fallback shape
    return (
      <group position={position} scale={scale} rotation={rotation}>
        <mesh>
          <boxGeometry args={[1, 1.5, 0.2]} />
          <meshStandardMaterial color="#3366cc" />
        </mesh>
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.5, 16, 16, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
          <meshStandardMaterial color="#3366cc" />
        </mesh>
      </group>
    )
  }

  return (
    <primitive 
      ref={meshRef} 
      object={scene} 
      position={position} 
      scale={scale} 
      rotation={rotation} 
    />
  )
}
