import React, { memo, useEffect, useState } from 'react';
import { useAppSelector } from '../hooks/useAppSelector';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { updateAssets } from '../store/cryptoSlice';
import CryptoRow from './CryptoRow';
import CryptoTableHeader from './CryptoTableHeader';
import TableControls from './TableControls';
import { CryptoUpdater } from '../services/cryptoUpdater';
import { CryptoAsset } from '../types/crypto';

const ITEMS_PER_PAGE = 10;

const CryptoTable: React.FC = () => {
  const dispatch = useAppDispatch();
  const assets = useAppSelector(state => state.crypto.assets);
  const favorites = useAppSelector(state => state.crypto.favorites);
  const sortConfig = useAppSelector(state => state.crypto.sortConfig);
  const searchQuery = useAppSelector(state => state.crypto.searchQuery);
  const [currentPage, setCurrentPage] = useState(1);
  
  useEffect(() => {
    const updater = new CryptoUpdater(assets, (updatedAssets) => {
      dispatch(updateAssets(updatedAssets));
    });
    
    updater.start(1500);
    
    return () => {
      updater.stop();
    };
  }, [dispatch]);
  
  const sortAndFilterAssets = (assets: CryptoAsset[]) => {
    let result = [...assets];
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(asset => 
        asset.name.toLowerCase().includes(query) ||
        asset.symbol.toLowerCase().includes(query)
      );
    }
    
    if (sortConfig) {
      result.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];
        
        if (typeof aValue === 'number' && typeof bValue === 'number') {
          return sortConfig.direction === 'asc' ? aValue - bValue : bValue - aValue;
        }
        
        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return sortConfig.direction === 'asc'
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        }
        
        return 0;
      });
    }
    
    if (favorites.length > 0) {
      result.sort((a, b) => {
        const aFav = favorites.includes(a.id);
        const bFav = favorites.includes(b.id);
        if (aFav && !bFav) return -1;
        if (!aFav && bFav) return 1;
        return 0;
      });
    }
    
    return result;
  };
  
  const displayedAssets = sortAndFilterAssets(assets);
  const totalPages = Math.ceil(displayedAssets.length / ITEMS_PER_PAGE);
  const paginatedAssets = displayedAssets.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, sortConfig]);
  
  return (
    <div>
      <TableControls />
      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <CryptoTableHeader />
          <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
            {paginatedAssets.map(asset => (
              <CryptoRow key={asset.id} asset={asset} />
            ))}
          </tbody>
        </table>
      </div>
      {totalPages > 1 && (
        <div className="mt-4 flex justify-center gap-2">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded bg-gray-100 dark:bg-gray-800 disabled:opacity-50"
          >
            Previous
          </button>
          <span className="px-3 py-1">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded bg-gray-100 dark:bg-gray-800 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default memo(CryptoTable);