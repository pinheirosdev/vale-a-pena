export type MeasureUnit = 'g' | 'kg' | 'ml' | 'L' | 'un' | 'm';

export interface Product {
  id: string;
  name?: string;
  price: number;
  quantity: number;
  unit: MeasureUnit;
}

export interface ComparisonResult {
  winnerId: string | 'draw';
  differencePercentage: number;
  pricePerBaseUnitA: number;
  pricePerBaseUnitB: number;
  baseUnitLabel: string;
  savingsValue: number;
}

export interface HistoryItem {
  id: string;
  timestamp: number;
  productA: Product;
  productB: Product;
  result: ComparisonResult;
}
