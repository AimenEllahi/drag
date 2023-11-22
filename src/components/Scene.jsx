import React, { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import Draggable from "./Draggable";
import * as THREE from "three";
import DragControls from "./DragControls";

export default function Scene() {
  const groupRef = useRef();

  return (
    <div className='w-screen h-screen border border-black'>
      <Canvas>
        <ambientLight intensity={2} />
        <spotLight position={[0, 0, 0]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        <directionalLight position={[0, 10, 0]} intensity={3} />
        <Environment preset='apartment' />
        <DragControls />
        <group ref={groupRef}>
          <Draggable
            position={[0, 2, 0]}
            onDrag={handleDrag}
            onDrop={handleDrop}
            color='#B2C8BA'
            args={[1, 1, 2]}
          />
          <Draggable
            position={[2, 2, 0]}
            onDrag={handleDrag}
            onDrop={handleDrop}
            color='green'
            args={[1, 1, 2]}
          />
          <Draggable
            position={[-4, 2, 0]}
            onDrag={handleDrag}
            onDrop={handleDrop}
            color='green'
            args={[1, 1, 2]}
          />
        </group>
      </Canvas>
    </div>
  );
}
