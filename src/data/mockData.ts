import { CryptoAsset } from '../types/crypto';

// Generate random sparkline data with trend
const generateSparklineData = (baseValue: number, volatility: number, trend: number = 0): number[] => {
  const data = [];
  let currentValue = baseValue;
  const trendFactor = trend / 100; // Convert percentage to decimal
  
  for (let i = 0; i < 24; i++) {
    // Add trend component
    const trendChange = baseValue * trendFactor * (1/24);
    // Add random component
    const randomChange = (Math.random() - 0.5) * volatility * baseValue;
    // Combine changes
    currentValue += trendChange + randomChange;
    // Ensure we don't go negative
    data.push(Math.max(currentValue, 0.01));
  }
  
  return data;
};

export const initialCryptoData: CryptoAsset[] = [
  {
    id: 'bitcoin',
    rank: 1,
    name: 'Bitcoin',
    symbol: 'BTC',
    iconUrl: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1.png',
    price: 93759.48,
    priceChange1h: 0.43,
    priceChange24h: 0.93,
    priceChange7d: 11.11,
    marketCap: 1861618902186,
    volume24h: 43874950947,
    circulatingSupply: 19.85,
    maxSupply: 21,
    sparklineData: generateSparklineData(93759.48, 0.02, 11.11),
  },
  {
    id: 'ethereum',
    rank: 2,
    name: 'Ethereum',
    symbol: 'ETH',
    iconUrl: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png',
    price: 1802.46,
    priceChange1h: 0.60,
    priceChange24h: 3.21,
    priceChange7d: 13.68,
    marketCap: 217581279327,
    volume24h: 23547469307,
    circulatingSupply: 120.71,
    maxSupply: null,
    sparklineData: generateSparklineData(1802.46, 0.03, 13.68),
  },
  {
    id: 'tether',
    rank: 3,
    name: 'Tether',
    symbol: 'USDT',
    iconUrl: 'https://s2.coinmarketcap.com/static/img/coins/64x64/825.png',
    price: 1.00,
    priceChange1h: 0.00,
    priceChange24h: 0.00,
    priceChange7d: 0.04,
    marketCap: 145320022085,
    volume24h: 92288882007,
    circulatingSupply: 145.27,
    maxSupply: null,
    sparklineData: generateSparklineData(1, 0.001, 0.04),
  },
  {
    id: 'xrp',
    rank: 4,
    name: 'XRP',
    symbol: 'XRP',
    iconUrl: 'https://s2.coinmarketcap.com/static/img/coins/64x64/52.png',
    price: 2.22,
    priceChange1h: 0.46,
    priceChange24h: 0.54,
    priceChange7d: 6.18,
    marketCap: 130073814966,
    volume24h: 5131481491,
    circulatingSupply: 58.39,
    maxSupply: 100,
    sparklineData: generateSparklineData(2.22, 0.03, 6.18),
  },
  {
    id: 'bnb',
    rank: 5,
    name: 'BNB',
    symbol: 'BNB',
    iconUrl: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png',
    price: 606.65,
    priceChange1h: 0.09,
    priceChange24h: -1.20,
    priceChange7d: 3.73,
    marketCap: 85471956947,
    volume24h: 1874281784,
    circulatingSupply: 140.89,
    maxSupply: 200,
    sparklineData: generateSparklineData(606.65, 0.025, 3.73),
  },
  {
    id: 'solana',
    rank: 6,
    name: 'Solana',
    symbol: 'SOL',
    iconUrl: 'https://s2.coinmarketcap.com/static/img/coins/64x64/5426.png',
    price: 151.51,
    priceChange1h: 0.53,
    priceChange24h: 1.26,
    priceChange7d: 14.74,
    marketCap: 78381958631,
    volume24h: 4881674486,
    circulatingSupply: 517.31,
    maxSupply: null,
    sparklineData: generateSparklineData(151.51, 0.04, 14.74),
  }
];