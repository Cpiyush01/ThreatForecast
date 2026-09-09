import React, { createContext, useState, useEffect, useCallback } from 'react';
import * as api from '../services/api';
import { webSocketService } from '../services/websocket';
import { useForecast } from '../hooks/useForecast';

export const MonitoringContext = createContext();

export const MonitoringProvider = ({ children }) => {
  const { refresh, setErr, status } = useForecast();
  const [livePackets, setLivePackets] = useState([]);
  const [iface, setIface] = useState('');
  const [pcapFile, setPcapFile] = useState(null);
  const [speed, setSpeed] = useState(1);
  const [busy, setBusy] = useState(false);

  // Sync recent packets from status response on initial load or status update
  useEffect(() => {
    if (Array.isArray(status?.recent_packets) && status.recent_packets.length > 0) {
      setLivePackets(status.recent_packets.slice().reverse().slice(0, 120));
    }
  }, [status?.recent_packets]);

  // Handle WebSocket packet event streaming
  useEffect(() => {
    webSocketService.connect();
    const unsubscribe = webSocketService.subscribe((item) => {
      if (item?.event_type === 'packet') {
        setLivePackets((prev) => [item, ...prev].slice(0, 120));
      }
    });

    return () => unsubscribe();
  }, []);

  const runControlAction = useCallback(async (actionFn) => {
    try {
      setErr('');
      setBusy(true);
      await actionFn();
      await refresh();
    } catch (e) {
      setErr(e.message);
    } finally {
      setBusy(false);
    }
  }, [refresh, setErr]);

  const startLive = (interfaceName) => runControlAction(() => api.start(interfaceName || iface));
  const stopLive = () => runControlAction(api.stop);
  const replayUpload = () => {
    if (!pcapFile) {
      setErr('Choose a .pcap, .pcapng, or .cap file first.');
      return;
    }
    return runControlAction(() => api.replayUpload(pcapFile, Number(speed)));
  };

  const clearPackets = () => setLivePackets([]);

  return (
    <MonitoringContext.Provider
      value={{
        livePackets,
        iface,
        setIface,
        pcapFile,
        setPcapFile,
        speed,
        setSpeed,
        busy,
        startLive,
        stopLive,
        replayUpload,
        clearPackets,
        runControlAction,
      }}
    >
      {children}
    </MonitoringContext.Provider>
  );
};
