import { CryptoAsset } from '../types/crypto';

/**
 * Class to simulate WebSocket updates for crypto prices
 */
export class CryptoUpdater {
  private intervalId: number | null = null;
  private callback: (assets: CryptoAsset[]) => void;
  private assets: CryptoAsset[];
  
  constructor(initialAssets: CryptoAsset[], callback: (assets: CryptoAsset[]) => void) {
    this.assets = JSON.parse(JSON.stringify(initialAssets)); // Deep copy
    this.callback = callback;
  }
  
  /**
   * Start the simulated WebSocket updates
   */
  start(intervalMs: number = 2000): void {
    if (this.intervalId !== null) return;
    
    this.intervalId = window.setInterval(() => {
      this.updateRandomAsset();
    }, intervalMs);
  }
  
  /**
   * Stop the simulated WebSocket updates
   */
  stop(): void {
    if (this.intervalId !== null) {
      window.clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
  
  /**
   * Update a random asset with new prices and values
   */
  private updateRandomAsset(): void {
    // Select 1-3 random assets to update
    const numAssetsToUpdate = Math.floor(Math.random() * 3) + 1;
    const updatedIndices = new Set<number>();
    
    while (updatedIndices.size < numAssetsToUpdate) {
      updatedIndices.add(Math.floor(Math.random() * this.assets.length));
    }
    
    const updatedAssets = [...this.assets];
    
    updatedIndices.forEach(index => {
      const asset = { ...updatedAssets[index] };
      
      // Update price with a random change (-1.5% to +1.5%)
      const priceChangePercent = (Math.random() - 0.48) * 3; // Slightly bias toward positive
      const newPrice = asset.price * (1 + priceChangePercent / 100);
      asset.price = newPrice;
      
      // Update percentage changes
      asset.priceChange1h += (Math.random() - 0.5) * 0.4; // -0.2% to +0.2%
      asset.priceChange24h += (Math.random() - 0.5) * 0.6; // -0.3% to +0.3%
      asset.priceChange7d += (Math.random() - 0.5) * 0.8; // -0.4% to +0.4%
      
      // Update 24h volume (±5%)
      const volumeChange = (Math.random() - 0.5) * 10;
      asset.volume24h = asset.volume24h * (1 + volumeChange / 100);
      
      // Update market cap based on price change
      asset.marketCap = asset.price * asset.circulatingSupply * 1000000;
      
      // Update sparkline data
      asset.sparklineData = [...asset.sparklineData.slice(1), newPrice];
      
      updatedAssets[index] = asset;
    });
    
    this.assets = updatedAssets;
    this.callback(updatedAssets);
  }
}