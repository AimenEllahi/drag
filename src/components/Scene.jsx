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
import { modelList } from "./constants/index";
import InstantiateObject from "./InstantiateObject";

export default function Scene() {
  const groupRef = useRef();
  const [isDragging, setIsDragging] = useState(false);
  const [selectedModel, setSelectedModel] = useState(modelList[0]);
  const [isAddObjectMode, setIsAddObjectMode] = useState(false);
  const [objects, setObjects] = useState([]);
  const [mouse, setMouse] = useState({ x: 0, y: 0, z: 0 });

  const handleAddObject = (position) => {
    // Add the selected model as a draggable object to the scene
    setObjects((prevObjects) => [
      ...prevObjects,
      {
        ...selectedModel,
        id: prevObjects.length + 1,
        position: position,
      },
    ]);
  };

  const handleDelete = (id) => {
    setObjects((prevObjects) => prevObjects.filter((obj) => obj.id !== id));
  };

  const handleClick = (event) => {
    if (isAddObjectMode) {
      setIsAddObjectMode(false);
      handleAddObject(mouse);
    }
  };

  return (
    <div>
      <div
        onClick={handleClick}
        className='absolute top-0 w-screen h-[80vh] shadow-lg'
      >
        <Canvas>
          <color attach='background' args={["#F2F2F2"]} />
          <ambientLight intensity={2} />
          <spotLight
            position={[0, 0, 0]}
            angle={0.15}
            penumbra={1}
            castShadow
          />
          <InstantiateObject
            setIsAddObjectMode={setIsAddObjectMode}
            handleAddObject={handleAddObject}
            isAddObjectMode={isAddObjectMode}
            setMouse={setMouse}
          />
          <pointLight position={[-10, -10, -10]} />
          <directionalLight
            position={[5, 5, 5]}
            intensity={1}
            castShadow
            shadow-mapSize={{ width: 1024, height: 1024 }}
            shadow-bias={-0.001}
          />
          <Environment preset='sunset' />
          <GizmoHelper alignment='bottom-right' margin={[100, 100]}>
            <GizmoViewport labelColor='white' axisHeadScale={1} />
          </GizmoHelper>
          {/* <OrbitControls enabled={!isDragging} /> */}
          <DragControls
            isAddObjectMode={isAddObjectMode}
            setIsDragging={setIsDragging}
          />
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
      <Selector
        setIsAddObjectMode={setIsAddObjectMode}
        selectedModel={selectedModel}
        setSelectedModel={setSelectedModel}
      />
    </div>
  );
}
