import React, { useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { NetworkNodes } from './NetworkNodes';
import { NetworkEdges } from './NetworkEdges';
import { DataParticles } from './DataParticles';
import { ParticleField } from './ParticleField';
import { SceneEffects } from './SceneEffects';
import { useForecast } from '../../hooks/useForecast';
import { useNetworkStats } from '../../hooks/useNetworkStats';
import { Maximize2, ShieldAlert, Cpu } from 'lucide-react';

export const NetworkScene = ({ height = '460px' }) => {
  const { forecast } = useForecast();
  const { currentPackets, packetsPerSecond, sourceIps, destinationIps } = useNetworkStats();

  const isThreat = Boolean(forecast?.peak_risk >= 0.05);
  const packetRate = parseFloat(packetsPerSecond) || 0;
  const activityMultiplier = Math.min(4, Math.max(0.6, 1 + packetRate / 20));

  // Deterministic abstract cyber constellation topology
  const { nodes, connections } = useMemo(() => {
    const rawNodes = [
      // Core Cluster
      { id: 1, position: [0, 0, 0], radius: 0.35, core: true },
      { id: 2, position: [2.2, 0.8, 0.5], radius: 0.25 },
      { id: 3, position: [-2.0, 1.2, -0.4], radius: 0.28 },
      { id: 4, position: [0.5, -2.1, 0.8], radius: 0.24 },
      { id: 5, position: [-1.4, -1.6, -0.7], radius: 0.26 },
      { id: 6, position: [1.8, -1.2, -1.2], radius: 0.22 },
      { id: 7, position: [-1.9, 0.3, 1.6], radius: 0.25 },
      // Mid Horizon Shell
      { id: 8, position: [3.4, -0.4, 1.4], radius: 0.2 },
      { id: 9, position: [-3.2, -0.9, 1.1], radius: 0.2 },
      { id: 10, position: [0.8, 3.1, -1.0], radius: 0.24 },
      { id: 11, position: [-2.6, 2.4, 0.9], radius: 0.22 },
      { id: 12, position: [2.9, 2.0, -0.8], radius: 0.19 },
      { id: 13, position: [-0.9, -3.2, 1.5], radius: 0.2 },
      { id: 14, position: [3.1, -2.3, -0.5], radius: 0.18 },
      // Outer Ingress/Egress Constellation
      { id: 15, position: [4.5, 1.5, 0.2], radius: 0.16 },
      { id: 16, position: [-4.6, 1.1, -1.2], radius: 0.17 },
      { id: 17, position: [0.2, 4.3, 1.1], radius: 0.18 },
      { id: 18, position: [-3.8, -2.8, -0.9], radius: 0.16 },
      { id: 19, position: [4.2, -1.8, 1.6], radius: 0.17 },
      { id: 20, position: [-1.2, 4.1, -1.4], radius: 0.18 },
    ];

    const rawEdges = [
      [1, 2], [1, 3], [1, 4], [1, 5], [1, 6], [1, 7],
      [2, 8], [2, 12], [3, 10], [3, 11], [4, 13], [4, 14],
      [5, 9], [5, 13], [6, 8], [6, 14], [7, 9], [7, 11],
      [8, 15], [8, 19], [9, 16], [9, 18], [10, 17], [10, 20],
      [11, 16], [11, 17], [12, 15], [12, 17], [13, 18], [14, 19],
      [2, 3], [4, 5], [6, 7], [8, 12], [9, 13], [10, 12]
    ];

    const mappedConnections = rawEdges.map(([startId, endId]) => {
      const startNode = rawNodes.find(n => n.id === startId);
      const endNode = rawNodes.find(n => n.id === endId);
      return {
        start: startNode.position,
        end: endNode.position,
      };
    });

    return { nodes: rawNodes, connections: mappedConnections };
  }, []);

  return (
    <div className="relative w-full rounded-2xl overflow-hidden glass-panel border border-slate-800/80 shadow-2xl group" style={{ height }}>
      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [0, 0, 9], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <color attach="background" args={['#040814']} />
        <fog attach="fog" args={['#040814', 8, 22]} />

        <SceneEffects />
        <ParticleField count={220} />
        <NetworkEdges connections={connections} isThreat={isThreat} />
        <NetworkNodes nodes={nodes} isThreat={isThreat} />
        <DataParticles
          connections={connections}
          count={Math.min(80, Math.floor(25 * activityMultiplier))}
          activityLevel={activityMultiplier}
        />
      </Canvas>

      {/* Cyber HUD Overlays */}
      <div className="absolute top-4 left-4 pointer-events-none z-10 flex flex-col gap-1.5">
        <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-slate-950/80 border border-slate-800 backdrop-blur-md">
          <div className={`w-2 h-2 rounded-full ${isThreat ? 'bg-rose-500 animate-ping' : 'bg-cyan-400 animate-pulse'}`} />
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-200">
            {isThreat ? 'ANOMALOUS TOPOLOGY DETECTED' : 'ABSTRACT CYBER TELEMETRY'}
          </span>
        </div>
        <span className="text-[10px] font-mono text-slate-400 pl-1">
          Activity Scale: {activityMultiplier.toFixed(2)}× ({packetRate.toFixed(1)} pkts/s)
        </span>
      </div>

      <div className="absolute top-4 right-4 pointer-events-none z-10 flex items-center gap-2">
        <div className="px-3 py-1 rounded-lg bg-slate-950/80 border border-slate-800 backdrop-blur-md text-[11px] font-mono text-slate-300">
          NODES: <span className="text-cyan-400 font-bold">{nodes.length}</span>
          <span className="mx-2 text-slate-700">|</span>
          EDGES: <span className="text-cyan-400 font-bold">{connections.length}</span>
        </div>
      </div>

      {/* Bottom Telemetry HUD Bar */}
      <div className="absolute bottom-4 left-4 right-4 pointer-events-none z-10 flex items-center justify-between">
        <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400 px-3 py-1 rounded-lg bg-slate-950/70 border border-slate-800/60 backdrop-blur-md">
          <span>SRC: <strong className="text-slate-200">{sourceIps !== '—' ? sourceIps : '0'}</strong></span>
          <span className="text-slate-700">|</span>
          <span>DST: <strong className="text-slate-200">{destinationIps !== '—' ? destinationIps : '0'}</strong></span>
          <span className="text-slate-700">|</span>
          <span>WINDOW PKTS: <strong className="text-cyan-300">{currentPackets}</strong></span>
        </div>

        <div className="text-[10px] font-mono text-slate-500 hidden sm:block">
          INTERACTIVE PARALLAX &middot; LIVE PACKET PARTICLES
        </div>
      </div>
    </div>
  );
};

export default NetworkScene;
