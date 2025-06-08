import { Canvas } from "@react-three/fiber";
import Settings from "./ProductStageSettings";
import ProductStageScene from "./ProductStageScene";
import { useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";

function AnimatedCamera({ target }: { target: [number, number, number] }) {
  const { camera } = useThree();
  const targetRef = useRef(target);

  useEffect(() => {
    targetRef.current = target;
  }, [target]);

  useFrame(() => {
    camera.position.lerp(
      { x: targetRef.current[0], y: targetRef.current[1], z: targetRef.current[2] },
      0.1
    );
    camera.lookAt(0, 1.05, 0);
    camera.updateProjectionMatrix();
  });

  return null;
}

const ProductStage = ({ cameraTarget = [0, 3, 10] }: { cameraTarget?: [number, number, number] }) => {
  return (
    <div className="product-stage" style={{ position: 'fixed', top: 0, left: 0, width: '800px', height: '100vh', minHeight: 400, zIndex: 0, margin: '0 auto' }}>
      <Canvas camera={{ position: cameraTarget as [number, number, number], fov: 35 }} shadows>
        <AnimatedCamera target={cameraTarget} />
        <Settings />
        <ProductStageScene />
      </Canvas>
    </div>
  );
};

export default ProductStage; 