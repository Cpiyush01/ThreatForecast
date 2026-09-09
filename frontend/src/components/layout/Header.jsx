import React, { useState, useEffect } from 'react';
import { Shield, Radio, Activity, RefreshCw, Cpu, Server } from 'lucide-react';
import { useForecast } from '../../hooks/useForecast';
import { useWebSocket } from '../../hooks/useWebSocket';

export const Header = () => {
  const { forecast, status, health, refresh, busy } = useForecast();
  const { wsState } = useWebSocket();
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toTimeString().split(' ')[0] + ' UTC' + (now.getTimezoneOffset() <= 0 ? '+' : '-') + Math.abs(now.getTimezoneOffset() / 60));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const isEarlyWarning = Boolean(forecast?.warning || (forecast?.peak_risk >= 0.05));
  const isModelReady = Boolean(health?.model_loaded);

  return (
    <header className="fixed top-0 left-0 right-0 h-16 z-40 bg-[#040814]/90 backdrop-blur-2xl border-b border-slate-800/80 px-4 lg:px-6 flex items-center justify-between shadow-xl">
      {/* Brand & Identity */}
      <div className="flex items-center gap-3.5">
        <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 p-[1px] shadow-lg shadow-cyan-500/25">
          <div className="w-full h-full bg-[#040814] rounded-[11px] flex items-center justify-center">
            <Shield className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="absolute -inset-0.5 bg-cyan-400/20 rounded-xl blur-sm -z-10 animate-pulse" />
        </div>

        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-base font-black tracking-widest text-slate-100 font-mono">
              THREAT<span className="text-cyan-400">FORECAST</span>
            </h1>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-bold uppercase tracking-wider">
              SOC V2
            </span>
          </div>
          <p className="text-[10px] text-slate-400 font-mono hidden sm:block">
            TEMPORAL NETWORK WORLD MODEL · EARLY CYBER ATTACK FORECASTING
          </p>
        </div>
      </div>

      {/* Center/Right Status Indicators */}
      <div className="flex items-center gap-3 md:gap-4 font-mono">
        {/* Real-time Clock */}
        <div className="hidden xl:flex items-center gap-2 px-3 py-1 rounded-lg bg-slate-900/60 border border-slate-800/80 text-xs text-slate-400">
          <Activity className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <span>{time}</span>
        </div>

        {/* Model Status Pill */}
        <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-lg bg-slate-900/80 border border-slate-800 text-xs">
          <Cpu className="w-3.5 h-3.5 text-cyan-400" />
          <span className="text-[11px] text-slate-400">MODEL:</span>
          <span className={`text-[11px] font-bold ${isModelReady ? 'text-emerald-400' : 'text-amber-400'}`}>
            {isModelReady ? 'ONLINE' : 'LOADING'}
          </span>
        </div>

        {/* Engine Mode Pill */}
        <div className="hidden md:flex items-center gap-2 px-2.5 py-1 rounded-lg bg-slate-900/80 border border-slate-800 text-xs">
          <Server className="w-3.5 h-3.5 text-blue-400" />
          <span className="text-[11px] text-slate-400">MODE:</span>
          <span className="text-[11px] font-bold text-cyan-300 uppercase">
            {status?.mode || 'IDLE'}
          </span>
        </div>

        {/* WebSocket Live Pill */}
        <div
          className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold border transition-all ${wsState === 'connected'
              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 shadow-[0_0_12px_rgba(16,185,129,0.2)]'
              : wsState === 'connecting'
                ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
            }`}
        >
          <span
            className={`w-2 h-2 rounded-full ${wsState === 'connected'
                ? 'bg-emerald-400 animate-ping'
                : wsState === 'connecting'
                  ? 'bg-amber-400 animate-pulse'
                  : 'bg-rose-500'
              }`}
          />
          <Radio className="w-3 h-3" />
          <span className="uppercase text-[10px] tracking-wider">
            {wsState === 'connected' ? 'LIVE STREAM' : wsState}
          </span>
        </div>

        {/* Threat Warning Banner Badge */}
        <div
          className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold border transition-all ${isEarlyWarning
              ? 'bg-rose-500/15 text-rose-400 border-rose-500/40 shadow-[0_0_15px_rgba(239,68,68,0.3)] animate-pulse'
              : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
            }`}
        >
          <span className={`w-2 h-2 rounded-full ${isEarlyWarning ? 'bg-rose-500' : 'bg-emerald-400'}`} />
          <span className="uppercase text-[10px] tracking-wider">
            {isEarlyWarning ? 'EARLY WARNING' : 'SYSTEM NORMAL'}
          </span>
        </div>

        {/* Manual Refresh Button */}
        <button
          onClick={refresh}
          disabled={busy}
          className="p-2 rounded-lg bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-cyan-300 border border-slate-800 transition-colors cursor-pointer"
          title="Refresh Telemetry"
        >
          <RefreshCw className={`w-4 h-4 ${busy ? 'animate-spin text-cyan-400' : ''}`} />
        </button>
      </div>
    </header>
  );
};

export default Header;
