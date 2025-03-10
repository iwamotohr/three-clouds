import { useGLTF } from "@react-three/drei";

export default function Model() {
  const model = useGLTF("./mountain.glb");

  return (
    <primitive object={model.scene} receiveShadow position-y={-1} scale={5} />
  );
}

useGLTF.preload("./mountain.glb");
