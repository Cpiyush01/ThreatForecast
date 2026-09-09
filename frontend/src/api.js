const API = import.meta.env.VITE_API_BASE || 'http://127.0.0.1:8000';

async function j(url, options) {
    const response = await fetch(API + url, options);
    if (!response.ok) {
        const text = await response.text();
        let message = text;
        try { message = JSON.parse(text).detail || text; } catch { }
        throw new Error(message);
    }
    return response.json();
}

export const health = () => j('/api/health');
export const status = () => j('/api/status');
export const mitre = () => j('/api/mitre/candidates');
export const start = (interfaceName = '') => j('/api/control/start', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ interface: interfaceName }) });
export const stop = () => j('/api/control/stop', { method: 'POST' });
export const replay = (path, speed) => j('/api/control/replay', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ path, speed }) });
export const replayUpload = (file, speed) => {
    return j(`/api/control/replay-upload-raw?speed=${encodeURIComponent(speed)}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/octet-stream', 'X-Filename': file.name },
        body: file
    });
};
export const shap = (horizon_seconds, max_evals) => j('/api/explain', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ horizon_seconds, max_evals }) });
export const wsUrl = () => API.replace(/^http/, 'ws') + '/ws/live';
