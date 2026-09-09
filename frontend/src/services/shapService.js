import * as api from './api';

export const explainForecastWithShap = async (horizonSeconds, maxEvals = 600) => {
  return await api.shap(horizonSeconds, maxEvals);
};
