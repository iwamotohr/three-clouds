import { OrbitControls } from "@react-three/drei";
import Model from "./Model";
import { Suspense } from "react";
import Placeholder from "./Placeholder";
import { Environment } from "@react-three/drei";
import Clouds from "./Clouds";

export default function Experience() {
  return (
    <>
      <OrbitControls
        makeDefault
        enableZoom={false}
        enablePan={false}
        maxPolarAngle={Math.PI * 0.5}
        minPolarAngle={Math.PI * 0.45}
      />

      <fog attach="fog" near={-5} far={25} />

      <Environment
        background
        files="./environmentMaps/belfast_sunset_puresky_2k.hdr"
      />

      <Clouds />

      <Suspense fallback={<Placeholder position-y={-1} scale={[10, 3, 10]} />}>
        <Model />
      </Suspense>
    </>
  );
}
