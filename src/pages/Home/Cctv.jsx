import React from "react";
import { useGLTF } from "@react-three/drei";
import { forwardRef } from "react";

export const Cctv = forwardRef((props, ref) => {
  const { refHead } = props;
  const { nodes, materials } = useGLTF("./models/Cctv.glb");
  return (
    <group
      
      {...props}
      dispose={null}
      rotation={[0, Math.PI + Math.PI / 2, 0]}
    >
      <group ref={ref}>
        <mesh geometry={nodes.Object_4.geometry} material={materials.qiuwai} />
        <group ref={refHead} rotation={[0, 0, -Math.PI / 2]} scale={0.779}>
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

      <mesh
        geometry={nodes.Object_12.geometry}
        material={materials.qiuwai}
        position={[0, -0.664, 0]}
        scale={0.501}
      />
    </group>
  );
});
useGLTF.preload("./models/Cctv.glb");
