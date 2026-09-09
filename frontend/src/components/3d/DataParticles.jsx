import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const DataParticles = ({ connections, count = 30, activityLevel = 1 }) => {
  const meshRef = useRef();

  const particles = useMemo(() => {
    const arr = [];
    if (!connections || connections.length === 0) return arr;

    for (let i = 0; i < count; i++) {
      const conn = connections[i % connections.length];
      arr.push({
        start: new THREE.Vector3(...conn.start),
        end: new THREE.Vector3(...conn.end),
        progress: Math.random(),
        speed: 0.005 + Math.random() * 0.015 * activityLevel,
      });
    }
    return arr;
  }, [connections, count, activityLevel]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame(() => {
    if (!meshRef.current || particles.length === 0) return;

    particles.forEach((p, i) => {
      p.progress += p.speed;
      if (p.progress > 1) p.progress = 0;

      const pos = new THREE.Vector3().lerpVectors(p.start, p.end, p.progress);
      dummy.position.copy(pos);
      dummy.scale.setScalar(0.08 + Math.sin(p.progress * Math.PI) * 0.06);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  if (particles.length === 0) return null;

  return (
    <instancedMesh ref={meshRef} args={[null, null, particles.length]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial color="#00f0ff" transparent opacity={0.9} blending={THREE.AdditiveBlending} />
    </instancedMesh>
  );
};

export default DataParticles;
