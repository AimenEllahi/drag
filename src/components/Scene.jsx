import React, { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, PivotControls } from "@react-three/drei";
import Draggable from "./Draggable";
import * as THREE from "three";
import DragControls from "./DragControls";

export default function Scene() {
  const groupRef = useRef();

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

        <DragControls />
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
            dimensions={[1, 2, 3]}
          />
        </group>
      </Canvas>
    </div>
  );
}
