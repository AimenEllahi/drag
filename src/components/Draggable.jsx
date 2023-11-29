// Draggable.js
import React, { useRef, useEffect } from "react";
import { Text, Html } from "@react-three/drei";
import { FaTrashCan } from "react-icons/fa6";

const generateConnectionPoints = (dimensions) => {
  const halfWidth = dimensions[0] / 2;
  const halfHeight = dimensions[1] / 2;
  const halfDepth = dimensions[2] / 2;

  return [
    { position: [halfWidth, 0, 0] }, // Right face
    { position: [-halfWidth, 0, 0] }, // Left face
    { position: [0, halfHeight, 0] }, // Top face
    { position: [0, -halfHeight, 0] }, // Bottom face
    { position: [0, 0, halfDepth] }, // Front face
    { position: [0, 0, -halfDepth] }, // Back face
  ];
};

const Draggable = ({ position, color, dimensions, onDelete }) => {
  const meshRef = useRef();

  const [con, setCon] = React.useState(true);

  const connectionPoints = generateConnectionPoints(dimensions);

  const handleXClick = (event) => {
    event.stopPropagation();
    onDelete();
  };

  const iconPosition = [
    dimensions[0] / 2,
    dimensions[1] / 2,
    dimensions[2] / 2,
  ];

  useEffect(() => {
    meshRef.current.geometry.computeBoundingBox();
    const boundingBox = meshRef.current.geometry.boundingBox;

    // Adjust icon position based on the bounding box
    if (boundingBox) {
      iconPosition[0] += boundingBox.max.x;
      iconPosition[1] += boundingBox.max.y;
      iconPosition[2] += boundingBox.max.z;
    }
  }, [dimensions]);

  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={dimensions} />
      <meshStandardMaterial color={color} receiveShadow castShadow />

      <group name="connection points">
        {connectionPoints.map((point, index) => (
          <mesh
            name="connection"
            key={index}
            position={point.position}
            visible={con}
            layers={3}
          >
            {/* Connection point geometry */}
            <sphereGeometry args={[0.1, 32, 32]} />
            <meshStandardMaterial color="#0F0F0F" />
          </mesh>
        ))}
      </group>
      <Html position={iconPosition}>
        <div
          style={{
            color: "red",
            cursor: "pointer",
            zIndex: 1,
          }}
          onClick={handleXClick}
        >
          <FaTrashCan size={20} />
        </div>
      </Html>
    </mesh>
  );
};

export default Draggable;
