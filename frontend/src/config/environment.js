export const env = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_BASE || 'http://127.0.0.1:8000',
  wsUrl: import.meta.env.VITE_WS_URL || (
    (import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000').replace(/^http/, 'ws') + '/ws/live'
  ),
  isDev: import.meta.env.DEV,
  threshold: 0.05,
  horizons: [10, 20, 30, 40, 50, 60],
};
