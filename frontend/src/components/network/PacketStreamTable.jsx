import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Radio, Search, Filter, Trash2, ArrowUpDown } from 'lucide-react';
import GlassCard from '../ui/GlassCard';
import { usePacketStream } from '../../hooks/usePacketStream';

const PROTOCOL_COLORS = {
  TCP: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30',
  UDP: 'bg-purple-500/15 text-purple-300 border-purple-500/30',
  ICMP: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
  HTTP: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
  HTTPS: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
  DNS: 'bg-blue-500/15 text-blue-300 border-blue-500/30',
  OTHER: 'bg-slate-800 text-slate-400 border-slate-700',
};

export const PacketStreamTable = ({ maxRows = 60, isCompact = false }) => {
  const { livePackets, clearPackets } = usePacketStream();
  const [filterProtocol, setFilterProtocol] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPackets = useMemo(() => {
    return livePackets
      .filter((p) => {
        if (filterProtocol !== 'ALL' && p.protocol !== filterProtocol) {
          return false;
        }
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          return (
            (p.source && p.source.toLowerCase().includes(q)) ||
            (p.destination && p.destination.toLowerCase().includes(q)) ||
            (p.protocol && p.protocol.toLowerCase().includes(q)) ||
            (p.tcp_flags && p.tcp_flags.toLowerCase().includes(q))
          );
        }
        return true;
      })
      .slice(0, maxRows);
  }, [livePackets, filterProtocol, searchQuery, maxRows]);

  return (
    <GlassCard className="p-6">
      {/* Table Header Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-400">
              <Radio className="w-4 h-4 text-cyan-400" />
            </div>
            <h3 className="text-xs font-mono font-bold tracking-widest text-slate-300 uppercase">
              REAL-TIME PACKET TELEMETRY STREAM
            </h3>
          </div>
          <p className="text-[10px] font-mono text-slate-500 mt-0.5">
            Streaming live frames from backend capture pipeline
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 font-mono text-xs">
          {/* Live Packet Counter */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-950/80 border border-slate-800">
            <span
              className={`w-2 h-2 rounded-full ${
                livePackets.length > 0 ? 'bg-emerald-400 animate-ping' : 'bg-slate-600'
              }`}
            />
            <span className="text-slate-300 font-bold">
              {livePackets.length}
            </span>
            <span className="text-slate-500 text-[10px]">/ 120 BUFFERED</span>
          </div>

          {/* Quick Search */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search IP / Protocol..."
              className="bg-slate-950/80 border border-slate-800 rounded-lg pl-8 pr-3 py-1 text-xs text-slate-200 placeholder:text-slate-600 outline-none focus:border-cyan-500/50 w-44 font-mono"
            />
          </div>

          {/* Protocol Filter */}
          <select
            value={filterProtocol}
            onChange={(e) => setFilterProtocol(e.target.value)}
            className="bg-slate-950/80 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-slate-300 outline-none focus:border-cyan-500/50 font-mono cursor-pointer"
          >
            <option value="ALL">ALL PROTOCOLS</option>
            <option value="TCP">TCP</option>
            <option value="UDP">UDP</option>
            <option value="ICMP">ICMP</option>
          </select>

          {/* Clear Button */}
          {livePackets.length > 0 && (
            <button
              onClick={clearPackets}
              className="p-1.5 rounded-lg bg-slate-950/80 border border-slate-800 text-slate-400 hover:text-rose-400 hover:border-rose-500/40 transition-colors cursor-pointer"
              title="Clear Packet Buffer"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Cyber Monospace Stream Table */}
      <div className="overflow-x-auto rounded-xl border border-slate-800/80 bg-slate-950/80 max-h-[460px] overflow-y-auto">
        <table className="w-full min-w-[860px] border-collapse font-mono text-xs">
          <thead>
            <tr className="sticky top-0 z-10 bg-[#070d1e] border-b border-slate-800 text-slate-400 text-[11px] font-bold">
              <th className="py-2.5 px-3 text-left">#</th>
              <th className="py-2.5 px-3 text-left">TIME</th>
              <th className="py-2.5 px-3 text-left">SOURCE</th>
              <th className="py-2.5 px-3 text-left">DESTINATION</th>
              <th className="py-2.5 px-3 text-left">PROTOCOL</th>
              <th className="py-2.5 px-3 text-left">LENGTH</th>
              <th className="py-2.5 px-3 text-left">FLAGS</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-800/40">
            {filteredPackets.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-12 text-center text-slate-500 font-mono text-xs">
                  {livePackets.length === 0
                    ? 'WAITING FOR PACKET TELEMETRY... START LIVE OR UPLOAD & REPLAY PCAP'
                    : 'NO PACKETS MATCHING CURRENT FILTER'}
                </td>
              </tr>
            ) : (
              <AnimatePresence initial={false}>
                {filteredPackets.map((packet) => {
                  const timeFormatted = packet.timestamp
                    ? new Date(Number(packet.timestamp) * 1000).toLocaleTimeString()
                    : '--:--:--';
                  const protoBadge = PROTOCOL_COLORS[packet.protocol] || PROTOCOL_COLORS.OTHER;

                  return (
                    <motion.tr
                      key={`${packet.packet_id}-${packet.timestamp}`}
                      initial={{ opacity: 0, backgroundColor: 'rgba(0, 229, 255, 0.08)' }}
                      animate={{ opacity: 1, backgroundColor: 'rgba(0, 0, 0, 0)' }}
                      transition={{ duration: 0.3 }}
                      className="hover:bg-slate-900/50 transition-colors"
                    >
                      <td className="py-2 px-3 text-cyan-400 font-bold">
                        {String(packet.packet_id ?? '—').padStart(6, '0')}
                      </td>
                      <td className="py-2 px-3 text-slate-400 whitespace-nowrap">
                        {timeFormatted}
                      </td>
                      <td className="py-2 px-3 text-slate-200 font-medium whitespace-nowrap">
                        {packet.source || '—'}
                      </td>
                      <td className="py-2 px-3 text-slate-200 font-medium whitespace-nowrap">
                        {packet.destination || '—'}
                      </td>
                      <td className="py-2 px-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${protoBadge}`}>
                          {packet.protocol || 'OTHER'}
                        </span>
                      </td>
                      <td className="py-2 px-3 text-slate-300">
                        {Number(packet.packet_length || 0).toLocaleString()}{' '}
                        <span className="text-slate-500 text-[10px]">B</span>
                      </td>
                      <td className="py-2 px-3">
                        {packet.tcp_flags ? (
                          <span className="px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30 text-[10px] font-bold">
                            {packet.tcp_flags}
                          </span>
                        ) : (
                          <span className="text-slate-600">—</span>
                        )}
                      </td>
                    </motion.tr>
                  );
                })}
              </AnimatePresence>
            )}
          </tbody>
        </table>
      </div>
    </GlassCard>
  );
};

export default PacketStreamTable;
