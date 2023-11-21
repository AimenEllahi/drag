import React, { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import Draggable from "./Draggable";
import * as THREE from "three";

export default function Scene() {
  const groupRef = useRef();

  const handleDrag = (event, meshRef) => {
    const { x, y, z } = event.object.position;
    meshRef.current.position.set(x, y, z);
  };

  const handleDrop = (event, meshRef) => {
    const { x, y, z } = event.object.position;
    meshRef.current.position.set(x, y, z);

    // Find the closest object
    if (groupRef.current) {
      const objects = groupRef.current.children;
      let closestDistance = Infinity;
      let closestObject = null;

      for (let i = 0; i < objects.length; i++) {
        if (objects[i] !== meshRef.current) {
          const distance = meshRef.current.position.distanceTo(
            objects[i].position
          );
          if (distance < closestDistance) {
            closestDistance = distance;
            closestObject = objects[i];
          }
          console.log(
            `Distance between object ${i + 1} and dropped object: ${distance}`
          );
        }
      }

      // Snap the dropped object to the closest position
      if (closestObject && closestDistance < 5) {
        const offset = new THREE.Vector3(1, 0, 0);
        meshRef.current.position.set(
          closestObject.position.x + offset.x,
          closestObject.position.y + offset.y,
          closestObject.position.z + offset.z
        );
      }
    }
  };

  return (
    <div className="w-screen h-screen border border-black">
      <Canvas>
        <ambientLight intensity={2} />
        <spotLight position={[0, 0, 0]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        <directionalLight position={[0, 10, 0]} intensity={3} />
        <Environment preset="apartment" />
        <group ref={groupRef}>
          <Draggable
            position={[0, 2, 0]}
            onDrag={handleDrag}
            onDrop={handleDrop}
            color="#B2C8BA"
            args={[1, 1, 2]}
          />
          <Draggable
            position={[2, 2, 0]}
            onDrag={handleDrag}
            onDrop={handleDrop}
            color="green"
            args={[1, 1, 2]}
          />
          <Draggable
            position={[-4, 2, 0]}
            onDrag={handleDrag}
            onDrop={handleDrop}
            color="green"
            args={[1, 1, 2]}
          />
        </group>
      </Canvas>
    </div>
  );
}
