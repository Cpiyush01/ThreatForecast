import React from 'react';
import { useAnimatedNumber } from '../../hooks/useAnimatedNumber';
import { formatRiskScore, formatNumber } from '../../utils/formatters';

export const AnimatedNumber = ({ value, format = 'number', decimals = 4, className = '' }) => {
  const animatedVal = useAnimatedNumber(Number(value) || 0, 400);

  const formatted =
    format === 'risk'
      ? formatRiskScore(animatedVal)
      : format === 'fixed'
      ? animatedVal.toFixed(decimals)
      : formatNumber(Math.round(animatedVal));

  return <span className={className}>{formatted}</span>;
};

export default AnimatedNumber;
