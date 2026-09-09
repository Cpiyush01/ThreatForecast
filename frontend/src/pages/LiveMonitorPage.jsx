import React from 'react';
import { motion } from 'framer-motion';
import MonitoringControls from '../components/controls/MonitoringControls';
import PacketStreamTable from '../components/network/PacketStreamTable';
import NetworkStats from '../components/network/NetworkStats';
import PipelineStrip from '../components/network/PipelineStrip';

export const LiveMonitorPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.25 }}
      className="space-y-6"
    >
      {/* Live Ingestion & Replay Controls */}
      <MonitoringControls />

      {/* Network Pipeline Status Strip */}
      <PipelineStrip />

      {/* Live 10s Window Telemetry */}
      <NetworkStats />

      {/* Full Live Packet Stream Table */}
      <PacketStreamTable maxRows={120} />
    </motion.div>
  );
};

export default LiveMonitorPage;
