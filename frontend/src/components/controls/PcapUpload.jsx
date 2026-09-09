import React, { useRef } from 'react';
import { UploadCloud, FileText, CheckCircle2, Play, Sliders } from 'lucide-react';
import GlassCard from '../ui/GlassCard';
import GlowButton from '../ui/GlowButton';
import { useMonitoring } from '../../hooks/useMonitoring';
import { useForecast } from '../../hooks/useForecast';

export const PcapUpload = () => {
  const { pcapFile, setPcapFile, speed, setSpeed, replayUpload, busy } = useMonitoring();
  const { status } = useForecast();
  const fileInputRef = useRef(null);

  const isReplaying = status?.mode === 'replay';

  const formatFileSize = (bytes) => {
    if (!bytes) return '0 B';
    const mb = bytes / (1024 * 1024);
    if (mb >= 1024) {
      return `${(mb / 1024).toFixed(2)} GB`;
    }
    return `${mb.toFixed(2)} MB`;
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setPcapFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <GlassCard className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-400">
            <UploadCloud className="w-4 h-4 text-cyan-400" />
          </div>
          <div>
            <h3 className="text-xs font-mono font-bold tracking-widest text-slate-300 uppercase">
              PCAP / PCAPNG INGESTION & REPLAY
            </h3>
            <p className="text-[10px] font-mono text-slate-500">
              Deterministic attack validation and historical network replay
            </p>
          </div>
        </div>

        <span
          className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border uppercase ${
            isReplaying
              ? 'bg-purple-500/10 text-purple-400 border-purple-500/30'
              : 'bg-slate-950 text-slate-500 border-slate-800'
          }`}
        >
          {isReplaying ? 'REPLAYING' : 'READY'}
        </span>
      </div>

      <div className="space-y-4">
        {/* Drag & Drop File Zone */}
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleFileDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`
            border-2 border-dashed rounded-xl p-5 text-center cursor-pointer transition-all
            ${
              pcapFile
                ? 'border-cyan-500/50 bg-cyan-500/5'
                : 'border-slate-800 hover:border-slate-700 bg-slate-950/40'
            }
          `}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".pcap,.pcapng,.cap"
            onChange={(e) => setPcapFile(e.target.files?.[0] || null)}
            className="hidden"
          />

          {pcapFile ? (
            <div className="flex items-center justify-center gap-3 text-left">
              <div className="p-2 rounded-lg bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <span className="font-mono text-xs font-bold text-slate-200 block truncate max-w-xs sm:max-w-md">
                  {pcapFile.name}
                </span>
                <span className="font-mono text-[10px] text-cyan-400">
                  {formatFileSize(pcapFile.size)} &middot; Ready for replay
                </span>
              </div>
            </div>
          ) : (
            <div className="space-y-1">
              <UploadCloud className="w-7 h-7 mx-auto text-slate-500" />
              <div className="text-xs font-mono text-slate-300 font-bold">
                CLICK OR DRAG PCAP FILE HERE
              </div>
              <div className="text-[10px] font-mono text-slate-500">
                Supports .pcap, .pcapng, and .cap raw packet captures
              </div>
            </div>
          )}
        </div>

        {/* Speed Controls & Replay Trigger */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="sm:col-span-1">
            <label className="text-[10px] font-mono text-slate-400 block mb-1 font-bold">
              REPLAY SPEED (1× DEFAULT)
            </label>
            <div className="relative">
              <Sliders className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="number"
                min="0.1"
                step="0.1"
                value={speed}
                onChange={(e) => setSpeed(e.target.value)}
                disabled={busy}
                className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-200 font-mono outline-none focus:border-cyan-500/50"
              />
            </div>
          </div>

          <div className="sm:col-span-2 flex items-end">
            <GlowButton
              onClick={replayUpload}
              disabled={!pcapFile || busy}
              variant="primary"
              icon={Play}
              className="w-full py-2.5"
            >
              {busy ? 'UPLOADING & STREAMING...' : 'UPLOAD & START REPLAY'}
            </GlowButton>
          </div>
        </div>
      </div>
    </GlassCard>
  );
};

export default PcapUpload;
