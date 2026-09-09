import { useForecast } from './useForecast';

export const useMitre = () => {
  const { mitreData } = useForecast();

  const candidates = mitreData?.candidates || [];
  const primaryAttack = candidates.length > 0 ? candidates[0] : null;

  return {
    candidates,
    primaryAttack,
    hasAttack: candidates.length > 0,
  };
};
