export const calculatePacketsPerSecond = (packetCount) => {
  if (!packetCount || packetCount <= 0) return '0.0';
  return (packetCount / 10).toFixed(1);
};

export const parseProtocolColor = (protocol) => {
  switch ((protocol || '').toUpperCase()) {
    case 'TCP':
      return 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10';
    case 'UDP':
      return 'text-blue-400 border-blue-500/30 bg-blue-500/10';
    case 'ICMP':
      return 'text-amber-400 border-amber-500/30 bg-amber-500/10';
    case 'HTTP':
    case 'HTTPS':
      return 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10';
    case 'DNS':
      return 'text-purple-400 border-purple-500/30 bg-purple-500/10';
    default:
      return 'text-slate-400 border-slate-700 bg-slate-800/50';
  }
};
