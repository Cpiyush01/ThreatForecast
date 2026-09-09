import * as api from './api';

export const fetchMitreCandidates = async () => {
  return await api.mitre();
};
