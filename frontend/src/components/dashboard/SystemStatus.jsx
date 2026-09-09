import React from 'react';
import { Cpu, Server, CheckCircle, AlertCircle, HardDrive, Sliders } from 'lucide-react';
import GlassCard from '../ui/GlassCard';
import { useForecast } from '../../hooks/useForecast';
import { useWebSocket } from '../../hooks/useWebSocket';

export const SystemStatus = () => {
  const { health, status } = useForecast();
  const { wsState } = useWebSocket();

  const items = [
    {
      label: 'TRANSFORMER MODEL',
      value: health?.model_loaded ? 'READY' : 'OFFLINE',
      ok: health?.model_loaded,
      icon: Cpu,
    },
    {
      label: 'FEATURE SCALER',
      value: health?.scaler_loaded ? 'READY' : 'OFFLINE',
      ok: health?.scaler_loaded,
      icon: Sliders,
    },
    {
      label: 'CAPTURE ENGINE',
      value: (status?.mode || 'stopped').toUpperCase(),
      ok: status?.mode === 'live' || status?.mode === 'replay',
      icon: Server,
    },
    {
      label: 'HISTORY BUFFER',
      value: status?.ready_for_forecast ? '5 STATES READY' : 'ACCUMULATING',
      ok: status?.ready_for_forecast,
      icon: HardDrive,
    },
    {
      label: 'OPERATIONAL THRESHOLD',
      value: '0.05',
      ok: true,
      icon: CheckCircle,
    },
    {
      label: 'PREDICTION HORIZONS',
      value: '+10s … +60s',
      ok: true,
      icon: CheckCircle,
    },
  ];

  return (
    <GlassCard className="p-6 h-full flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-400">
              <Server className="w-4 h-4 text-cyan-400" />
            </div>
            <h3 className="text-xs font-mono font-bold tracking-widest text-slate-300 uppercase">
              RUNTIME ARCHITECTURE STATUS
            </h3>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-400">
            WS: {wsState.toUpperCase()}
          </span>
        </div>

        <div className="space-y-2.5">
          {items.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/80 font-mono text-xs"
              >
                <div className="flex items-center gap-2 text-slate-400">
                  <Icon className={`w-3.5 h-3.5 ${item.ok ? 'text-cyan-400' : 'text-slate-500'}`} />
                  <span className="text-[11px] font-medium">{item.label}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <span
                    className={`text-[11px] font-bold ${
                      item.ok ? 'text-emerald-400' : 'text-amber-400'
                    }`}
                  >
                    {item.value}
                  </span>
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      item.ok ? 'bg-emerald-400' : 'bg-amber-400'
                    }`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-800/80 text-[10px] font-mono text-slate-500 flex items-center justify-between">
        <span>DEVICE: CPU/CUDA</span>
        <span>LATENCY: &lt; 85ms</span>
      </div>
    </GlassCard>
  );
};

export default SystemStatus;
