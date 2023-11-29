import React, { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { Torus, Circle } from "@react-three/drei";
import { useControls } from "leva";

export default function InstantiateObject({
  isAddObjectMode,
  handleAddObject,
  setIsAddObjectMode,
  setMouse,
}) {
  const { scene, camera } = useThree();
  const ref = useRef();
  const planeRef = useRef();
  let mouse = new THREE.Vector2();
  // let plane, raycaster, mouse, marker;
  let raycaster = new THREE.Raycaster();

  const planePointer = () => {
    if (!isAddObjectMode) return;
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects([planeRef.current], true);

    //ref.current.position.copy({ x: pointer.x, z: -pointer.y, y: 0.3 });
    if (intersects.length > 0) {
      ref.current.visible = true;

      ref.current.position.copy({ ...intersects[0].point });
      setMouse([ref.current.position.x, 0, ref.current.position.z - 1]);
    } else {
      if (ref.current) {
        ref.current.visible = false;
      }
      // console.log(ref.current.position);
    }
  };

  document.addEventListener("mousemove", (event) => {
    if (isAddObjectMode && ref.current) {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 0.7;
      planePointer();
    } else {
      if (ref.current) ref.current.visible = false;
    }
  });

  return (
    <group>
      <group ref={ref} rotation={[0, 0, 1.6]}>
        <Torus
          args={[0.1, 0.02, 2, 100]}
          rotation={[0, -Math.PI * 0.5, 0]}
          position={[0, 0.01, 0]}
          material-color='#5b3cc4'
        />
        <Circle
          args={[0.08, 32]}
          rotation={[0, -Math.PI * 0.5, 0]}
          position={[0, 0.01, 0]}
          material-color='#ffffff'
          material-transparent
          opacity={1}
        />
      </group>
      <mesh visible={false} ref={planeRef} rotation={[-Math.PI * 0.3, 0, 0]}>
        <planeGeometry args={[150, 150]} />
        <meshBasicMaterial color='#000000' />
      </mesh>
    </group>
  );
}
