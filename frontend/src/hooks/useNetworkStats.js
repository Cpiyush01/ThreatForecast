import { useMemo } from 'react';
import { useForecast } from './useForecast';
import { calculatePacketsPerSecond } from '../utils/networkUtils';

export const useNetworkStats = () => {
  const { forecast, status } = useForecast();

  const stats = useMemo(() => {
    const latestState = forecast?.latest_state;
    const currentPackets = latestState?.packet_count ?? 0;
    const packetsPerSecond = calculatePacketsPerSecond(currentPackets);

    return {
      latestState,
      currentPackets,
      packetsPerSecond,
      statesObserved: status?.state_count ?? 0,
      sourceIps: latestState?.features?.[8] ?? '—',
      destinationIps: latestState?.features?.[9] ?? '—',
      flowPairs: latestState?.features?.[10] ?? '—',
      tcpRatio: latestState?.features ? Number(latestState.features[15]).toFixed(4) : '—',
      synRatio: latestState?.features ? Number(latestState.features[19]).toFixed(4) : '—',
      rstRatio: latestState?.features ? Number(latestState.features[24]).toFixed(4) : '—',
    };
  }, [forecast, status]);

  return stats;
};
