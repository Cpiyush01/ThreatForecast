import React, { createContext, useState, useEffect, useCallback } from 'react';
import * as api from '../services/api';
import { webSocketService } from '../services/websocket';

export const ForecastContext = createContext();

export const ForecastProvider = ({ children }) => {
  const [health, setHealth] = useState(null);
  const [status, setStatus] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [mitreData, setMitreData] = useState({ candidates: [] });
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);

  const refresh = useCallback(async () => {
    try {
      const [healthRes, statusRes, mitreRes] = await Promise.all([
        api.health(),
        api.status(),
        api.mitre(),
      ]);

      setHealth(healthRes);
      setStatus(statusRes);
      setMitreData(mitreRes);

      if (statusRes.latest) {
        setForecast(statusRes.latest);
      }
    } catch (e) {
      setErr(e.message);
    }
  }, []);

  useEffect(() => {
    refresh();
    const interval = setInterval(refresh, 4000);
    return () => clearInterval(interval);
  }, [refresh]);

  useEffect(() => {
    webSocketService.connect();
    const unsubscribe = webSocketService.subscribe((item) => {
      if (item?.event_type === 'forecast' || Array.isArray(item?.risk_scores)) {
        setForecast(item);
        api.mitre().then(setMitreData).catch(() => {});
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <ForecastContext.Provider
      value={{
        health,
        status,
        forecast,
        mitreData,
        err,
        setErr,
        busy,
        setBusy,
        refresh,
      }}
    >
      {children}
    </ForecastContext.Provider>
  );
};
