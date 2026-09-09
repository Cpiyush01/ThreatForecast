import React, { useMemo } from 'react';
import * as THREE from 'three';

export const NetworkEdges = ({ connections, isThreat = false }) => {
  const lineGeometries = useMemo(() => {
    return connections.map((conn) => {
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array([
        ...conn.start,
        ...conn.end,
      ]);
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      return geometry;
    });
  }, [connections]);

  const color = isThreat ? '#ef4444' : '#38bdf8';

  return (
    <group>
      {lineGeometries.map((geom, idx) => (
        <line key={idx} geometry={geom}>
          <lineBasicMaterial
            color={color}
            transparent
            opacity={0.35}
            linewidth={1}
            blending={THREE.AdditiveBlending}
          />
        </line>
      ))}
    </group>
  );
};

export default NetworkEdges;
