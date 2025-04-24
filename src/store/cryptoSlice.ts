import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CryptoState, CryptoAsset, SortConfig } from '../types/crypto';
import { initialCryptoData } from '../data/mockData';

// Load favorites from localStorage
const savedFavorites = localStorage.getItem('cryptoFavorites');
const initialFavorites = savedFavorites ? JSON.parse(savedFavorites) : [];

const initialState: CryptoState = {
  assets: initialCryptoData,
  favorites: initialFavorites,
  status: 'idle',
  error: null,
  sortConfig: null,
  searchQuery: ''
};

export const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {
    updateAssets: (state, action: PayloadAction<CryptoAsset[]>) => {
      state.assets = action.payload;
    },
    updateAsset: (state, action: PayloadAction<CryptoAsset>) => {
      const index = state.assets.findIndex(asset => asset.id === action.payload.id);
      if (index !== -1) {
        state.assets[index] = action.payload;
      }
    },
    toggleFavorite: (state, action: PayloadAction<string>) => {
      const assetId = action.payload;
      if (state.favorites.includes(assetId)) {
        state.favorites = state.favorites.filter(id => id !== assetId);
      } else {
        state.favorites = [...state.favorites, assetId];
      }
      // Persist to localStorage
      localStorage.setItem('cryptoFavorites', JSON.stringify(state.favorites));
    },
    setStatus: (state, action: PayloadAction<CryptoState['status']>) => {
      state.status = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.status = 'failed';
      state.error = action.payload;
    },
    setSortConfig: (state, action: PayloadAction<SortConfig>) => {
      state.sortConfig = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    }
  }
});

export const {
  updateAssets,
  updateAsset,
  toggleFavorite,
  setStatus,
  setError,
  setSortConfig,
  setSearchQuery
} = cryptoSlice.actions;

export default cryptoSlice.reducer;