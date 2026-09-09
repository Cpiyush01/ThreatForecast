import * as api from './api';

export const fetchForecastStatus = async () => {
  return await api.status();
};

export const fetchSystemHealth = async () => {
  return await api.health();
};
