import * as api from './api';

export const startLiveCapture = async (interfaceName) => {
  return await api.start(interfaceName);
};

export const stopCapture = async () => {
  return await api.stop();
};

export const replayPcap = async (path, speed) => {
  return await api.replay(path, speed);
};

export const uploadAndReplayPcap = async (file, speed) => {
  return await api.replayUpload(file, speed);
};
