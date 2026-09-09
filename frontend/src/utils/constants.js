export const HORIZONS = [10, 20, 30, 40, 50, 60];
export const RISK_THRESHOLD = 0.05;

export const ATTACK_COLORS = {
  'Port Scan': 'attack-blue',
  'DDoS / DoS': 'attack-red',
  'Brute Force': 'attack-orange',
  'Public-Facing Service Attack': 'attack-purple',
  'Network Reconnaissance': 'attack-cyan',
};

export const SEVERITY_LEVELS = {
  SAFE: { label: 'SAFE', color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/30' },
  ELEVATED: { label: 'ELEVATED', color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/30' },
  WARNING: { label: 'WARNING', color: 'text-orange-400', bg: 'bg-orange-500/10 border-orange-500/30' },
  CRITICAL: { label: 'CRITICAL', color: 'text-rose-500', bg: 'bg-rose-500/20 border-rose-500/40' },
};
