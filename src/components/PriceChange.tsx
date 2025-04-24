import React, { memo } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { formatPercentage } from '../utils/formatter';

interface PriceChangeProps {
  value: number;
}

const PriceChange: React.FC<PriceChangeProps> = ({ value }) => {
  if (value === 0) {
    return <span className="text-gray-500">0.00%</span>;
  }

  return (
    <div className={`flex items-center ${value > 0 ? 'text-green-500' : 'text-red-500'}`}>
      {value > 0 ? (
        <ChevronUp className="h-4 w-4" />
      ) : (
        <ChevronDown className="h-4 w-4" />
      )}
      <span>{formatPercentage(value)}</span>
    </div>
  );
};

export default memo(PriceChange);