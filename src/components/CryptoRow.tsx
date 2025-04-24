import React, { memo, useRef, useEffect, useState } from 'react';
import { Star } from 'lucide-react';
import { CryptoAsset } from '../types/crypto';
import PriceChange from './PriceChange';
import SparklineChart from './SparklineChart';
import { formatCurrency, formatNumber, formatSupply } from '../utils/formatter';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAppSelector } from '../hooks/useAppSelector';
import { toggleFavorite } from '../store/cryptoSlice';

interface CryptoRowProps {
  asset: CryptoAsset;
}

const CryptoRow: React.FC<CryptoRowProps> = ({ asset }) => {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector(state => state.crypto.favorites);
  const isFavorite = favorites.includes(asset.id);
  
  const prevPriceRef = useRef(asset.price);
  const [priceChanged, setPriceChanged] = useState(false);
  const [priceIncreased, setPriceIncreased] = useState(false);
  
  useEffect(() => {
    if (prevPriceRef.current !== asset.price) {
      setPriceIncreased(asset.price > prevPriceRef.current);
      setPriceChanged(true);
      
      const timeout = setTimeout(() => {
        setPriceChanged(false);
      }, 1000);
      
      prevPriceRef.current = asset.price;
      
      return () => clearTimeout(timeout);
    }
  }, [asset.price]);

  const getPriceClass = () => {
    if (!priceChanged) return '';
    return priceIncreased ? 'bg-green-100 dark:bg-green-900/30' : 'bg-red-100 dark:bg-red-900/30';
  };

  const handleFavoriteClick = () => {
    dispatch(toggleFavorite(asset.id));
  };

  return (
    <tr className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
      <td className="px-2 py-4 whitespace-nowrap text-sm">
        <div className="flex items-center">
          <Star
            className={`h-4 w-4 cursor-pointer ${
              isFavorite ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
            } hover:text-yellow-400 mr-2`}
            onClick={handleFavoriteClick}
          />
          <span>{asset.rank}</span>
        </div>
      </td>
      <td className="px-4 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <img src={asset.iconUrl} alt={asset.name} className="h-6 w-6 mr-3" />
          <div>
            <div className="font-medium text-gray-900 dark:text-white">{asset.name}</div>
            <div className="text-gray-500 dark:text-gray-400 text-sm">{asset.symbol}</div>
          </div>
        </div>
      </td>
      <td className={`px-4 py-4 whitespace-nowrap text-right font-medium text-gray-900 dark:text-white transition-colors ${getPriceClass()}`}>
        {formatCurrency(asset.price)}
      </td>
      <td className="px-4 py-4 whitespace-nowrap text-right">
        <PriceChange value={asset.priceChange1h} />
      </td>
      <td className="px-4 py-4 whitespace-nowrap text-right">
        <PriceChange value={asset.priceChange24h} />
      </td>
      <td className="px-4 py-4 whitespace-nowrap text-right">
        <PriceChange value={asset.priceChange7d} />
      </td>
      <td className="px-4 py-4 whitespace-nowrap text-right text-sm text-gray-900 dark:text-white">
        {formatNumber(asset.marketCap)}
      </td>
      <td className="px-4 py-4 whitespace-nowrap text-right text-sm text-gray-900 dark:text-white">
        {formatNumber(asset.volume24h)}
      </td>
      <td className="px-4 py-4 whitespace-nowrap text-right text-sm text-gray-900 dark:text-white">
        {formatSupply(asset.circulatingSupply, asset.symbol)}
      </td>
      <td className="px-4 py-4 whitespace-nowrap">
        <SparklineChart data={asset.sparklineData} priceChange7d={asset.priceChange7d} />
      </td>
    </tr>
  );
};

export default memo(CryptoRow);