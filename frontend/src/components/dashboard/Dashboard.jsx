import React from 'react';
import ThreatOverview from './ThreatOverview';
import NetworkScene from '../3d/NetworkScene';
import ThreatScoreGauge from '../threat/ThreatScoreGauge';
import ThreatStatus from '../threat/ThreatStatus';
import ForecastTimelineChart from '../forecast/ForecastTimelineChart';
import SixHorizonGrid from '../forecast/SixHorizonGrid';
import PipelineStrip from '../network/PipelineStrip';
import NetworkStats from '../network/NetworkStats';
import PacketStreamTable from '../network/PacketStreamTable';
import SystemStatus from './SystemStatus';
import { useForecast } from '../../hooks/useForecast';

export const Dashboard = () => {
  const { forecast } = useForecast();

  return (
    <div className="space-y-6">
      {/* Top 4 SOC Metric Cards */}
      <ThreatOverview />

      {/* Centerpiece: 3D Cyber Network + HUD Threat Score Gauge */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 3D Network Intelligence Scene (Centerpiece, takes 2 cols) */}
        <div className="lg:col-span-2">
          <NetworkScene height="430px" />
        </div>

        {/* HUD Threat Gauge (1 col) */}
        <div className="lg:col-span-1">
          <ThreatScoreGauge
            score={forecast?.peak_risk}
            peakHorizon={forecast?.peak_risk_horizon_seconds ?? 10}
            threshold={0.05}
          />
        </div>
      </div>

      {/* Threat Status Context & System Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ThreatStatus />
        </div>
        <div className="lg:col-span-1">
          <SystemStatus />
        </div>
      </div>

      {/* Temporal Forecast Section: Timeline Chart + 6 Horizon Cards */}
      <div className="space-y-4">
        <ForecastTimelineChart />
        <SixHorizonGrid />
      </div>

      {/* Mandatory Interactive 5-Stage Data Flow Pipeline */}
      <PipelineStrip />

      {/* Network State Telemetry Stats & Live Packet Stream Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <NetworkStats />
        <PacketStreamTable maxRows={15} isCompact />
      </div>
    </div>
  );
};

export default Dashboard;
