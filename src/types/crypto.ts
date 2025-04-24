export interface CryptoAsset {
  id: string;
  rank: number;
  name: string;
  symbol: string;
  iconUrl: string;
  price: number;
  priceChange1h: number;
  priceChange24h: number;
  priceChange7d: number;
  marketCap: number;
  volume24h: number;
  circulatingSupply: number;
  maxSupply: number | null;
  sparklineData: number[];
}

export interface CryptoState {
  assets: CryptoAsset[];
  favorites: string[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  sortConfig: SortConfig | null;
  searchQuery: string;
}

export interface SortConfig {
  key: keyof CryptoAsset;
  direction: 'asc' | 'desc';
}