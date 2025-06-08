import { useGLTF } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { useEffect } from "react";
import { MeshBasicMaterial, TextureLoader, Mesh } from "three";
import ProductModel from "./product-model";

const ProductStageScene = () => {
  const model = useGLTF("/stage.glb");
  const [bakedMap] = useLoader(TextureLoader, ["/stage_baked.jpg"]);

  useEffect(() => {
    bakedMap.flipY = false;
    model.scene.traverse((item) => {
      if ((item as Mesh).isMesh) {
        const mesh = item as Mesh;
        if (mesh.name === "Emissive") {
          mesh.material = new MeshBasicMaterial();
        } else {
          mesh.material = new MeshBasicMaterial({ map: bakedMap });
        }
      }
    });
  }, [bakedMap, model.scene]);

  return (
    <>
      <primitive object={model.scene} />
      {/* Centered hoodie model on the stage */}
      <ProductModel position={[0, 1.05, 0]} scale={1.2} rotation={[0, Math.PI, 0]} />
      {/* Optional: add a subtle shadow-catching plane if needed */}
      <hemisphereLight args={[0xffffff, 0x000000, 0.5]} />
      <directionalLight position={[5, 10, 7]} intensity={0.7} castShadow />
      <ambientLight intensity={0.8} />
    </>
  );
};

export default ProductStageScene; 