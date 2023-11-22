import React, { useEffect } from "react";
import { DragControls } from "three/examples/jsm/controls/DragControls";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";

export default function Controls() {
  const { camera, scene, gl } = useThree();

  useEffect(() => {
    // console.log(scene.children);
    const controls = new DragControls(scene.children, camera, gl.domElement);

    controls.addEventListener("dragstart", (event) => {
      //   console.log("dragging");
      //   //get object being dragged
      //   console.log(event.object);
    });

    controls.addEventListener("dragend", (event) => {
      const selectedObjectPoints = event.object.children[0].children.map(
        (connPoint) => connPoint
      );

      scene.children[4].children
        .filter((object) => object.uuid !== event.object.uuid)
        .forEach((object) => {
          object.children[0].children.forEach((connPoint) => {
            selectedObjectPoints.forEach((sConnPoint) => {
              // Compare distance in WORLD coords
              const s = new THREE.Vector3();
              const d = new THREE.Vector3();
              connPoint.getWorldPosition(d);
              sConnPoint.getWorldPosition(s);
              if (s.distanceTo(d) < 0.4) {
                // Position difference between connection points in WORLD coords
                // Move object that difference
                const differenceWorld = new THREE.Vector3().subVectors(d, s);
                const objectPosWorld = new THREE.Vector3();
                event.object.getWorldPosition(objectPosWorld);
                const moveWorld = new THREE.Vector3().addVectors(
                  objectPosWorld,
                  differenceWorld
                );
                event.object.position.set(
                  moveWorld.x,
                  moveWorld.y,
                  moveWorld.z
                );
              }
            });
          });
        });
    });

    return () => {
      controls.dispose();
    };
  }, []);
  return null;
}
