import { env } from './environment';

export const apiEndpoints = {
  health: '/api/health',
  status: '/api/status',
  mitre: '/api/mitre/candidates',
  startControl: '/api/control/start',
  stopControl: '/api/control/stop',
  replayControl: '/api/control/replay',
  replayUploadRaw: (speed) => `/api/control/replay-upload-raw?speed=${encodeURIComponent(speed)}`,
  explainShap: '/api/explain',
  wsLive: env.wsUrl,
};
