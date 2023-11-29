import React, { useRef, useState, useEffect } from "react";
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
import Selector from "./ui/Selector";

export default function Scene() {
  const groupRef = useRef();
  const [isDragging, setIsDragging] = useState(false);
  const [objects, setObjects] = useState([]);

  const handleModelSelected = (selectedModel) => {
    // Add the selected model as a draggable object to the scene
    setObjects((prevObjects) => [
      ...prevObjects,
      {
        id: prevObjects.length + 1,
        ...selectedModel,
      },
    ]);
  };

  const handleDelete = (id) => {
    setObjects((prevObjects) => prevObjects.filter((obj) => obj.id !== id));
  };

  return (
    <div>
      <div className="absolute top-0 w-screen h-[65vh] shadow-lg">
        <Canvas>
          <color attach="background" args={["#F2F2F2"]} />
          <ambientLight intensity={2} />
          <spotLight
            position={[0, 0, 0]}
            angle={0.15}
            penumbra={1}
            castShadow
          />
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
              {objects.map((obj) => (
                <Draggable
                  key={obj.id}
                  position={obj.position}
                  color={obj.color}
                  dimensions={obj.dimensions}
                  onDelete={() => handleDelete(obj.id)}
                />
              ))}
            </group>
          </Suspense>
        </Canvas>
      </div>
      <Selector onModelSelected={handleModelSelected} />
    </div>
  );
}
