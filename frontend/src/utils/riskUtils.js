import { RISK_THRESHOLD } from './constants';

export const getSeverityLevel = (peakRisk, primaryAttack) => {
  if (primaryAttack?.severity) {
    return primaryAttack.severity;
  }
  if (peakRisk >= 0.2) return 'CRITICAL';
  if (peakRisk >= 0.1) return 'HIGH';
  if (peakRisk >= 0.05) return 'MEDIUM';
  return 'LOW';
};

export const getRiskStateLabel = (peakRisk) => {
  if (peakRisk >= 0.2) return 'CRITICAL THREAT DETECTED';
  if (peakRisk >= 0.1) return 'WARNING — HIGH RISK';
  if (peakRisk >= RISK_THRESHOLD) return 'ELEVATED ANOMALY RISK';
  return 'SYSTEM NORMAL / NOMINAL';
};

export const calculateThresholdCrossings = (riskScores) => {
  if (!Array.isArray(riskScores)) return [];
  const horizons = [10, 20, 30, 40, 50, 60];
  return horizons.filter((_, idx) => riskScores[idx] >= RISK_THRESHOLD);
};

export const calculateAverageRisk = (riskScores) => {
  if (!Array.isArray(riskScores) || riskScores.length === 0) return 0;
  return riskScores.reduce((acc, v) => acc + v, 0) / riskScores.length;
};
