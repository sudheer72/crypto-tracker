/**
 * Format a number as currency
 */
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: value >= 1000 ? 0 : value >= 1 ? 2 : 4,
    minimumFractionDigits: value >= 1000 ? 0 : value >= 1 ? 2 : 4,
  }).format(value);
};

/**
 * Format a number with appropriate suffixes (K, M, B, T)
 */
export const formatNumber = (value: number): string => {
  if (value >= 1000000000000) {
    return `$${(value / 1000000000000).toFixed(2)}T`;
  } else if (value >= 1000000000) {
    return `$${(value / 1000000000).toFixed(2)}B`;
  } else if (value >= 1000000) {
    return `$${(value / 1000000).toFixed(2)}M`;
  } else if (value >= 1000) {
    return `$${(value / 1000).toFixed(2)}K`;
  } else {
    return `$${value.toFixed(2)}`;
  }
};

/**
 * Format a percentage value with + or - prefix
 */
export const formatPercentage = (value: number): string => {
  const prefix = value > 0 ? '+' : value < 0 ? '-' : '';
  return `${prefix}${Math.abs(value).toFixed(2)}%`;
};

/**
 * Format supply numbers with appropriate suffix
 */
export const formatSupply = (value: number, symbol: string): string => {
  if (value >= 1000000) {
    return `${(value).toFixed(2)}M ${symbol}`;
  } else if (value >= 1000) {
    return `${(value).toFixed(2)}K ${symbol}`;
  } else {
    return `${value.toFixed(2)} ${symbol}`;
  }
};

/**
 * Determine color based on value (positive/negative)
 */
export const getPriceChangeColor = (value: number): string => {
  if (value > 0) return 'text-green-500';
  if (value < 0) return 'text-red-500';
  return 'text-gray-400';
};