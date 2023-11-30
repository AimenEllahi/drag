import React, { useEffect, useRef } from "react";
import { DragControls } from "three/examples/jsm/controls/DragControls";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";

export default function Controls({ setIsDragging, isAddObjectMode }) {
  const { camera, scene, gl } = useThree();
  const controlsRef = useRef(null);

  useEffect(() => {
    console.log("here");
    const controls = new DragControls(scene.children, camera, gl.domElement);
    controlsRef.current = controls;
    controls.addEventListener("dragstart", (event) => {
      if (event.object.name === "plane") return;
      camera.layers.enable(3);
      console.log("dragStart");
      console.log(event.object.name);
      setIsDragging(true);
    });

    controls.addEventListener("drag", (event) => {
      //console.log(event.object);
      //limit y axis
      event.object.position.y = 0;
    });

    controls.addEventListener("dragend", (event) => {
      if (
        !event.object ||
        !event.object.children ||
        !event.object.children[0] ||
        event.object.name === "plane"
      ) {
        setIsDragging(false);
        return;
      }

      const selectedObjectPoints = event.object.children[0].children.map(
        (connPoint) => connPoint
      );

      scene.children[5].children
        .filter((object) => object.uuid !== event.object.uuid)
        .forEach((object) => {
          object.children[0].children.forEach((connPoint) => {
            selectedObjectPoints.forEach((sConnPoint) => {
              // Compare distance in WORLD coords
              const s = new THREE.Vector3();
              const d = new THREE.Vector3();
              connPoint.getWorldPosition(d);
              sConnPoint.getWorldPosition(s);
              if (s.distanceTo(d) < 1) {
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
      camera.layers.disable(3);

      setIsDragging(false);
      console.log("dragEnd");
    });

    return () => {
      controls.dispose();
    };
  }, []);
  return null;
}
