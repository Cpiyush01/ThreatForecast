import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const NetworkNodes = ({ nodes, isThreat = false }) => {
  const groupRef = useRef();

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.children.forEach((child, i) => {
        const pulseSpeed = isThreat ? 3 : 1.5;
        const scale = 1 + Math.sin(state.clock.getElapsedTime() * pulseSpeed + i) * 0.15;
        child.scale.setScalar(scale);
      });
    }
  });

  const nodeColor = isThreat ? '#ef4444' : '#00f0ff';
  const coreColor = isThreat ? '#fca5a5' : '#e0f2fe';

  return (
    <group ref={groupRef}>
      {nodes.map((node) => (
        <group key={node.id} position={node.position}>
          {/* Outer glow sphere */}
          <mesh>
            <sphereGeometry args={[node.radius * 1.6, 16, 16]} />
            <meshBasicMaterial
              color={nodeColor}
              transparent
              opacity={0.25}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
          {/* Core sphere */}
          <mesh>
            <sphereGeometry args={[node.radius, 16, 16]} />
            <meshStandardMaterial
              color={coreColor}
              emissive={nodeColor}
              emissiveIntensity={0.8}
              roughness={0.2}
              metalness={0.8}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
};

export default NetworkNodes;
