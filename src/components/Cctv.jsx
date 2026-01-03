import React from "react";
import { useGLTF } from "@react-three/drei";
import { forwardRef } from "react";

export const Cctv = forwardRef((props, ref) => {
  const { refHead } = props;
  const { nodes, materials } = useGLTF("/models/Cctv.glb");

  // Internal refs for the offset groups
  const rootRef = React.useRef();
  const bodyOffsetRef = React.useRef();
  const headOffsetRef = React.useRef();

  React.useImperativeHandle(ref, () => {
    // Helper to safely set transforms
    const setPos = (targetRef, x, y, z) => {
      if (targetRef.current) targetRef.current.position.set(x, y, z);
    };
    const setRot = (targetRef, x, y, z) => {
      if (targetRef.current) targetRef.current.rotation.set(x, y, z);
    };

    // Augment the root group with our control methods
    const api = rootRef.current || {};

    api.setHeadPosition = (x, y, z) => setPos(headOffsetRef, x, y, z);
    api.setHeadRotation = (x, y, z) => setRot(headOffsetRef, x, y, z);
    api.setBodyPosition = (x, y, z) => setPos(bodyOffsetRef, x, y, z);
    api.setBodyRotation = (x, y, z) => setRot(bodyOffsetRef, x, y, z);

    return api;
  });

  return (
    <group
      ref={rootRef}
      {...props}
      dispose={null}
      rotation={[0, Math.PI + Math.PI / 2, 0]}
    >
      <group ref={bodyOffsetRef}>
        <group>
          {/* Base Mesh (Body) - Static */}
          {/* Originally: position={[0, -0.664, 0]} */}
          <mesh
            geometry={nodes.Object_12.geometry}
            material={materials.qiuwai}
            position={[0, -0.664, 0]}
            scale={0.501}
          />

          {/* HEAD GROUP - Contains both Shell and Internals */}
          {/* This group receives the floating & scanning animations (refHead) */}
          <group
            ref={refHead}
            position={[0, 0.2, 0]}
            rotation={[0, 0, -Math.PI / 2]}
          >
            {/* New Head Offset Group */}
            <group ref={headOffsetRef}>
              {/* The Outer Shell (Ball) */}
              <mesh
                geometry={nodes.Object_4.geometry}
                material={materials.qiuwai}
                position={[0, 0, 0]}
                rotation={[0, 0, Math.PI / 2]}
              />

              {/* Inner Components (Lens, Sensors, etc.) */}
              <group scale={0.779}>
                <mesh
                  geometry={nodes.Object_6.geometry}
                  material={materials.material}
                />
                <mesh
                  geometry={nodes.Object_7.geometry}
                  material={materials.material_2}
                />
                <mesh
                  geometry={nodes.Object_8.geometry}
                  material={materials.fanguang}
                />
                <mesh
                  geometry={nodes.Object_14.geometry}
                  material={materials.FAGUANGDIAN}
                  position={[0.731, 0.319, 0]}
                  rotation={[0, 0, -Math.PI / 2]}
                  scale={0.018}
                />
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
});
useGLTF.preload("/models/Cctv.glb");
