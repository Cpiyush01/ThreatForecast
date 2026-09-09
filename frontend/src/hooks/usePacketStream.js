import { useContext } from 'react';
import { MonitoringContext } from '../context/MonitoringContext';

export const usePacketStream = () => {
  const context = useContext(MonitoringContext);
  if (!context) {
    throw new Error('usePacketStream must be used within a MonitoringProvider');
  }
  return {
    livePackets: context.livePackets,
    clearPackets: context.clearPackets,
  };
};
