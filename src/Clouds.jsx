import { useRef } from "react";
import * as THREE from "three";
import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import cloudsVertexShader from "./shaders/clouds/vertex.glsl";
import cloudsFragmentShader from "./shaders/clouds/fragment.glsl";

export default function Clouds() {
  // const perlinTexture = useTexture("./perlin.png");
  const perlinTexture = useTexture("./noiseTexture.png");
  perlinTexture.wrapS = THREE.RepeatWrapping;
  perlinTexture.wrapT = THREE.RepeatWrapping;

  const cloudsMaterial = useRef();
  useFrame((_state, delta) => {
    cloudsMaterial.current.uniforms.uTime.value += delta;
  });

  return (
    <mesh
      receiveShadow
      rotation-x={-Math.PI * 0.5}
      position-y={-1.1}
      scale={180}
    >
      <planeGeometry args={[1, 1, 128, 128]} />
      <shaderMaterial
        ref={cloudsMaterial}
        vertexShader={cloudsVertexShader}
        fragmentShader={cloudsFragmentShader}
        uniforms={{
          uTime: new THREE.Uniform(0),
          uPerlinTexture: new THREE.Uniform(perlinTexture),
          uBigWavesElevation: new THREE.Uniform(0.2),
          uBigWavesFrequency: new THREE.Uniform(new THREE.Vector2(0.3, 0.1)),
          uBigWavesSpeed: new THREE.Uniform(0.1),
          uSmallWavesSpeed: new THREE.Uniform(0.001),
        }}
        side={THREE.DoubleSide}
        transparent={true}
        depthWrite={false}
      />
    </mesh>
  );
}
