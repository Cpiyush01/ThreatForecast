import { env } from '../config/environment';

const API = env.apiBaseUrl;

async function request(url, options = {}) {
  const response = await fetch(API + url, options);
  if (!response.ok) {
    const text = await response.text();
    let message = text;
    try {
      message = JSON.parse(text).detail || text;
    } catch {}
    throw new Error(message);
  }
  return response.json();
}

export const health = () => request('/api/health');

export const status = () => request('/api/status');

export const mitre = () => request('/api/mitre/candidates');

export const start = (interfaceName = '') =>
  request('/api/control/start', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ interface: interfaceName }),
  });

export const stop = () =>
  request('/api/control/stop', {
    method: 'POST',
  });

export const replay = (path, speed) =>
  request('/api/control/replay', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ path, speed }),
  });

export const replayUpload = (file, speed) => {
  return request(`/api/control/replay-upload-raw?speed=${encodeURIComponent(speed)}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/octet-stream',
      'X-Filename': file.name,
    },
    body: file,
  });
};

export const shap = (horizon_seconds, max_evals = 600) =>
  request('/api/explain', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ horizon_seconds, max_evals }),
  });

export const wsUrl = () => API.replace(/^http/, 'ws') + '/ws/live';
