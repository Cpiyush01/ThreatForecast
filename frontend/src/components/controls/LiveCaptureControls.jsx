import React from 'react';
import { Play, Square, Radio, Wifi } from 'lucide-react';
import GlassCard from '../ui/GlassCard';
import GlowButton from '../ui/GlowButton';
import { useMonitoring } from '../../hooks/useMonitoring';
import { useForecast } from '../../hooks/useForecast';

export const LiveCaptureControls = () => {
  const { iface, setIface, startLive, stopLive, busy } = useMonitoring();
  const { status } = useForecast();

  const isLive = status?.mode === 'live';

  return (
    <GlassCard className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-400">
            <Radio className="w-4 h-4 text-cyan-400" />
          </div>
          <div>
            <h3 className="text-xs font-mono font-bold tracking-widest text-slate-300 uppercase">
              LIVE NETWORK INTERFACE CAPTURE
            </h3>
            <p className="text-[10px] font-mono text-slate-500">
              Direct packet sniffing on local network adapter
            </p>
          </div>
        </div>

        <span
          className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border uppercase ${
            isLive
              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
              : 'bg-slate-950 text-slate-500 border-slate-800'
          }`}
        >
          {isLive ? 'CAPTURING' : 'IDLE'}
        </span>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-[11px] font-mono text-slate-400 block mb-1 font-bold">
            NETWORK ADAPTER / INTERFACE (OPTIONAL)
          </label>
          <div className="relative">
            <Wifi className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              value={iface}
              onChange={(e) => setIface(e.target.value)}
              placeholder="e.g. Wi-Fi, eth0, en0 (leave empty for default adapter)"
              disabled={isLive || busy}
              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-9 pr-4 py-2.5 text-xs text-slate-200 placeholder:text-slate-600 outline-none focus:border-cyan-500/50 font-mono disabled:opacity-50"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <GlowButton
            onClick={() => startLive(iface)}
            disabled={isLive || busy}
            variant="primary"
            icon={Play}
            className="flex-1"
          >
            START LIVE CAPTURE
          </GlowButton>

          <GlowButton
            onClick={stopLive}
            disabled={!isLive || busy}
            variant="danger"
            icon={Square}
            className="flex-1"
          >
            STOP CAPTURE
          </GlowButton>
        </div>
      </div>
    </GlassCard>
  );
};

export default LiveCaptureControls;
