import { useState } from 'react';
import { explainForecastWithShap } from '../services/shapService';
import { useForecast } from './useForecast';

export const useShap = () => {
  const { forecast, status, setErr } = useForecast();
  const [explanation, setExplanation] = useState(null);
  const [loading, setLoading] = useState(false);

  const runShap = async () => {
    if (!forecast || !status?.ready_for_forecast) {
      return;
    }

    try {
      setLoading(true);
      setErr('');
      const exp = await explainForecastWithShap(forecast.peak_risk_horizon_seconds, 600);
      setExplanation(exp);
    } catch (e) {
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  };

  return { explanation, loading, runShap };
};
