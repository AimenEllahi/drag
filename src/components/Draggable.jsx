// Draggable.js
import React, { useRef, useEffect } from "react";
import { useThree } from "@react-three/fiber";
import { DragControls } from "three/examples/jsm/controls/DragControls";

const generateConnectionPoints = (size) => {
  const halfSize = size / 2;
  return [
    { position: [halfSize, 0, 0] }, // Right face
    { position: [-halfSize, 0, 0] }, // Left face
    { position: [0, halfSize, 0] }, // Top face
    { position: [0, -halfSize, 0] }, // Bottom face
    { position: [0, 0, halfSize] }, // Front face
    { position: [0, 0, -halfSize] }, // Back face
  ];
};

const Draggable = ({ position, color, args }) => {
  const meshRef = useRef();
  const { camera, gl } = useThree();
  const [con, setCon] = React.useState(true);

  const connectionPoints = generateConnectionPoints(args[0]);

  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={args} />
      <meshStandardMaterial color={color} />
      <group name='connection points'>
        {connectionPoints.map((point, index) => (
          <mesh
            name='connection'
            key={index}
            position={point.position}
            visible={con}
          >
            {/* Connection point geometry */}
            <sphereGeometry args={[0.1, 32, 32]} />
            <meshStandardMaterial color='#0F0F0F' />
          </mesh>
        ))}
      </group>
    </mesh>
  );
};

export default Draggable;
