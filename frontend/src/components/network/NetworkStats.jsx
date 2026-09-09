import React from 'react';
import { Activity, Radio, ArrowUpRight, ArrowDownRight, Share2, Layers, Cpu } from 'lucide-react';
import GlassCard from '../ui/GlassCard';
import { useNetworkStats } from '../../hooks/useNetworkStats';

export const NetworkStats = () => {
  const {
    latestState,
    currentPackets,
    packetsPerSecond,
    statesObserved,
    sourceIps,
    destinationIps,
    flowPairs,
    tcpRatio,
    synRatio,
    rstRatio,
  } = useNetworkStats();

  const metrics = [
    {
      title: 'PACKET COUNT',
      value: currentPackets,
      subtitle: 'Current 10s Window',
      icon: Activity,
      color: 'text-cyan-400',
    },
    {
      title: 'PACKETS / SEC',
      value: packetsPerSecond,
      subtitle: 'Ingress throughput',
      icon: Radio,
      color: 'text-blue-400',
    },
    {
      title: 'OBSERVED WINDOWS',
      value: statesObserved,
      subtitle: 'Historical states recorded',
      icon: Layers,
      color: 'text-purple-400',
    },
    {
      title: 'UNIQUE SOURCES',
      value: sourceIps,
      subtitle: 'Active Source IPs',
      icon: ArrowUpRight,
      color: 'text-emerald-400',
    },
    {
      title: 'UNIQUE DESTINATIONS',
      value: destinationIps,
      subtitle: 'Active Destination IPs',
      icon: ArrowDownRight,
      color: 'text-teal-400',
    },
    {
      title: 'FLOW PAIRS',
      value: flowPairs,
      subtitle: 'Bilateral conversations',
      icon: Share2,
      color: 'text-cyan-300',
    },
    {
      title: 'TCP PROTOCOL RATIO',
      value: tcpRatio,
      subtitle: 'Transport layer distribution',
      icon: Cpu,
      color: 'text-sky-400',
    },
    {
      title: 'SYN RATIO',
      value: synRatio,
      subtitle: 'TCP SYN / Connection flags',
      icon: Activity,
      color: Number(synRatio) > 0.4 ? 'text-amber-400' : 'text-slate-300',
    },
    {
      title: 'RST RATIO',
      value: rstRatio,
      subtitle: 'TCP Reset flag distribution',
      icon: Activity,
      color: Number(rstRatio) > 0.2 ? 'text-rose-400' : 'text-slate-300',
    },
  ];

  return (
    <GlassCard className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-400">
            <Activity className="w-4 h-4 text-cyan-400" />
          </div>
          <div>
            <h3 className="text-xs font-mono font-bold tracking-widest text-slate-300 uppercase">
              LIVE NETWORK STATE TELEMETRY
            </h3>
            <p className="text-[10px] font-mono text-slate-500">
              Aggregated statistical metrics extracted from latest 10-second window
            </p>
          </div>
        </div>

        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-400">
          45 FEATURES LOADED
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-3">
        {metrics.map((m, idx) => {
          const Icon = m.icon;
          return (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 flex flex-col justify-between"
            >
              <div className="flex items-center justify-between gap-1 mb-1">
                <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                  {m.title}
                </span>
                <Icon className={`w-3.5 h-3.5 ${m.color}`} />
              </div>

              <div className="my-1">
                <span className={`text-xl lg:text-2xl font-black font-mono tracking-tight ${m.color}`}>
                  {m.value}
                </span>
              </div>

              <span className="text-[10px] font-mono text-slate-500 truncate">
                {m.subtitle}
              </span>
            </div>
          );
        })}
      </div>
    </GlassCard>
  );
};

export default NetworkStats;
