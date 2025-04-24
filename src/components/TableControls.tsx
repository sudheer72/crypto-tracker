import React from 'react';
import { Search, SortAsc, Star, TrendingDown, TrendingUp } from 'lucide-react';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAppSelector } from '../hooks/useAppSelector';
import { setSearchQuery, setSortConfig } from '../store/cryptoSlice';

const TableControls: React.FC = () => {
  const dispatch = useAppDispatch();
  const searchQuery = useAppSelector(state => state.crypto.searchQuery);
  const favorites = useAppSelector(state => state.crypto.favorites);
  const assets = useAppSelector(state => state.crypto.assets);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e.target.value));
  };

  // Calculate market trends
  const marketTrends = assets.reduce(
    (acc, asset) => {
      if (asset.priceChange24h > 0) acc.gainers++;
      else if (asset.priceChange24h < 0) acc.losers++;
      return acc;
    },
    { gainers: 0, losers: 0 }
  );

  return (
    <div className="mb-4 space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="relative flex-1 w-full sm:w-auto">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search by name or symbol..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
            <span>{favorites.length} favorites</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 text-green-500">
              <TrendingUp className="h-4 w-4" />
              <span>{marketTrends.gainers}</span>
            </div>
            <div className="flex items-center gap-1 text-red-500">
              <TrendingDown className="h-4 w-4" />
              <span>{marketTrends.losers}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 text-sm">
        {favorites.length > 0 && (
          <div className="px-3 py-1 rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200">
            {favorites.length} Favorites
          </div>
        )}
        <div className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200">
          {assets.length} Assets
        </div>
        <div className="px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200">
          {marketTrends.gainers} Gainers
        </div>
        <div className="px-3 py-1 rounded-full bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200">
          {marketTrends.losers} Losers
        </div>
      </div>
    </div>
  );
};

export default TableControls;