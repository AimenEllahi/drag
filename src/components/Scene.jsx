import React, { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import {
  Environment,
  OrbitControls,
  GizmoHelper,
  GizmoViewport,
} from "@react-three/drei";
import Draggable from "./Draggable";
import DragControls from "./DragControls";
import { Suspense } from "react";
import Loader from "./Loader";

export default function Scene() {
  const groupRef = useRef();
  const [isDragging, setIsDragging] = React.useState(false);

  return (
    <div className="w-screen h-screen border border-black">
      <Canvas>
        <color attach="background" args={["#F2F2F2"]} />
        <ambientLight intensity={2} />
        <spotLight position={[0, 0, 0]} angle={0.15} penumbra={1} castShadow />
        <pointLight position={[-10, -10, -10]} />
        <directionalLight
          position={[5, 5, 5]}
          intensity={1}
          castShadow
          shadow-mapSize={{ width: 1024, height: 1024 }}
          shadow-bias={-0.001}
        />
        <Environment preset="sunset" />
        <GizmoHelper alignment="bottom-right" margin={[100, 100]}>
          <GizmoViewport labelColor="white" axisHeadScale={1} />
        </GizmoHelper>
        <OrbitControls enabled={!isDragging} />
        <DragControls setIsDragging={setIsDragging} />
        <Suspense fallback={<Loader />}>
          <group ref={groupRef}>
            <Draggable
              position={[0, 0, 0]}
              color="#B2C8BA"
              dimensions={[1, 2, 2]}
            />
            <Draggable
              position={[2, 0, 0]}
              color="green"
              dimensions={[2, 2, 1]}
            />
            <Draggable
              position={[-4, 0, 0]}
              color="#B2C000"
              dimensions={[2, 1, 3]}
            />
          </group>
        </Suspense>
      </Canvas>
    </div>
  );
}
