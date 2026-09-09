import React from 'react';
import { motion } from 'framer-motion';
import { Radio, Layers, Database, Cpu, HardDrive } from 'lucide-react';
import GlassCard from '../ui/GlassCard';
import { useForecast } from '../../hooks/useForecast';

export const PipelineStrip = () => {
  const { status, health, forecast } = useForecast();

  const isCapturing = status?.mode === 'live' || status?.mode === 'replay';
  const hasStates = (status?.state_count || 0) > 0;
  const isHistoryReady = Boolean(status?.ready_for_forecast);
  const isModelReady = Boolean(health?.model_loaded);

  const stages = [
    {
      id: 'capture',
      title: 'PACKET CAPTURE',
      description: 'Raw Ingress Stream',
      icon: Radio,
      active: isCapturing,
      stateBadge:
        status?.mode === 'live'
          ? 'LIVE ACTIVE'
          : status?.mode === 'replay'
            ? 'REPLAYING'
            : 'STOPPED',
      metric: `${status?.packet_count || 0} pkts`,
    },
    {
      id: 'window',
      title: '10s STATE',
      description: 'Temporal Aggregator',
      icon: Layers,
      active: hasStates,
      stateBadge: hasStates ? 'SYNCHRONIZED' : 'INITIALIZING',
      metric: `${status?.state_count || 0} windows`,
    },
    {
      id: 'features',
      title: '45 FEATURES',
      description: 'Statistical Vector',
      icon: Database,
      active: hasStates,
      stateBadge: '45 FEATURES',
      metric: hasStates ? 'COMPLETE' : 'PENDING',
    },
    {
      id: 'history',
      title: '5-STATE HISTORY',
      description: '50s Temporal Context',
      icon: HardDrive,
      active: isHistoryReady,
      stateBadge: isHistoryReady ? '5 / 5 READY' : `${Math.min(5, status?.state_count || 0)} / 5 STATES`,
      metric: '50s WINDOW',
    },
    {
      id: 'transformer',
      title: 'TRANSFORMER',
      description: 'Attention World Model',
      icon: Cpu,
      active: isModelReady && forecast !== null,
      stateBadge: isModelReady ? 'MODEL ONLINE' : 'OFFLINE',
      metric: '+10s–+60s',
    },
  ];

  return (
    <GlassCard className="p-6 relative overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-xs font-mono font-bold tracking-widest text-slate-300 uppercase">
            END-TO-END TEMPORAL FORECASTING PIPELINE
          </span>
        </div>
        <span className="text-[11px] font-mono text-slate-500 hidden sm:block">
          STREAM → 10s BINS → 45 FEATURES → 5 STATES → ATTENTION INFERENCE
        </span>
      </div>

      {/* Horizontal Pipeline Steps with Animated Data Flow Particles */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3 relative">
        {stages.map((stage, idx) => {
          const Icon = stage.icon;
          const isLast = idx === stages.length - 1;

          return (
            <div key={stage.id} className="relative flex flex-col justify-between">
              {/* Stage Card */}
              <div
                className={`
                  p-4 rounded-xl border transition-all duration-300 relative z-10 flex flex-col justify-between h-full
                  ${stage.active
                    ? 'bg-slate-900/80 border-cyan-500/40 shadow-lg shadow-cyan-500/10 ring-1 ring-cyan-500/20'
                    : 'bg-slate-950/60 border-slate-800/80 text-slate-500'
                  }
                `}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div
                      className={`p-2 rounded-lg ${stage.active
                          ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30'
                          : 'bg-slate-900 text-slate-600'
                        }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[9px] font-mono text-slate-500 font-bold">
                      STAGE 0{idx + 1}
                    </span>
                  </div>

                  <h4 className="text-xs font-mono font-bold tracking-wider text-slate-200">
                    {stage.title}
                  </h4>
                  <p className="text-[10px] text-slate-400 font-sans mt-0.5">
                    {stage.description}
                  </p>
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-800/60 flex items-center justify-between text-[10px] font-mono">
                  <span
                    className={`px-1.5 py-0.5 rounded font-bold uppercase ${stage.active
                        ? 'bg-cyan-400/10 text-cyan-300 border border-cyan-400/20'
                        : 'bg-slate-900 text-slate-500'
                      }`}
                  >
                    {stage.stateBadge}
                  </span>
                  <span className="text-slate-400 font-medium">{stage.metric}</span>
                </div>
              </div>

              {/* Data Flow Connector with Animated Particles (Desktop) */}
              {!isLast && (
                <div className="hidden md:block absolute -right-2 top-1/2 -translate-y-1/2 w-4 z-20 pointer-events-none">
                  <div className="relative w-full h-0.5 bg-slate-800">
                    {stage.active && (
                      <motion.div
                        className="absolute -top-1 w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#00e5ff]"
                        animate={{ x: [0, 16] }}
                        transition={{
                          repeat: Infinity,
                          duration: 1.2,
                          ease: 'easeInOut',
                          delay: idx * 0.2,
                        }}
                      />
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </GlassCard>
  );
};

export default PipelineStrip;
