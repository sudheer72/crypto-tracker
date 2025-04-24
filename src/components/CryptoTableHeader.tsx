import React from 'react';
import { ArrowUpDown, HelpCircle } from 'lucide-react';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAppSelector } from '../hooks/useAppSelector';
import { setSortConfig } from '../store/cryptoSlice';
import { CryptoAsset } from '../types/crypto';
import InfoIcon from './InfoIcon';

const CryptoTableHeader: React.FC = () => {
  const dispatch = useAppDispatch();
  const sortConfig = useAppSelector(state => state.crypto.sortConfig);

  const handleSort = (key: keyof CryptoAsset) => {
    const direction = sortConfig?.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc';
    dispatch(setSortConfig({ key, direction }));
  };

  const getSortIcon = (key: keyof CryptoAsset) => {
    if (sortConfig?.key !== key) {
      return <ArrowUpDown className="h-4 w-4 opacity-0 group-hover:opacity-50" />;
    }
    return <ArrowUpDown className={`h-4 w-4 ${sortConfig.direction === 'asc' ? 'text-blue-500' : 'text-blue-500 rotate-180'}`} />;
  };

  const headerClass = "px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer group";
  const headerClassRight = headerClass + " text-right";

  return (
    <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <tr>
        <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">#</th>
        <th 
          className={headerClass}
          onClick={() => handleSort('name')}
        >
          <div className="flex items-center">
            Name
            {getSortIcon('name')}
          </div>
        </th>
        <th 
          className={headerClassRight}
          onClick={() => handleSort('price')}
        >
          <div className="flex items-center justify-end">
            Price
            {getSortIcon('price')}
          </div>
        </th>
        <th 
          className={headerClassRight}
          onClick={() => handleSort('priceChange1h')}
        >
          <div className="flex items-center justify-end">
            1h %
            {getSortIcon('priceChange1h')}
          </div>
        </th>
        <th 
          className={headerClassRight}
          onClick={() => handleSort('priceChange24h')}
        >
          <div className="flex items-center justify-end">
            24h %
            {getSortIcon('priceChange24h')}
          </div>
        </th>
        <th 
          className={headerClassRight}
          onClick={() => handleSort('priceChange7d')}
        >
          <div className="flex items-center justify-end">
            7d %
            {getSortIcon('priceChange7d')}
          </div>
        </th>
        <th 
          className={headerClassRight}
          onClick={() => handleSort('marketCap')}
        >
          <div className="flex items-center justify-end">
            Market Cap
            <InfoIcon tooltip="Market capitalization is calculated by multiplying the price by the circulating supply." />
            {getSortIcon('marketCap')}
          </div>
        </th>
        <th 
          className={headerClassRight}
          onClick={() => handleSort('volume24h')}
        >
          <div className="flex items-center justify-end">
            Volume(24h)
            <InfoIcon tooltip="A measure of how much of a cryptocurrency was traded in the last 24 hours." />
            {getSortIcon('volume24h')}
          </div>
        </th>
        <th 
          className={headerClassRight}
          onClick={() => handleSort('circulatingSupply')}
        >
          <div className="flex items-center justify-end">
            Circulating Supply
            <InfoIcon tooltip="The number of coins or tokens that are circulating in the market and in public hands." />
            {getSortIcon('circulatingSupply')}
          </div>
        </th>
        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Last 7 Days</th>
      </tr>
    </thead>
  );
};

export default CryptoTableHeader;