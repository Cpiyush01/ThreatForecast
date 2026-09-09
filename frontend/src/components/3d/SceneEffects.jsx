import React from 'react';
import { useFrame } from '@react-three/fiber';

export const SceneEffects = () => {
  useFrame((state) => {
    const { x, y } = state.pointer;
    state.camera.position.x += (x * 1.5 - state.camera.position.x) * 0.05;
    state.camera.position.y += (-y * 1.5 - state.camera.position.y) * 0.05;
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#00f0ff" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />
    </>
  );
};

export default SceneEffects;
