export const formatRiskScore = (val) => {
  if (val === null || val === undefined || isNaN(val)) return '—';
  return Number(val).toFixed(4);
};

export const formatNumber = (val) => {
  if (val === null || val === undefined || isNaN(val)) return '—';
  return Number(val).toLocaleString();
};

export const formatBytes = (bytes) => {
  if (bytes === 0 || !bytes) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const formatTimestamp = (timestamp) => {
  if (!timestamp) return '--:--:--';
  const date = new Date(Number(timestamp) * 1000);
  return date.toLocaleTimeString();
};

export const formatPacketId = (id) => {
  if (id === null || id === undefined) return '—';
  return String(id).padStart(8, '0');
};
