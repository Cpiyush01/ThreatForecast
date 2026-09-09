import React from 'react';
import { Play, Square, FastForward } from 'lucide-react';
import GlowButton from '../ui/GlowButton';
import { useMonitoring } from '../../hooks/useMonitoring';
import { useForecast } from '../../hooks/useForecast';

export const ReplayControls = () => {
  const { speed, setSpeed, stopLive, busy } = useMonitoring();
  const { status } = useForecast();

  const isReplay = status?.mode === 'replay';

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs font-mono">
        <FastForward className="w-3.5 h-3.5 text-cyan-400" />
        <span className="text-slate-400">SPEED:</span>
        <span className="text-cyan-300 font-bold">{speed}×</span>
      </div>

      {isReplay && (
        <GlowButton
          onClick={stopLive}
          disabled={busy}
          variant="danger"
          icon={Square}
          className="text-xs py-2"
        >
          STOP REPLAY
        </GlowButton>
      )}
    </div>
  );
};

export default ReplayControls;
