import React from 'react';
import { ShieldAlert, Radio, Activity, TrendingUp } from 'lucide-react';
import MetricCard from '../ui/MetricCard';
import { useForecast } from '../../hooks/useForecast';
import { useMitre } from '../../hooks/useMitre';
import { useNetworkStats } from '../../hooks/useNetworkStats';

export const ThreatOverview = () => {
  const { forecast } = useForecast();
  const { primaryAttack } = useMitre();
  const { currentPackets, packetsPerSecond } = useNetworkStats();

  const isEarlyWarning = Boolean(forecast?.warning || (forecast?.peak_risk >= 0.05));
  const peakRisk = forecast?.peak_risk ?? null;
  const peakHorizon = forecast?.peak_risk_horizon_seconds ?? '—';

  const forecastMean = forecast?.risk_scores
    ? (
        forecast.risk_scores.reduce((sum, val) => sum + val, 0) /
        forecast.risk_scores.length
      ).toFixed(4)
    : '—';

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <MetricCard
        title="CURRENT PEAK RISK"
        value={peakRisk !== null ? peakRisk.toFixed(4) : '—'}
        subtitle={peakRisk !== null ? `Peak Horizon: +${peakHorizon}s` : 'Awaiting Model'}
        tone={isEarlyWarning ? 'danger' : 'normal'}
        icon={ShieldAlert}
      />

      <MetricCard
        title="SUSPECTED ATTACK"
        value={primaryAttack ? primaryAttack.attack_type : 'None Detected'}
        subtitle={
          primaryAttack
            ? `${primaryAttack.confidence_label} confidence (${primaryAttack.technique_id})`
            : 'Heuristic pattern nominal'
        }
        tone={primaryAttack ? 'warning' : 'normal'}
        icon={Radio}
      />

      <MetricCard
        title="INGRESS PACKETS"
        value={currentPackets}
        subtitle={`${packetsPerSecond} packets / sec`}
        tone="normal"
        icon={Activity}
      />

      <MetricCard
        title="FORECAST AVERAGE"
        value={forecastMean}
        subtitle="Six-horizon aggregate risk mean"
        tone="normal"
        icon={TrendingUp}
      />
    </div>
  );
};

export default ThreatOverview;
